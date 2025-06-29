// src/pages/Home.jsx
import Carrossel from './components/Carrossel';
import Recomendados from './components/Recomendados';
import Cards from './pages/cards';
import './css/home.css';

const Home = () => {
  return (
    <main className="home-container">
      <section className="home-section home-carousel" aria-label="Destaques">
        <Carrossel />
      </section>

      <section className="home-section home-recomendados" aria-labelledby="recomendados-title">
        <Recomendados />
      </section>

      <section className="home-section home-cards" aria-labelledby="cards-title">
        <h2 id="cards-title" className="home-title">Todos os Produtos</h2>
        <Cards />
      </section>
    </main>
  );
};

export default Home;
