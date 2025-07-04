import React, { useState, useContext } from "react";
import '../../css/navbar.css';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FcSearch } from "react-icons/fc";
import { VscAccount } from "react-icons/vsc";
import { TiThMenu } from "react-icons/ti";
import Dropdown from "./dropdown";
import { Api } from "../../services/api";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { fetchProdutos } = useContext(Api);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      // Se a barra  estiver vazia, vokta para a página inicial
      navigate("/");
      fetchProdutos(1, 12, "");   // faz a busca sem os filtro 
      setMenuOpen(false);
      return;
    }
    // Se estiver na página de produtos apenas atualiza a busca
    if (window.location.pathname === "/cards") {
      fetchProdutos(1, 12, searchTerm.trim());
    } else {
      //  navega para a página de produtos com o resultado da busca
      navigate("/cards");

      setTimeout(() => {
        fetchProdutos(1, 12, searchTerm.trim());
      }, 1000);
    }

    setMenuOpen(false);
  };


  const { categoria } = useContext(Api);
  const categoriaData = categoria || [];



  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <span className="logo-text">T10 Premium</span>
        </Link>

        {/* PESQUISA DESKTOP */}
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Pesquisar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
            <i className="search-icon"><FcSearch /></i>
          </button>
        </form>

        {/* HAMBURGER */}
        <div className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <TiThMenu />
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>




        {/* MENU MOBILE/DESKTOP */}
        <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
          

          {/* LINKS DO MENU */}
          <li className="nav-item">
            <Dropdown
              options={categoriaData.map(c => ({ value: c.id || '', label: c.nome || 'categoria' }))}
              onSelect={(option) => {
                navigate(`/cards?categoria=${option.value}`);
                setMenuOpen(false);
              }}
            >
              Categoria
              <ul className="dropdown-menu">
                {categoriaData.map((c) => (
                  <li key={c.id} className="dropdown-item">
                    <NavLink
                      to={`/cards?categoria=${c.id}`}
                      className="nav-link"
                      onClick={() => setMenuOpen(false)}
                    >
                      {c.nome}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </Dropdown>
          </li>

          <li className="nav-item">
            <NavLink to="/Lancamentos" className="nav-link" onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/Login" className="nav-link" onClick={() => setMenuOpen(false)}>
              <VscAccount />
            </NavLink>
          </li>
        </ul>


        {/* <NavLink to="/Lancamentos" className="nav-link" onClick={() => setMenuOpen(false)}>
            <VscAccount />
          </NavLink>   */}

      </div>

    </nav>
  );
};

export default Navbar;