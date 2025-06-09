import React, { useState, useEffect } from 'react';
import './carrossel.css';

const images = [
  'https://picsum.photos/id/237/600/300',
  'https://picsum.photos/id/238/600/300',
  'https://picsum.photos/id/239/600/300'
];

const Carrossel = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel">
      <button className="arrow left" onClick={prevSlide}>
        &#10094;
      </button>

      <img src={images[index]} alt={`Slide ${index + 1}`} className="slide" />

      <button className="arrow right" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default Carrossel;
