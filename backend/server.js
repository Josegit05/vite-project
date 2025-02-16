import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Inicializa la API de Google Generative AI
const genAI = new GoogleGenerativeAI('AIzaSyAFphSOndFe9EPLkPPZjdw3-rZby56BhXY'); // Reemplaza con tu clave de API real
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // O el modelo que prefieras

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const juegos = {
  "the-last-of-us": {
    titulo: "The Last of Us",
    genero: "Acción",
    plataforma: "PlayStation",
    sinopsis: "En un mundo postapocalíptico...",
    mecanicas: "Combate cuerpo a cuerpo, sigilo...",
    // ... más información
  },
  "the-witcher-3": {
    titulo: "The Witcher 3",
    genero: "Rol",
    plataforma: "PC",
    sinopsis: "Geralt de Rivia...",
    mecanicas: "Combate con espada, magia...",
    // ... más información
  },
  "grand-theft-auto-v": {
    titulo: "Grand Theft Auto V",
    genero: "Acción",
    plataforma: "PlayStation, Xbox, PC",
    sinopsis: "Un mundo abierto lleno de posibilidades...",
    mecanicas: "Conducción, disparos, misiones...",
    // ... más información
  },
  "minecraft": {
    titulo: "Minecraft",
    genero: "Sandbox",
    plataforma: "Multiplataforma",
    sinopsis: "Construye, explora, sobrevive...",
    mecanicas: "Construcción, crafting, combate...",
    // ... más información
  },
  "red-dead-redemption-2": {
    titulo: "Red Dead Redemption 2",
    genero: "Acción",
    plataforma: "PlayStation, Xbox",
    sinopsis: "Un western épico...",
    mecanicas: "Disparos, exploración, misiones...",
    // ... más información
  },
};

app.post('/api/chat', async (req, res) => {
  try {
    console.log("Cuerpo de la solicitud (req.body):", req.body);

    if (!req.body || !req.body.message) {
      console.error("Error: req.body o req.body.message no están definidos.");
      return res.status(400).json({ error: "El mensaje es requerido." });
    }

    const { message } = req.body;

    if (typeof message !== 'string') {
      console.error("Error: El mensaje no es una cadena.");
      return res.status(400).json({ error: "El mensaje debe ser una cadena." });
    }

    if (message.toLowerCase().includes("hola")) {
      return res.json({ reply: "¡Hola! Soy una IA diseñada para buscar juegos, ¿en qué puedo ayudarte?" });
    }

    // *** AQUÍ ESTÁ LA LÍNEA AÑADIDA ***
    let juegoEncontrado = null;
    for (const juego of Object.values(juegos)) { // Itera sobre los juegos
      if (juego && juego.titulo && message.toLowerCase().includes(juego.titulo.toLowerCase())) {
        juegoEncontrado = juego;
        break; // Importante: Detener la búsqueda después de encontrar el primer juego
      }
    }

    if (juegoEncontrado == null) {
      console.log("No he encontrado juegos");
      return res.json({
        reply: "Lo siento, no estoy capacitado para responder eso.",
      });
    } else {
      console.log("Encontré el juego");
    }

    const contexto = {
      juego: juegoEncontrado,
      historial: [],
    };

    const solicitud = {
      message: message,
      context: contexto,
      instruccion: "Responde al usuario únicamente sobre la información contenida en context.juego, sin incluir más información, de forma redactada",
    };

    console.log("Solicitud a Gemini:", solicitud); // *** DEPURACIÓN: Imprime la solicitud a Gemini ***

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: JSON.stringify(solicitud) }] }],
   });

    console.log("Respuesta de Gemini:", result); // *** DEPURACIÓN: Imprime la respuesta de Gemini ***

    if (result && result.response && result.response.candidates && result.response.candidates[0] && result.response.candidates[0].content && result.response.candidates[0].content.parts && result.response.candidates[0].content.parts[0].text) {
      const responseText = result.response.text();
      res.json({ reply: responseText });
    } else {
      console.error("Error: Respuesta inesperada de Gemini:", result);
      res.status(500).json({ error: "Error al procesar la respuesta del modelo." });
    }

  } catch (error) {
    console.error("Error en app.post('/'):", error);
    res.status(500).json({
      error: 'Lo siento, no estoy capacitado para responder eso', // Mensaje de error genérico
    });
  }
});

app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});