// src/Components/NavBar.jsx
import  { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { Switch } from "@mui/material";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export function NavBar() {
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        isDarkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
      }`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Inicio</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/API">API</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/user">Inciar sesión</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/search">Barra de búsqueda</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/responsive">Componentes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/taskManager">Gestor de tareas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/informes">Informes</Link>
            </li>

          </ul>
        </div>
        <div className="d-flex align-items-center">
          <span className="me-2">Modo oscuro</span>
          <Switch checked={isDarkMode} onChange={toggleTheme} />
        </div>
      </div>
    </nav>
  );
}


