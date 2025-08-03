using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Vitrine.DTO;
using Vitrine.Utils;
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

        public async Task<PaginationResponse<ProdutoDTO>> GetProdutosAsync(
            int page = 1,
            int pageSize = 10,
            string? nome = null,
            int? categoriaId = null,
            string ordenarPor = "nome",
            bool apenasDisponiveis = false)
        {
            IQueryable<Produto> query = _context.Produtos
                .Include(p => p.Categoria)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(nome))
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

            // Ordenação
            query = ordenarPor switch
            {
                "nome" => query.OrderBy(p => p.Nome),
                "-nome" => query.OrderByDescending(p => p.Nome),
                "preco" => query.OrderBy(p => p.Preco),
                "-preco" => query.OrderByDescending(p => p.Preco),
                _ => query.OrderBy(p => p.Nome),
            };

            // Total de itens antes da paginação
            int totalItems = await query.CountAsync();

            // Aplicar paginação
            var produtos = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            // Mapear para DTO
            var produtosDTO = produtos.Select(p => new ProdutoDTO
            {
                Id = p.Id,
                Nome = p.Nome,
                Descricao = p.Descricao,
                Preco = p.Preco,
                Tamanhos = p.Tamanhos,
                Cores = p.Cores,
                Imagem = p.Imagem,
                IdCategoria = p.Categoria?.Id ?? 0,
                NomeCategoria = p.Categoria?.Nome ?? string.Empty
            }).ToList();

            return new PaginationResponse<ProdutoDTO>
            {
                Items = produtosDTO,
                TotalItems = totalItems,
                CurrentPage = page,
                TotalPages = (int)Math.Ceiling(totalItems / (double)pageSize)
            };
        }

        public async Task<Produto?> GetProdutoByIdAsync(int id)
        {
            return await _context.Produtos.Include(p => p.Categoria).FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<(bool sucesso, string? erro, Produto? produto)> CriarProdutoAsync(ProdutoDTO dto)
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
