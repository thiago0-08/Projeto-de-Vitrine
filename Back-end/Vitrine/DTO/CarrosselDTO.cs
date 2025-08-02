using System.ComponentModel.DataAnnotations;

namespace Vitrine.DTO
{
    public class CarrosselDTO
    {
        public int Id { get; set; }
        [Required]
        public string Imagem { get; set; }
    }
}
