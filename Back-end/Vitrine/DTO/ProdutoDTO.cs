using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Vitrine.DTO
{
    public class ProdutoDTO
    {
        public int Id { get; set; }

        [Required]
        public string Nome { get; set; }

        [Required]
        public string Descricao { get; set; }

        [Required]
        public double Preco { get; set; }

        [Required]
        public List<string> Tamanhos { get; set; } = new();

        public List<string> Cores { get; set; } = new();

        [Required]
        public string Imagem { get; set; }

        [Required]
        public int IdCategoria { get; set; }
        public string? NomeCategoria { get; set; }
    }
}
