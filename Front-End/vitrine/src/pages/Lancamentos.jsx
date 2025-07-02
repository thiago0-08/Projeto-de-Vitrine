import { useContext, useEffect, useState } from 'react';
import { Api } from '../services/api';
import '../css/lancamentos.css';

const Lancamentos = () => {
  const { produtos, fetchProdutos } = useContext(Api);
  const [produtoId, setProdutoId] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [tipo, setTipo] = useState('entrada');
  const [mensagem, setMensagem] = useState('');
  const [estoqueAtual, setEstoqueAtual] = useState(null);

  const URL_API = 'https://localhost:7066/lancamentos';

  useEffect(() => {
    fetchProdutos();
  }, []);

  // Atualiza o estoque quando seleciona um produto
  useEffect(() => {
    if (!produtoId || !produtos) return;

    const prod = produtos.find(p => p.id === parseInt(produtoId));
    if (prod) {
      setEstoqueAtual(prod.estoqueAtual);
    }
  }, [produtoId, produtos]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');

    try {
      const lancamento = {
        produtoId: parseInt(produtoId),
        quantidade: parseInt(quantidade),
        tipo: tipo,
        data: new Date().toISOString()
      };

      const response = await fetch(URL_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lancamento)
      });

      if (!response.ok) {
        const erro = await response.text();
        throw new Error(erro);
      }

      setMensagem('✅ Lançamento realizado com sucesso!');
      setQuantidade(1);
      setTipo('entrada');
      setProdutoId('');
      setEstoqueAtual(null);
      fetchProdutos(); // atualizar a lista com novo estoque
    } catch (error) {
      setMensagem(`❌ Erro: ${error.message}`);
    }
  };

  return (
    <div className="lancamentos-container">
      <h2>Registrar Lançamento de Estoque</h2>
      <form onSubmit={handleSubmit} className="lancamentos-form">
        <label>
          Produto:
          <select value={produtoId} onChange={(e) => setProdutoId(e.target.value)} required>
            <option value="">Selecione um produto</option>
            {produtos?.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome}
              </option>
            ))}
          </select>
        </label>

        {estoqueAtual !== null && (
          <p className="estoque-info">
            Estoque atual: <strong>{estoqueAtual}</strong>
          </p>
        )}

        <label>
          Quantidade:
          <input
            type="number"
            min="1"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            required
          />
        </label>

        <label>
          Tipo:
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
            disabled={estoqueAtual === 0 && tipo === 'saida'}
          >
            <option value="entrada">Entrada</option>
            <option value="saida" disabled={estoqueAtual === 0}>Saída</option>
          </select>
        </label>

        <button type="submit">Lançar</button>
      </form>

      {mensagem && <p className={`mensagem ${mensagem.includes('Erro') ? 'erro' : 'sucesso'}`}>{mensagem}</p>}
    </div>
  );
};

export default Lancamentos;
