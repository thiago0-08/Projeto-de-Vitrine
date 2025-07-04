using Database;
using Microsoft.EntityFrameworkCore;
using Vitrine.DTO;
using Vitrine.Model;

namespace Vitrine.Endpoints
{
    public static class Produtos
    {
        public static void RegistrarEndpointsProduto(this IEndpointRouteBuilder rotas)
        {
            RouteGroupBuilder rotaProdutos = rotas.MapGroup("/produtos");

           
            RouteGroupBuilder rotaProdutosPorCategoria = rotas.MapGroup("/produtosPorCategoria");

            rotaProdutos.MapGet("/", async (
     VitrineDbContext contexto,
     string? nome,
     int pagina = 1,
     int tamanhoPagina = 10,
     int? categoriaId = null,
     string ordenarPor = "nome"
 ) =>
            {
                IQueryable<Produto> produtosQuery = contexto.Produtos.Include(p => p.Categoria);

                if (!string.IsNullOrEmpty(nome))
                {
                    produtosQuery = produtosQuery.Where(p => EF.Functions.ILike(p.Nome, $"%{nome}%"));
                }

                if (categoriaId.HasValue)
                {
                    produtosQuery = produtosQuery.Where(p => p.Categoria.Id == categoriaId.Value);
                }

                var totalProdutos = await produtosQuery.CountAsync();

                // Aplica ordenação
                produtosQuery = ordenarPor.ToLower() switch
                {
                    "-preco" => produtosQuery.OrderByDescending(p => p.Preco),
                    "preco" => produtosQuery.OrderBy(p => p.Preco),
                    "-nome" => produtosQuery.OrderByDescending(p => p.Nome),
                    _ => produtosQuery.OrderBy(p => p.Nome)
                };

                // Pagina os produtos
                var produtosPaginados = await produtosQuery
                    .Skip((pagina - 1) * tamanhoPagina)
                    .Take(tamanhoPagina)
                    .ToListAsync();

                // Pega os IDs dos produtos para buscar os lançamentos
                var produtoIds = produtosPaginados.Select(p => p.Id).ToList();

                // Busca os lançamentos em lote
                var lancamentos = await contexto.Lancamentos
                    .Where(l => produtoIds.Contains(l.ProdutoId))
                    .GroupBy(l => l.ProdutoId)
                    .Select(g => new
                    {
                        ProdutoId = g.Key,
                        TotalEntradas = g.Where(l => l.Tipo == "entrada").Sum(l => l.Quantidade),
                        TotalSaidas = g.Where(l => l.Tipo == "saida").Sum(l => l.Quantidade)
                    })
                    .ToListAsync();

                // Monta resposta final com junção dos dados
                var resultado = produtosPaginados.Select(p =>
                {
                    var lanc = lancamentos.FirstOrDefault(l => l.ProdutoId == p.Id);
                    int entradas = lanc?.TotalEntradas ?? 0;
                    int saidas = lanc?.TotalSaidas ?? 0;
                    int estoqueAtual = entradas - saidas;

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
                        TotalEntradas = entradas,
                        TotalSaidas = saidas
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

                return TypedResults.Ok(resultadoPaginado);
            });


            rotaProdutos.MapGet("/{id}", (VitrineDbContext contexto, int id) =>
            {
                Produto produtoFiltrado = contexto.Produtos.Find(id);

                if (produtoFiltrado == null)
                {
                    return Results.NotFound();
                }

                return TypedResults.Ok(produtoFiltrado);
            });

            rotaProdutos.MapPost("/", (VitrineDbContext contexto, ProdutoDTO produto) =>
            {
                var nomeRepetido = contexto.Produtos.Any(p => p.Nome == produto.Nome);
                if (nomeRepetido)
                {
                    return Results.Conflict("Já existe um produto com esse nome.");
                }

                Categoria categoria = contexto.Categorias.Find(produto.IdCategoria);

                // Verificar se a categoria existe
                if (categoria == null)
                {
                    return Results.NotFound("Categoria não encontrada");
                }

               
                Produto novoProduto = new Produto
                {
                    Nome = produto.Nome,
                    Descricao = produto.Descricao,
                    Preco = produto.Preco,
                    Tamanhos = produto.Tamanhos,
                    Cores = produto.Cores,
                    Imagem = produto.Imagem,
                    Categoria = categoria 
                };

                contexto.Produtos.Add(novoProduto);
                contexto.SaveChanges();

                return TypedResults.Created($"/produtos/{novoProduto.Id}", produto);
            });


            rotaProdutos.MapPut("/{Id}", (VitrineDbContext contexto, int Id, Produto produtoAtualizado) =>
            {
                Produto produtoExistente = contexto.Produtos.Find(Id);

                if (produtoExistente == null)
                {
                    return Results.NotFound();
                }

                
                produtoExistente.Nome = produtoAtualizado.Nome;
                produtoExistente.Descricao = produtoAtualizado.Descricao;
                

                contexto.SaveChanges();

                return Results.NoContent();
            });

            

            rotaProdutos.MapDelete("/{Id}", (VitrineDbContext contexto, int Id) =>
            {
                Produto produto = contexto.Produtos.Find(Id);

                if (produto == null)
                {
                    return Results.NotFound();
                }

                contexto.Produtos.Remove(produto);
                contexto.SaveChanges();

                return Results.NoContent();
            });

            rotaProdutosPorCategoria.MapGet("/{IdCategoria}", (VitrineDbContext contexto, int id) =>
            {
                List<Produto> produtoCategoriaFiltrado = contexto.Produtos
                     .Where(p => p.Categoria.Id == id)
                     .ToList();
                if (produtoCategoriaFiltrado == null || produtoCategoriaFiltrado.Count <= 0)
                {
                    return Results.NotFound();
                }

                return TypedResults.Ok(produtoCategoriaFiltrado);
            });

        }
    }
}