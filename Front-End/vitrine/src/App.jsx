import '../src/css/App.css';
import Navbar from "./components/NavBar/Navbar";
import Home from "./Home";
import { ProdutosProvider } from './services/api';
import Rodape from "./components/Rodape";
import Produto from './pages/Produto';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Cards from "./pages/cards";
import Lancamentos from "./pages/Lancamentos";
import Login from "./Login";



const App = () => {
  return (
    <ProdutosProvider>
      <div className="app-wrapper">
        <Router>
          <Navbar />
          <main className="conteudo">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<h1>About Page</h1>} />
              <Route path="/services" element={<h1>Services Page</h1>} />
              <Route path="/produto" element={<Produto />} />
              <Route path="/cards" element={<Cards />} />
              <Route path="/lancamentos" element={<Lancamentos />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <Rodape />
        </Router>
      </div>
    </ProdutosProvider>
  );
};

export default App;
