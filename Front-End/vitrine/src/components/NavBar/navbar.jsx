import React, { useState, useContext } from "react";
import "./css/Navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Dropdown from "./dropdown";
import { Api } from "../Api/api";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { fetchProdutos } = useContext(Api);
  

  const scrollToFooter = () => {
  setMenuOpen(false);
  
  if (window.location.pathname === "/") {
    const footer = document.getElementById("rodape");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  } else {
   
    navigate("/#contato");

    setTimeout(() => {
      const footer = document.getElementById("rodape");
      if (footer) {
        footer.scrollIntoView({ behavior: "smooth" });
      }
    }, 1000);
  }
};


  const handleSearch = (e) => {
  e.preventDefault();
  
  if (!searchTerm.trim()) {
    // Se o searchTerm estiver vazio, navega para a página inicial
     navigate("/");
    fetchProdutos(1, 12, ""); // <-- faz a busca sem filtro para resetar os produtos
    setMenuOpen(false);
    return;
  }
  // Se já estiver na página de produtos, apenas atualiza a busca
  if (window.location.pathname === "/cards") {
    fetchProdutos(1, 12, searchTerm.trim());
  } else {
    // Se não, navega para a página de produtos com o termo de busca
    navigate("/cards");
    
    setTimeout(() => {
      fetchProdutos(1, 12, searchTerm.trim());
    }, 1000);
  }
  
  setMenuOpen(false);
};


    const {categoria} = useContext(Api);
    const categoriaData = categoria || [];

  

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <span className="logo-text">T10 Premium</span>
        </Link>

        {/* Barra de pesquisa - visível em desktop */}
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Pesquisar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
            <i className="search-icon">🔍</i>
          </button>
        </form>

        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
          {/* Barra de pesquisa - visível em mobile quando menu aberto */}
          {menuOpen && (
            <li className="nav-item search-mobile">
              <form className="search-form" onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Pesquisar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">
                  <i className="search-icon">🔍</i>
                </button>
              </form>
            </li>
          )}

          <li className="nav-item">
            <Dropdown
             options={categoriaData.map(c => ({value: c.id || '', label: c.nome || 'categoria'}))} >
             Categoria
            </Dropdown>
          </li>
          
          <li className="nav-item">
            <NavLink
              to="/products"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Produtos
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              className="nav-link"
              onClick={scrollToFooter}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              Contato
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;