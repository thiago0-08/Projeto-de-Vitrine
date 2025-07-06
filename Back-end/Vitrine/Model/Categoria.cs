using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Vitrine.Model
{
    public class Categoria
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id {  get; set; }
       
        public string Nome { get; set; }
        public string? Descricao { get; set; }

        public string? Imagem_categoria { get; set; }



    }
}
