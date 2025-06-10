import './cards.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Cards = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 12;

  const cardsData = [
    {
      title: 'Card 1',
      description: 'This is the first card.',
      preco: 'R$ 299,99',
      imageUrl: 'https://acdn-us.mitiendanube.com/stores/002/536/162/products/camisa-barcelona-away-24-25-nike-torcedor-masculina-preto-imagem1-jpg-68332fd770eb179d8517261044747702-480-0.jpeg'
    },
    {
      title: 'Card 2',
      description: 'This is the second card.',
      preco: 'R$ 299,99',
      imageUrl: 'https://acdn-us.mitiendanube.com/stores/002/322/390/products/camisa-argentina-50-anos1-2c5c2156a2fb1695c517393856675200-640-0.jpeg'
    },
    {
      title: 'Card 3',
      description: 'This is the third card.',
      preco: 'R$ 299,99',
      imageUrl: 'https://acdn-us.mitiendanube.com/stores/002/043/849/products/camisa-arsenal-away-2223-torcedor-adidas-masculina-preta-11-119c67cf59a7f6486316582862035066-640-01-db8dd7a9e4a33824ba16698324065865-480-0.png'
    },
    {
      title: 'Card 4',
      description: 'Mais um produto.',
      preco: 'R$ 299,99',
      imageUrl: 'https://acdn-us.mitiendanube.com/stores/002/201/888/products/c487062a1-f7992a55c2e0edc24016600730665442-1024-1024.jpg'
    },
     {
      title: 'Card 4',
      description: 'Mais um produto.',
      preco: 'R$ 299,99',
      imageUrl: 'https://acdn-us.mitiendanube.com/stores/002/201/888/products/c487062a1-f7992a55c2e0edc24016600730665442-1024-1024.jpg'
    },
     {
      title: 'Card 4',
      description: 'Mais um produto.',
      preco: 'R$ 299,99',
      imageUrl: 'https://acdn-us.mitiendanube.com/stores/002/201/888/products/c487062a1-f7992a55c2e0edc24016600730665442-1024-1024.jpg'
    }
  ];

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cardsData.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(cardsData.length / cardsPerPage);

  const handleComprar = (produto) => {
    navigate('/produto', { state: { produto } });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="cards-container">
        {currentCards.map((card, index) => (
          <div className="card" key={index}>
            <img src={card.imageUrl} alt={card.title} className="card-image" />
            <h3 className="card-title">{card.title}</h3>
            <p className="card-description">{card.description}</p>
            <p className="card-preco">{card.preco}</p>
            <button className="card-button" onClick={() => handleComprar(card)}>
              Comprar
            </button>
          </div>
        ))}
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
};

export default Cards;