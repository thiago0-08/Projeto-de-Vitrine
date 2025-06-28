import '../css/cards.css';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { useContext, useEffect } from 'react';
import { Api } from '../services/api';

const Cards = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const { produtos, pagination, fetchProdutos } = useContext(Api);

  const cardsData = produtos || [];
  const { currentPage, totalPages } = pagination;

  const params = new URLSearchParams(location.search);
  const categoriaId = params.get('categoria');


  useEffect(() => {
  // console.log("CategoriaId capturado:", categoriaId);
  fetchProdutos(1, 12, '', categoriaId);
  window.scrollTo(0, 0);
}, [location.search]);


  if (!produtos) {
    return <div className="loading">Carregando produtos...</div>;
  }

  if (cardsData.length === 0) {
    return <div className="loading">Nenhum produto encontrado.</div>;
  }

  const handleComprar = (produto) => {
    navigate('/produto', { state: { produto } });
  };

  const handlePageChange = (pageNumber) => {
    fetchProdutos(pageNumber, 12, '', categoriaId);
  };

  return (
    <>
      <div className="cards-container">
        {cardsData.map((produto, index) => (
          <div key={index} className="card">
            <img src={produto.imagem} alt={produto.nome} className="card-image" />
            <h3 className="card-title">{produto.nome}</h3>
            <p className="card-description">{produto.descricao}</p>
            <span className="card-preco">R$ {produto.preco}</span>
            <button className="card-button" onClick={() => handleComprar(produto)}>
              Comprar
            </button>
          </div>
        ))}
      </div>

      <div className="pagination-info">
        <p>Página {currentPage} de {totalPages}</p>
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? 'page-button active' : 'page-button'}
            onClick={() => handlePageChange(i + 1)}
            disabled={currentPage === i + 1}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default Cards;
