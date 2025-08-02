using System.ComponentModel.DataAnnotations;

namespace Vitrine.DTO
{
    public class LancamentoDTO
    {
        public int ProdutoId { get; set; }
        public int Quantidade { get; set; }
        public string Tipo { get; set; } // entrada | saida
    }
}

