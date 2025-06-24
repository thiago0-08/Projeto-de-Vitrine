import Navbar from "./components/NavBar/navbar";
import Home from "./Home";
import { ProdutosProvider } from './Api/api';
import Rodape from "./components/rodape/rodape";
import Produto from './components/produtos/Produto';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cards from './components/cards/cards';
const App = () => {
  return (
    <ProdutosProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<h1>About Page</h1>} />
          <Route path="/services" element={<h1>Services Page</h1>} />
          <Route path="/produto" element={<Produto />} />
          <Route path="/cards" element={<Cards />} /> 
        </Routes>
        <Rodape />
      </Router>
    </ProdutosProvider>
  );
};

export default App;