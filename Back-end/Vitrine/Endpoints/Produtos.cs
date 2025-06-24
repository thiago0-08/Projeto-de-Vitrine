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

            rotaProdutos.MapGet("/", async (VitrineDbContext contexto, string? nome, int pagina = 1, int tamanhoPagina = 10) =>
            {
                IQueryable<Produto> produtosQuery = contexto.Produtos.AsQueryable();

                if (!string.IsNullOrEmpty(nome))
                {
                    //case-insensitive no PostgreSQL 
                    produtosQuery = produtosQuery.Where(p => EF.Functions.ILike(p.Nome, $"%{nome}%"));
                }

               
                var totalProdutos = await produtosQuery.CountAsync();

               
                var produtosPaginados = await produtosQuery
                    .OrderBy(p => p.Nome) 
                    .Skip((pagina - 1) * tamanhoPagina)
                    .Take(tamanhoPagina)
                    .ToListAsync();

                var resultadoPaginado = new
                {
                    TotalItems = totalProdutos,
                    Page = pagina,
                    PageSize = tamanhoPagina,
                    TotalPages = (int)Math.Ceiling(totalProdutos / (double)tamanhoPagina),
                    Products = produtosPaginados
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