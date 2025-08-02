using Microsoft.AspNetCore.Mvc;
using Vitrine.DTO;
using Vitrine.Services;

namespace Vitrine.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarrosselController : ControllerBase
    {
        private readonly CarrosselService _service;

        public CarrosselController(CarrosselService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get() =>
            Ok(await _service.GetAllAsync());

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CarrosselDTO dto)
        {
            var (sucesso, erro, item) = await _service.CriarAsync(dto);
            if (!sucesso) return BadRequest(erro);
            return CreatedAtAction(nameof(Get), new { id = item!.Id }, item);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var sucesso = await _service.DeletarAsync(id);
            return sucesso ? NoContent() : NotFound();
        }
    }

}