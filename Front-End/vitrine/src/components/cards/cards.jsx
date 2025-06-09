import './cards.css';
import React from 'react';

const Cards = () => {
  const cardsData = [
    {
      title: 'Card 1',
      description: 'This is the first card.',
      imageUrl: 'https://acdn-us.mitiendanube.com/stores/002/536/162/products/camisa-barcelona-away-24-25-nike-torcedor-masculina-preto-imagem1-jpg-68332fd770eb179d8517261044747702-480-0.jpeg'
    },
    {
      title: 'Card 2',
      description: 'This is the second card.',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5VwYtrt6dvjUTeNuvwwxaRzspAcpBIKwU1w&s'
    },
    {
      title: 'Card 3',
      description: 'This is the third card.',
      imageUrl: 'https://acdn-us.mitiendanube.com/stores/002/043/849/products/camisa-arsenal-away-2223-torcedor-adidas-masculina-preta-11-119c67cf59a7f6486316582862035066-640-01-db8dd7a9e4a33824ba16698324065865-480-0.png'
    },
     {
      title: 'Card 3',
      description: 'This is the third card.',
      imageUrl: 'https://acdn-us.mitiendanube.com/stores/002/201/888/products/c487062a1-f7992a55c2e0edc24016600730665442-1024-1024.jpg'
    }
  ];

  return (
    <div className="cards-container">
      {cardsData.map((card, index) => (
        <div className="card" key={index}>
          <img src={card.imageUrl} alt={card.title} className="card-image" />
          <h3 className="card-title">{card.title}</h3>
          <p className="card-description">{card.description}</p>
        </div>
      ))}
    </div>
  );
}
 
export default Cards;