import { useEffect, useState } from 'react';
import { FiArrowDownCircle, FiArrowUpCircle } from 'react-icons/fi';
import '../css/tabelaLancamentos.css';

const TabelaLancamentos = ({ produtoId, atualizar }) => {
  const [lancamentos, setLancamentos] = useState([]);
  const [erro, setErro] = useState('');
  const URL_API = `https://localhost:7066/api/lancamentos?produtoId=${produtoId}`;



  useEffect(() => {
    const fetchLancamentos = async () => {
      try {
        const response = await fetch(URL_API);
        if (!response.ok) {
          const erroTexto = await response.text();
          throw new Error(erroTexto);
        }
        const data = await response.json();
        setLancamentos(data);
        setErro('');
      } catch (error) {
        setErro(error.message);
        setLancamentos([]);
      }
    };

    if (produtoId) {
      fetchLancamentos();
    }
  }, [produtoId, atualizar]);





  return (
    <div className="tabela-lancamentos">
      {erro && <p className="erro">{erro}</p>}

      {!erro && lancamentos.length === 0 && <p className="empty-message">Nenhum lançamento encontrado.</p>}

      {!erro && lancamentos.length > 0 && (
        <table className="launch-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Tipo</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {lancamentos.map((lanc) => (
              <tr key={lanc.id}>
                <td>{new Date(lanc.data).toLocaleDateString('pt-BR')}</td>
                <td className={`type-cell ${lanc.tipo}`}>
                  {lanc.tipo === 'entrada' ? (
                    <>
                      <FiArrowDownCircle className="icon icon--in" />
                      Entrada
                    </>
                  ) : (
                    <>
                      <FiArrowUpCircle className="icon icon--out" />
                      Saída
                    </>
                  )}
                </td>
                <td>{lanc.quantidade > 0 ? `+${lanc.quantidade}` : lanc.quantidade}</td>
              </tr>
            ))}
          </tbody>
        </table>

      )}
    </div>
  );
};

export default TabelaLancamentos;
