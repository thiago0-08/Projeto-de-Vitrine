import '../../css/NovoProduto.css';
import React, { useState, useContext } from 'react';
import { Api } from '../../services/api'; 

const NovoProduto = () => {
  const { categoria, addProduto } = useContext(Api); 

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [cor, setCor] = useState('');
  const [imagem, setImagem] = useState('');
  const [idCategoria, setIdCategoria] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novoProduto = {
      nome,
      descricao,
      preco: Number(preco),
      tamanhos: [tamanho], 
      cores: [cor], 
      imagem,
      idCategoria: Number(idCategoria),
      nomeCategoria: categoria.find(c => c.id === Number(idCategoria))?.nome || ""
    };

    const resultado = await addProduto(novoProduto);
    if (resultado) {
      alert("Produto adicionado com sucesso!");
      setNome('');
      setDescricao('');
      setPreco('');
      setTamanho('');
      setCor('');
      setImagem('');
      setIdCategoria('');
    }
  };

  return (
    <div className='Container'>
      <div className="novo-produto">
        <h2>Adicionar Novo Produto</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome do Produto:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Descrição:</label>
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Preço:</label>
            <input
              type="number"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Tamanho:</label>
            <input
              type="text"
              value={tamanho}
              onChange={(e) => setTamanho(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Cor:</label>
            <input
              type="text"
              value={cor}
              onChange={(e) => setCor(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Imagem (link):</label>
            <textarea
              value={imagem}
              onChange={(e) => setImagem(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Categoria:</label>
            <select
              value={idCategoria}
              onChange={(e) => setIdCategoria(e.target.value)}
              required
            >
              <option value="">Selecione</option>
              {categoria.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.nome}
                </option>
              ))}
            </select>
          </div>

          <button type="submit">Adicionar Produto</button>
        </form>
      </div>
    </div>
  );
};

export default NovoProduto;
