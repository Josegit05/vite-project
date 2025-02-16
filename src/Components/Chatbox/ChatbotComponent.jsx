import { useState, useEffect, useRef } from "react";
import "./ChatbotComponent.css";

export function ChatbotComponent({ show }) {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    setMessages((prev) => [...prev, { text: userInput, sender: "user" }]);
    setUserInput("");

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: response.statusText }));
        throw new Error(errorData.error || "Error en la respuesta del servidor");
      }

      const data = await response.json();

      console.log("Respuesta del servidor (data):", data); // *** PUNTO DE DEPURACIÓN CRUCIAL ***

      if (data.reply &&  typeof data.reply === 'string') {
        setMessages((prev) => [...prev, { text: data.reply, sender: "bot" }]);
      } else if (typeof data.reply === 'object' && data.reply !== null) {
        if (data.reply.error) {
          setMessages((prev) => [...prev, { text: data.reply.error, sender: "bot" }]);
        } else {
          setMessages((prev) => [...prev, { text: JSON.stringify(data.reply), sender: "bot" }]);
        }
      } else {
        setMessages((prev) => [...prev, { text: "Respuesta inesperada del servidor: " + JSON.stringify(data), sender: "bot" }]);
      }

    } catch (error) {
      console.error("Error al procesar el mensaje:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Lo siento, no estoy capacitado para responder eso" , sender: "bot" },
      ]);
    }
  };

  if (!show) return null;

  return (
    <div className="chatbox">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-container">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Escribe tu mensaje..."
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  );
}