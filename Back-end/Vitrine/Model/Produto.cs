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
        public string[] Tamanhos { get; set; }
        public string[] Cores { get; set; }
        [Required]
        public string Imagem { get; set; }
        [Required]
        public Categoria Categoria { get; set; }

    }
}
