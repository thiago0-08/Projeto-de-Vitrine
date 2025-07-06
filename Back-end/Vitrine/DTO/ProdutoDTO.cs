using System.ComponentModel.DataAnnotations;

namespace Vitrine.DTO
{
    public class ProdutoDTO
    {
        [Required]
        public string Nome { get; set; }
        [Required]
        public string Descricao { get; set; }
        [Required]
        public double Preco { get; set; }
        [Required]

        public String[] Tamanhos { get; set; }
        public string[] Cores { get; set; }
        [Required]
        public string Imagem { get; set; }
        [Required]
        public int IdCategoria { get; set; }
    }
}
