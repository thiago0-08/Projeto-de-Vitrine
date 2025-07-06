import './css/login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const endPoints = {
  postLogin: "https://localhost:7066/admin/login",
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(endPoints.postLogin, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.token);
        navigate("/lancamentos");
      } else {
        alert("Login inválido: " + data.mensagem);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert("Erro na requisição");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Nome</label>
            <input
              type="text" id="email" name="email"
              value={email} onChange={e => setEmail(e.target.value)} required />
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
