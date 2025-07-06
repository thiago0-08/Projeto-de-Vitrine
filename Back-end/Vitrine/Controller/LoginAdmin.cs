using Microsoft.AspNetCore.Mvc;
using Vitrine.Model;

namespace Vitrine.Controller
{
    [ApiController]
    [Route("admin/login")]
    public class LoginAdminController : ControllerBase
    {
        [HttpPost]
        public IActionResult ValidarLoginAdmin([FromBody] Usuario request)
        {
            if (request.Email == "admin" && request.Senha == "1234")
            {
                var response = new LoginResponse
                {
                    Token = "token-teste",
                    Mensagem = "Login válido"
                };

                return Ok(response);
            }

            return Unauthorized(new LoginResponse { Mensagem = "Login inválido" });
        }
    }
}
