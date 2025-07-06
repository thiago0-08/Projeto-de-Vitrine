using Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vitrine.Model;

namespace Vitrine.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarrosselController : ControllerBase
    {
        private readonly VitrineDbContext _context;

        public CarrosselController(VitrineDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetCarrossel()
        {
            var carrosseis = await _context.Carrossel.ToListAsync();
            return Ok(carrosseis);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCarrossel(int id)
        {
            var carrossel = await _context.Carrossel.FindAsync(id);

            if (carrossel == null)
                return NotFound();

            return Ok(carrossel);
        }

        
        [HttpPost]
        public async Task<IActionResult> CriarCarrossel([FromBody] Carrossel carrossel)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Carrossel.Add(carrossel);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCarrossel), new { id = carrossel.Id }, carrossel);
        }

        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCarrossel(int id)
        {
            var carrossel = await _context.Carrossel.FindAsync(id);

            if (carrossel == null)
                return NotFound();

            _context.Carrossel.Remove(carrossel);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
