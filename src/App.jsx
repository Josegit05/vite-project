import  { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { Frase } from './Components/Api'; 
import { NavBar } from './Components/NavBar';
import { Inicio } from './Components/Inicio';
import { LoginProvider } from './context/LoginProvider';
import { UserPage } from './Components/UserPage';
import { ProfilePage } from './Components/ProfilePage';
import { ThemeProvider } from './context/ThemeContext';
import  { ResponsiveComponents } from './Components/ResponsiveComponents';
import { TaskManager } from './Components/TaskManager';
import { SearchBar } from "./Components/SearchBar";
import {ChatbotComponent} from "./Components/Chatbox/ChatbotComponent";
import {Informes} from "./Components/Informes";

function App() {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <div>
      
      <div className="header-container">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossOrigin="anonymous"></link>
        <h1>Proyecto Dad</h1>
        <NavBar />
        
      </div>
      <button
        className="chatbot-toggle"
        onClick={() => setShowChatbot(!showChatbot)}
      >
        {showChatbot ? "Cerrar Ayudante" : "Te ayudamos"}
      </button>
      <ChatbotComponent show={showChatbot} />
      <ThemeProvider>
          <LoginProvider>
            <Routes>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/" element={<Inicio />} />
              <Route path="/API" element={<Frase />} />
              <Route path="/search" element={<SearchBar />} />
              <Route path="/user" element={<UserPage />} />
              <Route path="/responsive" element={<ResponsiveComponents />} />
              <Route path="/taskManager" element={<TaskManager />} />
              <Route path="/informes" element={<Informes/>} />
            </Routes>
          </LoginProvider>
      </ThemeProvider>
      
    </div>
  );
}

export default App;

