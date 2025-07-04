import { createContext, useEffect, useState } from 'react';

export const Api = createContext();

export const ProdutosProvider = ({ children }) => {
  const [produtos, setProdutos] = useState(null);
  const [categoria, setCategoria] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    pageSize: 12
  });

  const URL_API = 'https://localhost:7066';

  useEffect(() => {
    fetchProdutos();
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
        // console.log('Categorias:', data);
      })
      .catch(error => console.error('Erro:', error));
  }, []);

  
  const fetchProdutos = async (page = 1, pageSize = 12, searchTerm = '' , categoriaId = '', ordenarPor = 'nome', apenasDisponiveis = false) => {
  try {
    const url = `${URL_API}/produtos?pagina=${page}&tamanhoPagina=${pageSize}` +
      (searchTerm ? `&nome=${encodeURIComponent(searchTerm)}` : '') +
      (categoriaId ? `&categoriaId=${categoriaId}` : ''); +
      `&ordenarPor=${ordenarPor}` +
      (apenasDisponiveis ? `&apenasDisponiveis=true` : '');

      

    

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Erro ao buscar produtos');
    }

    const data = await response.json();
    setProdutos(data.products);
    setPagination({
      currentPage: data.page,
      totalPages: data.totalPages,
      pageSize: data.pageSize
    });


  
return data.products;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
  }
};


  return (
    <Api.Provider value={{ produtos, categoria, fetchProdutos, pagination }}>
      {children}
    </Api.Provider>
  );
};
