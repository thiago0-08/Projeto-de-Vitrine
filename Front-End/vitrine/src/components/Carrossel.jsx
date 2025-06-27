import React, { useState, useEffect } from 'react';
import './carrossel.css';

const images = [
  'https://acdn-us.mitiendanube.com/stores/002/322/390/themes/toluca/1-img-1915875354-1747434047-b0f62c051926174d7d497230bd0941e51747434047-1920-1920.png?627804160',
  'https://acdn-us.mitiendanube.com/stores/002/322/390/themes/toluca/1-slide-1747433565035-8539336092-e79ed66eb19ce9ea08069ead0015fa221747433568-640-0.jpg?627804160',
  'https://acdn-us.mitiendanube.com/stores/002/322/390/themes/toluca/1-slide-1747433565035-7669203113-93be0884a503f4ebddd1a85d97f98e101747433568-640-0.png?627804160'
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
