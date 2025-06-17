import { createContext, useEffect, useState } from 'react';

export const ProdutosContext = createContext();

export const ProdutosProvider = ({ children }) => {
  const [produtos, setProdutos] = useState(null); // usa null pra diferenciar carregando

  const [categoria, setCategoria] = useState([]);

  const URL_API = 'https://localhost:7066';

  useEffect(() => {
    fetch(`${URL_API}/produtos`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao buscar produtos');
        }
        return response.json();
      })
      .then(data => {
        setProdutos(data);
        console.log('Produtos:', data);
      })
      .catch(error => console.error('Erro:', error));
  }, []);

  useEffect(() => {
    fetch(`${URL_API}/categorias`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao buscar categoria');
        }
        return response.json();
      })
      .then(data => {
        setCategoria(data);
        console.log('Categorias:', data);
      })
      .catch(error => console.error('Erro:', error));
  }, []);

  return (
    <ProdutosContext.Provider value={{ produtos, categoria }}>
      {children}
    </ProdutosContext.Provider>
  );
};
