using Microsoft.EntityFrameworkCore;
using Vitrine.DTO;
using Vitrine.Model;
using Database;

namespace Vitrine.Services
{
    public class CategoriaService
    {
        private readonly VitrineDbContext _context;

        public CategoriaService(VitrineDbContext context)
        {
            _context = context;
        }

        public async Task<List<Categoria>> ObterCategoriasAsync()
        {
            return await _context.Categorias.ToListAsync();
        }

        public async Task<Categoria?> ObterPorIdAsync(int id)
        {
            return await _context.Categorias.FindAsync(id);
        }

        public async Task<(bool sucesso, string? erro, Categoria? categoria)> CriarAsync(CategoriaDTO dto)
        {
            var existe = await _context.Categorias.AnyAsync(c => c.Nome == dto.Nome);
            if (existe) return (false, "Já existe uma categoria com esse nome.", null);

            var nova = new Categoria
            {
                Nome = dto.Nome,
                Descricao = dto.Descricao,
                Imagem_categoria = dto.ImagemCategoria
            };

            _context.Categorias.Add(nova);
            await _context.SaveChangesAsync();

            return (true, null, nova);
        }

        public async Task<(bool sucesso, string? erro)> AtualizarAsync(int id, CategoriaDTO dto)
        {
            var existente = await _context.Categorias.FindAsync(id);
            if (existente == null) return (false, "Categoria não encontrada.");

            existente.Nome = dto.Nome;
            existente.Descricao = dto.Descricao;
            existente.Imagem_categoria = dto.ImagemCategoria;

            await _context.SaveChangesAsync();
            return (true, null);
        }

        public async Task<bool> DeletarAsync(int id)
        {
            var categoria = await _context.Categorias.FindAsync(id);
            if (categoria == null) return false;

            _context.Categorias.Remove(categoria);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
