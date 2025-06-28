import '../css/recomendados.css';
import { useContext } from 'react';
import { NavLink } from "react-router-dom";
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
                    <NavLink to={`/cards?categoria=${categoria.id}`} className="recomendado-link"> 
                    <img src={categoria.imagem_categoria  || "/imagem-indisponivel.jpg"} alt={categoria.nome} loading="lazy" />
                        {categoria.nome} 
                    </NavLink>
                </div>
                 ))}
            </div>
        </div>
    );

};

export default Recomendados;



