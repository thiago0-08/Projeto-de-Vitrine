import './css/login.css';
import CryptoJS from 'crypto-js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const endPoints = {
  postLogin: "http://localhost:3000/seu-endpoint-de-login", // substitua pelo seu endpoint real
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const hashPassword = (senha) => {
    return CryptoJS.MD5(senha).toString();
  };

  const hashBasic64 = (data) => {
    return btoa(data);
  };

  const cadastroUsuario = async (e) => {
    e.preventDefault();

    const hashedPassword = hashPassword(senha);
    const basicAuth = 'basic ' + hashBasic64(`${email}:${hashedPassword}`);

    try {
      const response = await fetch(endPoints.postLogin, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': basicAuth
        },
        body: JSON.stringify({ username: email, password: hashedPassword })
      });

      const data = await response.json();

      if (data.status) {
        localStorage.setItem('dados', JSON.stringify(data.dados));
        navigate('/'); // redireciona para home
      } else {
        alert('Login falhou');
        navigate('/login');
        console.error('Login falhou:', data.message);
      }

    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login</h1>
        <form onSubmit={cadastroUsuario}>
          <div className="form-group">
            <label htmlFor="email">Nome</label>
            <input
              type="text" id="email" name="email"
              value={email} onChange={e => setEmail(e.target.value)} required/>
          </div>
          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password" id="senha" name="senha"
              value={senha} onChange={e => setSenha(e.target.value)} required />
          </div>
          <button type="submit" className="login-button">Login</button>
          <div className="form-footer">
            <a href="/forgot-password">Esqueceu a Senha?</a>
            <a href="/register">Registre-se</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
