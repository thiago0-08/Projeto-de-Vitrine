import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import '../css/produto.css';

const Produto = () => {
  const location = useLocation();
  const { produto } = location.state || {};
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState(null);

  if (!produto) {
    return <div className="produto-not-found">Produto não encontrado</div>;
  }

  const estoqueClasse = produto.estoqueAtual > 5 ? 'alto' : 'baixo';

  return (
    <div className="produto-container">
      <div className="produto-card">
        <div className="produto-image-container">
          <img
            src={produto.imagem}
            alt={produto.nome}
            className="produto-image"
            loading="lazy"
          />
        </div>

        <div className="produto-info">
          <h1 className="produto-title">{produto.nome}</h1>
          <p className="produto-descricao">Descrição: {produto.descricao}</p>
          <p className={`produto-quantidade ${estoqueClasse}`}>
            Quantidade Disponível: {produto.estoqueAtual}
          </p>

          <div className="produto-tamanho">
            <span>Selecione um tamanho:</span>
            <div className="tamanhos-lista">
              {produto.tamanhos?.map((tamanho) => (
                <button
                  key={tamanho}
                  className={`tamanho-badge ${tamanhoSelecionado === tamanho ? 'ativo' : ''}`}
                  onClick={() => setTamanhoSelecionado(tamanho)}
                >
                  {tamanho}
                </button>
              ))}
            </div>
            <span className="tamanho-selecionado">
              Selecionado: {tamanhoSelecionado || 'Nenhum'}
            </span>
          </div>

          <p className="produto-cor">Cor: {produto.cores}</p>

          <div className="produto-preco-container">
            <span className="produto-preco">Valor R$ {produto.preco}</span>
            <button
              className="produto-botao"
              disabled={produto.estoqueAtual === 0}
            >
              {produto.estoqueAtual === 0 ? 'Indisponível' : 'Adicionar ao Carrinho'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Produto;
