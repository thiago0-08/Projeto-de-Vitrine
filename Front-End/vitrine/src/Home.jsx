import Carrossel from './components/Carrossel/carrossel';
import Cards from './components/cards/cards';
import Rodape from './components/rodape/rodape';
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