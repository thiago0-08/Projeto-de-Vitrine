using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Vitrine.Model
{
    public class Produto
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]

       

        [Required]
        public int Id {  get; set; }
        [Required(ErrorMessage = "O nome é obrigatório.")]
        public string Nome { get; set; }
        [Required]
        public string Descricao { get; set; }
        [Required]
        public double Preco { get; set; }
        public List<string> Tamanhos { get; set; } = new List<string>();
        public List<string> Cores { get; set; } = new List<string>();

        [Required]
        public string Imagem { get; set; }
        [Required]
        public Categoria Categoria { get; set; }

    }
}
