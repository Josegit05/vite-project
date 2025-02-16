import  { useState } from "react";
import "./ResponsiveComponents.css";
import { SpeechToText }from "./SpeechToText";

export const ResponsiveComponents = () => {
  const [showComponent1, setShowComponent1] = useState(false);
  const [showComponent2, setShowComponent2] = useState(false);
  const [showComponent3, setShowComponent3] = useState(false);
  const [showSpeechToText, setShowSpeechToText] = useState(false);

  return (
    <div className="responsive-container">
      <h1 className="title">Componentes Responsivos Interactivos</h1>
      <div className="buttons-container">
        <button
          className="toggle-button"
          onClick={() => setShowComponent1(!showComponent1)}
        >
          {showComponent1 ? "Ocultar Componente 1" : "Mostrar Componente 1"}
        </button>
        <button
          className="toggle-button"
          onClick={() => setShowComponent2(!showComponent2)}
        >
          {showComponent2 ? "Ocultar Componente 2" : "Mostrar Componente 2"}
        </button>
        <button
          className="toggle-button"
          onClick={() => setShowComponent3(!showComponent3)}
        >
          {showComponent3 ? "Ocultar Componente 3" : "Mostrar Componente 3"}
        </button>
      </div>

      <div className="components-display">
        {showComponent1 && (
          <div className="component-card">
            <h2>Componente 1</h2>
            <p>Hola, me llamo José María.</p>
          </div>
        )}
        {showComponent2 && (
          <div className="component-card">
            <h2>Componente 2</h2>
            <p>Me gusta los vieojuegos.</p>
          </div>
        )}
        {showComponent3 && (
          <div className="component-card">
            <h2>Componente 3</h2>
            <p>Y es un placer.</p>
          </div>
        )}
      </div>
      <button
          className="toggle-button"
          onClick={() => setShowSpeechToText(!showSpeechToText)}
        >
          {showSpeechToText ? "Ocultar Transcriptor" : "Mostrar Transcriptor"}
      </button>

        {showSpeechToText && (
          <div className="component-card">
            <SpeechToText />
          </div>
        )}
    </div>
    
  );
};