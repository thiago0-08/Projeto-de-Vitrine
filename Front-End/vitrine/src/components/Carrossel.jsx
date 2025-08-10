import React, { useState, useEffect, useRef } from 'react';
import '../css/carrossel.css';

const Carrossel = () => {
  const [imagens, setImagens] = useState([]);
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchImagens = async () => {
      try {
        const response = await fetch('https://localhost:7066/api/carrossel');
        if (!response.ok) throw new Error('Erro ao buscar imagens');

        const data = await response.json();
        setImagens(data);
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

  const startAutoPlay = () => {
    if (imagens.length > 0) {
      intervalRef.current = setInterval(nextSlide, 5000);
    }
  };

  const stopAutoPlay = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [imagens]);

  if (imagens.length === 0) return <p>Carregando imagens...</p>;

  return (
    <div 
      className="carrossel" 
      onMouseEnter={stopAutoPlay} 
      onMouseLeave={startAutoPlay}
    >
      <button className="arrow left" onClick={prevSlide} aria-label="Slide anterior">
        &#10094;
      </button>

      <img
        src={imagens[index].imagem}
        alt={imagens[index].descricao || `Slide ${index + 1}`}
        className="slide"
      />

      <button className="arrow right" onClick={nextSlide} aria-label="Próximo slide">
        &#10095;
      </button>

      <div className="indicators">
        {imagens.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? 'active' : ''}`}
            onClick={() => setIndex(i)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carrossel;
