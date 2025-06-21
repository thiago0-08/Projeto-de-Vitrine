import React, { useState } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import Rodape from "../rodape/rodape";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

 const scrollToFooter = () => {
  if (window.location.pathname === "/") {
    const footer = document.getElementById("rodape");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  }else {
    Navigate("/");
    setTimeout(() => {
      const footer = document.getElementById("rodape");
      if (footer) {
        footer.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
 }
 setMenuOpen(false);
};


  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <span className="logo-text">T10 Premium</span>
        </Link>

        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <li className="nav-item">
            <NavLink
              to="/about"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Sobre Nós
            </NavLink>
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

      {/* <div className="row">Add commentMore actions
            <label>Pesquisa:</label>
            <input name="pesquisa" type="text" />
            <input name="pesquisa"
                type="search"
                value={search}
                onChange={(e) => 
                    setSearch(e.target.value)
                }
            />
      </div>

      
       return fetch(`${URL_API}/api/aluno?pesquisa=${busca || ""}`, {Add commentMore actions
        method: "GET"
    }).then(async resultado => {
        if (resultado.status === 200) {
            const data = await resultado.json();
            return {
                status: resultado.status,
                data: data
            }
        }Add commentMore actions
        return {
            status: resultado.status,
            data: null
        }
    })
}
      
      
      
      */}
    </nav>
  );
};

export default Navbar;




// export function listarAlunos(busca) {
//     return fetch(`${URL_API}/api/aluno?pesquisa=${busca || ""}`, {
//         method: "GET"
//     }).then(async resultado => {
//         if (resultado.status === 200) {
//             const data = await resultado.json();
//             return {
//                 status: resultado.status,
//                 data: data
//             }
//         }
//         return {
//             status: resultado.status,
//             data: null
//         }
//     })
// }