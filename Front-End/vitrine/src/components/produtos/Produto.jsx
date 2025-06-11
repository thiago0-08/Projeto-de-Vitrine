import { useLocation } from 'react-router-dom';
import './produto.css';

const Produto = () => {
  const location = useLocation();
  const { produto } = location.state || {};

  if (!produto) return <div className="produto-not-found">Produto não encontrado</div>;

  return (
    <div className="produto-container">
      <div className="produto-card">
        <div className="produto-image-container">
          <img 
            src={produto.imageUrl} 
            alt={produto.title} 
            className="produto-image"
            loading="lazy"
          />
        </div>
        <div className="produto-info">
          <h1 className="produto-title">{produto.title}</h1>
          <p className="produto-descricao">{produto.description}</p>
          <div className="produto-preco-container">
            <span className="produto-preco">{produto.preco}</span>
            <button className="produto-botao">Adicionar ao Carrinho</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Produto;