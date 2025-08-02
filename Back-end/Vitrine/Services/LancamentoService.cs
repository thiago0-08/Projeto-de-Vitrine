using Microsoft.EntityFrameworkCore;
using Vitrine.DTO;
using Vitrine.Model;
using Database;

namespace Vitrine.Services
{
    public class LancamentoService
    {
        private readonly VitrineDbContext _context;

        public LancamentoService(VitrineDbContext context)
        {
            _context = context;
        }

        public async Task<List<Lancamento>> ObterLancamentosPorProdutoAsync(int produtoId)
        {
            return await _context.Lancamentos
                .Include(l => l.Produto)
                    .ThenInclude(p => p.Categoria)
                .Where(l => l.ProdutoId == produtoId)
                .OrderByDescending(l => l.Data)
                .ToListAsync();
        }

        public async Task<(bool sucesso, string? erro, Lancamento? lancamento)> RealizarLancamentoAsync(LancamentoDTO dto)
        {
            var produto = await _context.Produtos.FindAsync(dto.ProdutoId);
            if (produto == null)
                return (false, "Produto não encontrado.", null);

            if (dto.Tipo != "entrada" && dto.Tipo != "saida")
                return (false, "Tipo inválido. Use 'entrada' ou 'saida'.", null);

            if (dto.Quantidade <= 0)
                return (false, "Quantidade deve ser maior que zero.", null);

            // Calcula estoque atual
            var entradas = await _context.Lancamentos
                .Where(l => l.ProdutoId == dto.ProdutoId && l.Tipo == "entrada")
                .SumAsync(l => (int?)l.Quantidade) ?? 0;

            var saidas = await _context.Lancamentos
                .Where(l => l.ProdutoId == dto.ProdutoId && l.Tipo == "saida")
                .SumAsync(l => (int?)l.Quantidade) ?? 0;

            int estoqueAtual = entradas - saidas;

            if (dto.Tipo == "saida" && estoqueAtual - dto.Quantidade < 0)
                return (false, "Estoque insuficiente para essa saída.", null);

            var lancamento = new Lancamento
            {
                ProdutoId = dto.ProdutoId,
                Quantidade = dto.Quantidade,
                Tipo = dto.Tipo,
                Data = DateTime.UtcNow
            };

            _context.Lancamentos.Add(lancamento);
            await _context.SaveChangesAsync();

            return (true, null, lancamento);
        }
    }
}
