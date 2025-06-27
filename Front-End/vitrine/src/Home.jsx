import Carrossel from './components/carrossel';
import Cards from './pages/cards/cards';
import Rodape from './components/rodape';
import Recomendados from './components/recomendados/recomendados';

const Home = () => {
  return (
    <div>

      <Carrossel />
      <Recomendados />
      <Cards />
    </div>

  );
};

export default Home;