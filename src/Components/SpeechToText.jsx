import { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

export const SpeechToText = () => {
  const [inputText, setInputText] = useState("");
  const [submittedText, setSubmittedText] = useState("");

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <p>Tu navegador no soporta reconocimiento de voz.</p>;
  }

  // Sincronizar el transcript con el input
  useEffect(() => {
    setInputText(transcript);
  }, [transcript]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmittedText(inputText);
    resetTranscript();
    setInputText("");
  };

  return (
    <div className="speech-to-text-container">
      <h2>Transcriptor de Voz</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Escribe algo o usa el micrófono"
          className="speech-input"
        />
        <button type="submit" className="submit-button">
          Enviar
        </button>
      </form>
      <div className="speech-controls">
        <button onClick={SpeechRecognition.startListening} className="control-button">
          🎤 Escuchar
        </button>
        <button onClick={SpeechRecognition.stopListening} className="control-button">
          🛑 Detener
        </button>
        
        <button onClick={resetTranscript} className="control-button">
          🔄 Reiniciar
        </button>
      </div>
      <div className="status">
        <p>Micrófono: {listening ? "Encendido" : "Apagado"}</p>
      </div>
      <div className="output">
        <h3>Texto Enviado:</h3>
        <p>{submittedText}</p>
      </div>
    </div>
  );
};