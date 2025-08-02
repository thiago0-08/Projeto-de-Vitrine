using Microsoft.AspNetCore.Mvc;
using Vitrine.DTO;
using Vitrine.Services;

namespace Vitrine.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriasController : ControllerBase
    {
        private readonly CategoriaService _service;

        public CategoriasController(CategoriaService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var categorias = await _service.ObterCategoriasAsync();
            return Ok(categorias);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var categoria = await _service.ObterPorIdAsync(id);
            if (categoria == null) return NotFound();
            return Ok(categoria);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CategoriaDTO dto)
        {
            var (sucesso, erro, nova) = await _service.CriarAsync(dto);
            if (!sucesso) return Conflict(erro);

            return CreatedAtAction(nameof(GetById), new { id = nova!.Id }, nova);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] CategoriaDTO dto)
        {
            var (sucesso, erro) = await _service.AtualizarAsync(id, dto);
            if (!sucesso) return NotFound(erro);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deletado = await _service.DeletarAsync(id);
            return deletado ? NoContent() : NotFound();
        }
    }
}
