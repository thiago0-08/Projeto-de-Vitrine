namespace Vitrine.DTO
{
    public class ProdutoDTO
    {
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public double Preco { get; set; }
        public double[] Tamanhos { get; set; } // nao esquece de muda para string *-*-*-*-*-*-* 
        public string[] Cores { get; set; }
        public string Imagem { get; set; }
        public int IdCategoria { get; set; }
    }
}
