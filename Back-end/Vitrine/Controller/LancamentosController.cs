using Microsoft.AspNetCore.Mvc;
using Vitrine.DTO;
using Vitrine.Services;

namespace Vitrine.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LancamentosController : ControllerBase
    {
        private readonly LancamentoService _service;

        public LancamentosController(LancamentoService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetLancamentos([FromQuery] int produtoId)
        {
            var resultado = await _service.ObterLancamentosPorProdutoAsync(produtoId);

            if (resultado == null || resultado.Count == 0)
                return NotFound("Nenhum lançamento encontrado para este produto.");

            return Ok(resultado);
        }

        [HttpPost]
        public async Task<IActionResult> CriarLancamento([FromBody] LancamentoDTO dto)
        {
            var (sucesso, erro, lancamento) = await _service.RealizarLancamentoAsync(dto);

            if (!sucesso)
                return BadRequest(erro);

            return CreatedAtAction(nameof(GetLancamentos), new { produtoId = lancamento.ProdutoId }, lancamento);
        }
    }
}
