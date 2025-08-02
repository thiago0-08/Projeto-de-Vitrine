using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Vitrine.DTO;
using Vitrine.Services;

namespace Vitrine.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProdutosController : ControllerBase
    {
        private readonly ProdutoService _service;

        public ProdutosController(ProdutoService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetProdutos(string? nome, int? categoriaId, bool apenasDisponiveis = false)
        {
            var produtos = await _service.GetProdutosAsync(nome, categoriaId, apenasDisponiveis);
            return Ok(produtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduto(int id)
        {
            var produto = await _service.GetProdutoByIdAsync(id);
            if (produto == null)
                return NotFound();

            return Ok(produto);
        }

        [HttpPost]
        public async Task<IActionResult> CriarProduto([FromBody] ProdutoDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var (sucesso, erro, produto) = await _service.CriarProdutoAsync(dto);

            if (!sucesso)
                return BadRequest(erro);

            return CreatedAtAction(nameof(GetProduto), new { id = produto.Id }, produto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> AtualizarProduto(int id, [FromBody] ProdutoDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var (sucesso, erro) = await _service.AtualizarProdutoAsync(id, dto);

            if (!sucesso)
                return NotFound(erro);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletarProduto(int id)
        {
            var sucesso = await _service.DeletarProdutoAsync(id);
            if (!sucesso)
                return NotFound();

            return NoContent();
        }
    }
}
