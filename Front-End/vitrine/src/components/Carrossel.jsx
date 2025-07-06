import React, { useState, useEffect } from 'react';
import '../css/carrossel.css';

const Carrossel = () => {
  const [imagens, setImagens] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Buscar as imagens da API
    const fetchImagens = async () => {
      try {
        const response = await fetch('https://localhost:7066/api/carrossel');
        if (!response.ok) throw new Error('Erro ao buscar imagens');

        const data = await response.json();
        setImagens(data); // deve ser um array de objetos com o campo "imagem"
      } catch (error) {
        console.error('Erro ao carregar carrossel:', error);
      }
    };

    fetchImagens();
  }, []);

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % imagens.length);
  };

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 1 + imagens.length) % imagens.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [imagens]);

  if (imagens.length === 0) return <p>Carregando imagens do carrossel...</p>;

  return (
    <div className="carrossel">
      <button className="arrow left" onClick={prevSlide}>
        &#10094;
      </button>

      <img
        src={imagens[index].imagem}
        alt={`Slide ${index + 1}`}
        className="slide"
      />

      <button className="arrow right" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default Carrossel;
