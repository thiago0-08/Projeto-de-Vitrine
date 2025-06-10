import { useLocation } from 'react-router-dom';

const Produto = () => {
  const location = useLocation();
  const { produto } = location.state || {};

  if (!produto) return <p>Produto não encontrado</p>;

  return (
    <div>
      <h1>{produto.title}</h1>
      <img src={produto.imageUrl} alt={produto.title} style={{ width: '300px' }} />
      <p>{produto.description}</p>
      <p><strong>{produto.preco}</strong></p>
    </div>
  );
};

export default Produto;