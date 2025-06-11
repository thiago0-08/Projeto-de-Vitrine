import React, { useState } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
              to="/contact"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
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