using Database;
using Microsoft.EntityFrameworkCore;
using Vitrine.DTO;
using Vitrine.Model;

namespace Vitrine.Services
{
    public class CarrosselService
    {
        private readonly VitrineDbContext _context;

        public CarrosselService(VitrineDbContext context)
        {
            _context = context;
        }

        public async Task<List<Carrossel>> GetAllAsync()
        {
            return await _context.Carrossel.ToListAsync();
        }

        public async Task<(bool sucesso, string? erro, Carrossel? item)> CriarAsync(CarrosselDTO dto)
        {
            if (string.IsNullOrEmpty(dto.Imagem))
                return (false, "Imagem é obrigatória.", null);

            var carrossel = new Carrossel
            {
                Imagem = dto.Imagem
            };

            _context.Carrossel.Add(carrossel);
            await _context.SaveChangesAsync();

            return (true, null, carrossel);
        }

        public async Task<bool> DeletarAsync(int id)
        {
            var carrossel = await _context.Carrossel.FindAsync(id);
            if (carrossel == null)
                return false;

            _context.Carrossel.Remove(carrossel);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
