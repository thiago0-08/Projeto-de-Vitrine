using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



namespace Vitrine.Model
{
    public class Lancamento
    {
        public int Id { get; set; }
        public int ProdutoId { get; set; }
        [ForeignKey("ProdutoId")]
        public Produto? Produto { get; set; }
        public int Quantidade { get; set; }
        public string Tipo { get; set; }
        public DateTime Data { get; set; }
    }
}
