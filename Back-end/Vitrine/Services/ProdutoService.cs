using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Vitrine.DTO;
using Vitrine.Model;
using Database;

namespace Vitrine.Services
{
    public class ProdutoService
    {
        private readonly VitrineDbContext _context;

        public ProdutoService(VitrineDbContext context)
        {
            _context = context;
        }

        public async Task<List<Produto>> GetProdutosAsync(string nome = null, int? categoriaId = null, bool apenasDisponiveis = false)
        {
            IQueryable<Produto> query = _context.Produtos.Include(p => p.Categoria);

            if (!string.IsNullOrEmpty(nome))
            {
                query = query.Where(p => EF.Functions.ILike(p.Nome, $"%{nome}%"));
            }

            if (categoriaId.HasValue)
            {
                query = query.Where(p => p.Categoria.Id == categoriaId.Value);
            }

            if (apenasDisponiveis)
            {
                var produtosComEstoque = await _context.Lancamentos
                    .GroupBy(l => l.ProdutoId)
                    .Select(g => new
                    {
                        ProdutoId = g.Key,
                        Estoque = g.Sum(l => l.Tipo == "entrada" ? l.Quantidade : -l.Quantidade)
                    })
                    .Where(x => x.Estoque > 0)
                    .Select(x => x.ProdutoId)
                    .ToListAsync();

                query = query.Where(p => produtosComEstoque.Contains(p.Id));
            }

            return await query.ToListAsync();
        }

        public async Task<Produto> GetProdutoByIdAsync(int id)
        {
            return await _context.Produtos.Include(p => p.Categoria).FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<(bool sucesso, string? erro, Produto produto)> CriarProdutoAsync(ProdutoDTO dto)
        {
            var categoria = await _context.Categorias.FindAsync(dto.IdCategoria);
            if (categoria == null)
                return (false, "Categoria inválida.", null);

            var produto = new Produto
            {
                Nome = dto.Nome,
                Descricao = dto.Descricao,
                Preco = dto.Preco,
                Tamanhos = dto.Tamanhos,
                Cores = dto.Cores,
                Imagem = dto.Imagem,
                Categoria = categoria
            };

            _context.Produtos.Add(produto);
            await _context.SaveChangesAsync();

            return (true, null, produto);
        }

        public async Task<(bool sucesso, string? erro)> AtualizarProdutoAsync(int id, ProdutoDTO dto)
        {
            var produto = await GetProdutoByIdAsync(id);
            if (produto == null)
                return (false, "Produto não encontrado.");

            var categoria = await _context.Categorias.FindAsync(dto.IdCategoria);
            if (categoria == null)
                return (false, "Categoria inválida.");

            produto.Nome = dto.Nome;
            produto.Descricao = dto.Descricao;
            produto.Preco = dto.Preco;
            produto.Tamanhos = dto.Tamanhos;
            produto.Cores = dto.Cores;
            produto.Imagem = dto.Imagem;
            produto.Categoria = categoria;

            await _context.SaveChangesAsync();
            return (true, null);
        }

        public async Task<bool> DeletarProdutoAsync(int id)
        {
            var produto = await _context.Produtos.FindAsync(id);
            if (produto == null)
                return false;

            _context.Produtos.Remove(produto);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
