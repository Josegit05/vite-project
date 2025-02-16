import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import './ProfilePage.css'; // Importa el archivo CSS correspondiente


export const ProfilePage = () => {
  const { loginData } = useContext(LoginContext);

  return (
    <div className="profile-page">
      <h2>Inciar sesión</h2>
      <p><strong>Nombre de Usuario:</strong> {loginData.username}</p>
      <p><strong>Correo Electrónico:</strong> {loginData.email}</p>
      <p><strong>Contraseña:</strong> {loginData.password}</p>
    </div>
  );
};
