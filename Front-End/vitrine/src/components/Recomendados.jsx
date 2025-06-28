import '../css/recomendados.css';
import { useContext } from 'react';
import { Api } from '../services/api'; 


const Recomendados = () => {
    const {categoria} = useContext(Api);
    const cardsData = categoria || [];


    return (
        <div className="recomendados">
            <h2 className='recomendados-title'>Procure por Competições </h2>
            <div className="recomendados-list">
                {cardsData.map((categoria, index) => ( 
                <div key={categoria.id} className="recomendado-item">
                    <img src={categoria.imagem_categoria  || "/imagem-indisponivel.jpg"} alt={categoria.nome} loading="lazy" />
                    {categoria.nome} 
                </div>
                 ))}
            </div>
        </div>
    );

};

export default Recomendados;