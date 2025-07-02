using Microsoft.EntityFrameworkCore;
using Database;
using Vitrine.Model;

public static class Categorias
{
    public static void RegistrarEndpointsCategoria(this IEndpointRouteBuilder rotas)
    {
        RouteGroupBuilder rotaCategorias = rotas.MapGroup("/categorias");

        rotaCategorias.MapGet("/", (VitrineDbContext contexto) =>
        {
            IQueryable<Categoria> categoriasFiltradas = contexto.Categorias;

            return TypedResults.Ok(categoriasFiltradas.ToList());
        });

        rotaCategorias.MapGet("/{id}", (VitrineDbContext contexto, int id) =>
        {
            Categoria categoriaFiltrada = contexto.Categorias.FirstOrDefault(c => c.Id == id);

            if (categoriaFiltrada == null)
            {
                return Results.NotFound();
            }

            return TypedResults.Ok(categoriaFiltrada);
        });

        rotaCategorias.MapPost("/", async (VitrineDbContext contexto, Categoria categoria) =>
        {
            var nomeJaexistente = await contexto.Categorias.AnyAsync(c => c.Nome == categoria.Nome);
            if (nomeJaexistente)
            {
                return Results.Conflict("Já existe uma categoria com esse nome.");
            }

            contexto.Categorias.Add(categoria);
            await contexto.SaveChangesAsync();

            return TypedResults.Created($"/categorias/{categoria.Id}", categoria);
        });

        rotaCategorias.MapPut("/{Id}", async (VitrineDbContext contexto, int Id, Categoria categoriaAtualizada) =>
        {
            Categoria categoriaExistente = await contexto.Categorias.FindAsync(Id);

            if (categoriaExistente == null)
            {
                return Results.NotFound();
            }

            categoriaExistente.Nome = categoriaAtualizada.Nome; 

            await contexto.SaveChangesAsync();

            return Results.NoContent();
        });

        rotaCategorias.MapDelete("/{Id}", async (VitrineDbContext contexto, int Id) =>
        {
            Categoria categoria = await contexto.Categorias.FindAsync(Id);

            if (categoria == null)
            {
                return Results.NotFound();
            }

            contexto.Categorias.Remove(categoria);
            await contexto.SaveChangesAsync();

            return Results.NoContent();
        });
    }
}
