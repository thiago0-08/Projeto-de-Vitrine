import '../../css/NovaCategoria.css';
import React, { useState, useContext } from 'react';
import { Api } from '../../services/api';

const NovaCategoria = () => {
    const { categoria, addCategoria } = useContext(Api);
    const [nome, setNome] = useState('');
    const [imagem, setImagem] = useState('');
    const [descricao, setDescricao] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const novaCategoria = {
            nome,
            descricao,
            imagem,
        };

        const resultado = await addCategoria(novaCategoria);
        if (resultado) {
            alert("Categoria adicionada com sucesso!");
            setNome('');
            setDescricao('');
            setImagem('');
            
        } else {
            alert("Erro ao adicionar categoria.");
        }

    };

    return (
        <div className="nova-categoria-container">
            <h2>Adicionar Nova Categoria</h2>
            
            <div className="form-and-preview">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nome-categoria">Nome da Categoria:</label>
                        <input
                            id="nome-categoria"
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="link-imagem">Imagem (link):</label>
                        <textarea
                            id="link-imagem"
                            value={imagem}
                            onChange={(e) => setImagem(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-adicionar">Adicionar Categoria</button>
                </form>

                <div className="preview">
                    <h3>Pré-visualização:</h3>
                    {imagem ? (
                        <img src={imagem} alt="Pré-visualização da categoria" />
                    ) : (
                        <p>Nenhuma imagem selecionada</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NovaCategoria;