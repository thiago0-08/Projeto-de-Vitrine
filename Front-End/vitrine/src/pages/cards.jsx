import '../css/cards.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Api } from '../services/api';

const Cards = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { produtos, pagination, fetchProdutos } = useContext(Api);
  const [ordenarPor, setOrdenarPor] = useState('nome');
  const [apenasDisponiveis, setApenasDisponiveis] = useState(false);
  const cardsData = produtos || [];
  const { currentPage, totalPages } = pagination;

  const params = new URLSearchParams(location.search);
  const categoriaId = params.get('categoria');


  useEffect(() => {
    // console.log("CategoriaId capturado:", categoriaId);
    fetchProdutos(1, 12, '', categoriaId, ordenarPor, apenasDisponiveis);
    window.scrollTo(0, 0);
  }, [location.search, ordenarPor, apenasDisponiveis]);


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
    fetchProdutos(pageNumber, 12, '', categoriaId, ordenarPor, apenasDisponiveis);
  };

  return (
    <>
      <div className='Filtro-produtos'>
        <label>
          <input type="checkbox" checked={apenasDisponiveis} onChange={(e) => setApenasDisponiveis(e.target.checked)} />
          Mostrar apenas produtos disponíveis
        </label>

        <select value={ordenarPor} onChange={(e) => setOrdenarPor(e.target.value)}>
          <option value="nome"> Ordem Crecente </option>
          <option value="-nome">Ordem Decrecente </option>
          <option value="preco">Preço Crescente</option>
          <option value="-preco">Preço Decrecente</option>
        </select>
      </div>

      <div className="cards-container">
        {cardsData.map((produto, index) => (
          <div key={index} className={`card ${produto.indisponivel ? 'indisponivel' : ''}`}>
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
