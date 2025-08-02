using System.ComponentModel.DataAnnotations;

namespace Vitrine.DTO
{
    public class CategoriaDTO
    {
        public string Nome { get; set; }
        public string? Descricao { get; set; }
        public string? ImagemCategoria { get; set; }
    }
}

