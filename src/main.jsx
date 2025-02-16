import "regenerator-runtime/runtime";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { ThemeProvider } from "./context/ThemeContext";
import 'core-js/stable';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
    <ThemeProvider>

      <App />
    </ThemeProvider>
    </StrictMode>
  </BrowserRouter>,
)
