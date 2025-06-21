import './cards.css';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { Api } from '../../Api/api';

const Cards = () => {




  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 12;

  const { produtos } = useContext(Api);
  console.log('Produtos no Cards:', produtos);
  const cardsData = produtos?.products || [];

  if (!produtos || cardsData.length === 0) {
    return <div className="loading">Carregando produtos...</div>;
  }

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cardsData.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(cardsData.length / cardsPerPage);
  if (totalPages === 0) {
    return <div className="loading">Nenhum produto encontrado.</div>;
  }

  const handleComprar = (produto) => {
    navigate('/produto', { state: { produto } });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="cards-container">
        {currentCards.length > 0 ? (
          currentCards.map((produto, index) => (
            <div key={index} className="card">
              <img src={produto.imagem} alt={produto.nome} className="card-image" />
              <h3 className="card-title">{produto.nome}</h3>
              <p className="card-description">{produto.descricao}</p>
              <span className="card-preco">R$ {produto.preco}</span>
              <button className="card-button" onClick={() => handleComprar(produto)}>
                Comprar
              </button>
            </div>

          ))
        ) : (
          <p>Carregando produtos...</p>
        )}
      </div>
      
      <div className="pagination-info">
        <p>
          Página {currentPage} de {totalPages}
        </p>
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? 'page-button active' : 'page-button'}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </>
  );
}

export default Cards;
