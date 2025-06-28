import Carrossel from './components/carrossel';
import Cards from './pages/cards';
import Rodape from './components/Rodape';
import Recomendados from './components/recomendados';

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