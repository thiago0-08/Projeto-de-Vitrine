using Database;
using Microsoft.EntityFrameworkCore;
using Vitrine.Model;



namespace Vitrine.Endpoints
{
    public static class Lancamentos
    {
        public static void RegistrarEndpointsLancamento(this IEndpointRouteBuilder rotas)
        {
            var grupo = rotas.MapGroup("/lancamentos");

            // Listar todos os lançamentos de um produto (ordem cronológica)
            grupo.MapGet("/produto/{produtoId}", async (VitrineDbContext contexto, int produtoId) =>
            {
                var lancamentos = await contexto.Lancamentos
                    .Where(l => l.ProdutoId == produtoId)
                    .OrderBy(l => l.Data)
                    .ToListAsync();

                if (!lancamentos.Any())
                {
                    return Results.NotFound("Nenhum lançamento encontrado para este produto.");
                }

                return TypedResults.Ok(lancamentos);
            });

            // Criar lançamento (entrada ou saída)
            grupo.MapPost("/", async (VitrineDbContext contexto, Lancamento lancamento) =>
            {
                var produto = await contexto.Produtos.FindAsync(lancamento.ProdutoId);
                if (produto == null)
                {
                    return Results.NotFound("Produto não encontrado.");
                }

                if (lancamento.Tipo != "entrada" && lancamento.Tipo != "saida")
                {
                    return Results.BadRequest("Tipo inválido. Use 'entrada' ou 'saida'.");
                }

                if (lancamento.Quantidade <= 0)
                {
                    return Results.BadRequest("Quantidade deve ser maior que zero.");
                }

                // Calcula estoque atual
                var entradas = await contexto.Lancamentos
                    .Where(l => l.ProdutoId == lancamento.ProdutoId && l.Tipo == "entrada")
                    .SumAsync(l => (int?)l.Quantidade) ?? 0;

                var saidas = await contexto.Lancamentos
                    .Where(l => l.ProdutoId == lancamento.ProdutoId && l.Tipo == "saida")
                    .SumAsync(l => (int?)l.Quantidade) ?? 0;

                int estoqueAtual = entradas - saidas;

                // Valida saída
                if (lancamento.Tipo == "saida" && estoqueAtual - lancamento.Quantidade < 0)
                {
                    return Results.BadRequest("Estoque insuficiente para essa saída.");
                }

                lancamento.Data = DateTime.UtcNow;

                contexto.Lancamentos.Add(lancamento);
                await contexto.SaveChangesAsync();

                return TypedResults.Created($"/lancamentos/{lancamento.Id}", lancamento);
            });
        }
    }
}
