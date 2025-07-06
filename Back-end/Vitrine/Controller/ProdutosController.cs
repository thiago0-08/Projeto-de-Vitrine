using Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vitrine.Model;
using Vitrine.DTO;


namespace Vitrine.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProdutosController : ControllerBase
    {
        private readonly VitrineDbContext _context;

        public ProdutosController(VitrineDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetProdutos(
             string? nome,
             int pagina = 1,
             int tamanhoPagina = 12,
             int? categoriaId = null,
             string ordenarPor = "nome",
             bool apenasDisponiveis = false 
         )
        {
            IQueryable<Produto> produtosQuery = _context.Produtos.Include(p => p.Categoria);

            if (!string.IsNullOrEmpty(nome))
            {
                produtosQuery = produtosQuery.Where(p => EF.Functions.ILike(p.Nome, $"%{nome}%"));
            }

            if (categoriaId.HasValue)
            {
                produtosQuery = produtosQuery.Where(p => p.Categoria.Id == categoriaId.Value);
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

                produtosQuery = produtosQuery.Where(p => produtosComEstoque.Contains(p.Id));
            }


            int totalProdutos = await produtosQuery.CountAsync();

            produtosQuery = ordenarPor.ToLower() switch
            {
                "-preco" => produtosQuery.OrderByDescending(p => p.Preco),
                "preco" => produtosQuery.OrderBy(p => p.Preco),
                "-nome" => produtosQuery.OrderByDescending(p => p.Nome),
                _ => produtosQuery.OrderBy(p => p.Nome)
            };

            var produtosPaginados = await produtosQuery
                .Skip((pagina - 1) * tamanhoPagina)
                .Take(tamanhoPagina)
                .ToListAsync();

            var produtoIds = produtosPaginados.Select(p => p.Id).ToList();

            
            var lancamentos = await _context.Lancamentos
                .Where(l => produtoIds.Contains(l.ProdutoId))
                .GroupBy(l => l.ProdutoId)
                .Select(g => new
                {
                    ProdutoId = g.Key,
                    SomaTotal = g.Sum(l => l.Tipo == "entrada" ? l.Quantidade : -l.Quantidade)
                })
                .ToListAsync();

            var resultado = produtosPaginados.Select(p =>
            {
                var lanc = lancamentos.FirstOrDefault(l => l.ProdutoId == p.Id);
                int estoqueAtual = lanc?.SomaTotal ?? 0;

                return new
                {
                    p.Id,
                    p.Nome,
                    p.Descricao,
                    p.Preco,
                    p.Tamanhos,
                    p.Cores,
                    p.Imagem,
                    Categoria = new { p.Categoria.Id, p.Categoria.Nome },
                    EstoqueAtual = estoqueAtual,
                    Indisponivel = estoqueAtual <= 0,
                    TotalEntradas = 0, 
                    TotalSaidas = 0
                };
            });

            var resultadoPaginado = new
            {
                TotalItems = totalProdutos,
                Page = pagina,
                PageSize = tamanhoPagina,
                TotalPages = (int)Math.Ceiling(totalProdutos / (double)tamanhoPagina),
                Products = resultado
            };

            return Ok(resultadoPaginado);
        }


        [HttpPost]
        public async Task<IActionResult> CriarProduto([FromBody] ProdutoDTO produtoDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var categoria = await _context.Categorias.FindAsync(produtoDto.IdCategoria);
            if (categoria == null)
            {
                return BadRequest("Categoria inválida.");
            }

            var produto = new Produto
            {
                Nome = produtoDto.Nome,
                Descricao = produtoDto.Descricao,
                Preco = produtoDto.Preco,
                Tamanhos = produtoDto.Tamanhos,
                Cores = produtoDto.Cores,
                Imagem = produtoDto.Imagem,
                Categoria = categoria
            };

            _context.Produtos.Add(produto);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProdutos), new { id = produto.Id }, produto);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduto(int id)
        {
            var produto = await _context.Produtos.FindAsync(id);

            if (produto == null)
                return NotFound();

            _context.Produtos.Remove(produto);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> AtualizarProduto(int id, [FromBody] ProdutoDTO produtoDto)
        {
            var produto = await _context.Produtos.Include(p => p.Categoria).FirstOrDefaultAsync(p => p.Id == id);

            if (produto == null)
                return NotFound("Produto não encontrado.");

            var categoria = await _context.Categorias.FindAsync(produtoDto.IdCategoria);
            if (categoria == null)
                return BadRequest("Categoria inválida.");

            // Atualiza os dados
            produto.Nome = produtoDto.Nome;
            produto.Descricao = produtoDto.Descricao;
            produto.Preco = produtoDto.Preco;
            produto.Tamanhos = produtoDto.Tamanhos;
            produto.Cores = produtoDto.Cores;
            produto.Imagem = produtoDto.Imagem;
            produto.Categoria = categoria;

            await _context.SaveChangesAsync();

            return Ok(produto);
        }



    }
}
