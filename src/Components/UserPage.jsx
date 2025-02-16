import { useContext, useState } from "react";
import { LoginContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
import './UserPage.css'; // Importa el archivo CSS correspondiente

export const UserPage = () => {
  const { loginData, updateLoginData } = useContext(LoginContext);
  const [formData, setFormData] = useState(loginData);
  const navigate = useNavigate(); // Hook para redirigir

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Enviar datos y redirigir a la página de perfil
  const handleSubmit = (e) => {
    e.preventDefault();
    updateLoginData(formData); // Actualiza el contexto
    navigate("/profile"); // Redirige a la página de perfil
  };

  return (
    <div className="user-page">
      <form onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        <div className="form-group">
          <label htmlFor="username">Nombre de Usuario:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <br/>
        <button id="buttonUser" className="btn btn-primary" type="submit">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};



