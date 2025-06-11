import Navbar from "./components/NavBar/navbar";
import Home from "./Home";
import Rodape from "./components/rodape/rodape";
import Produto from './components/produtos/Produto';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<h1>About Page</h1>} />
        <Route path="/services" element={<h1>Services Page</h1>} />
        <Route path="/contact" element={<Rodape /> } />
        <Route path="/produto" element={<Produto />} />
      </Routes>

    </Router>
  );
}
export default App;