import  { useState, useEffect } from 'react';
import './Api.css'; // Importar el archivo CSS

export function Frase() {
    const [datos, setData] = useState([]); // Datos completos del array
    const [currentIndex, setCurrentIndex] = useState(0); // Índice del elemento actual

    // Función para obtener los datos de la API
    const fetchDatos = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    // Función para avanzar al siguiente elemento del array
    const nextPost = () => {
        if (currentIndex < datos.length + 1) {
            setCurrentIndex(currentIndex + 1); // Aumenta el índice en uno
        } else {
            alert('Has llegado al final de las frases.');
        }
    };

     // Función para retrodceder al anterior elemento del array
     const BeforePost = () => {
        if (currentIndex >0 ) {
            setCurrentIndex(currentIndex - 1); // Reduce el índice menos uno
        } else {
            alert('Has llegado al principio de las frases.');
        }
    };

    useEffect(() => {
        fetchDatos();
    }, []);

    return (
        <div className="container">
            <h1>Visualizar Posts</h1>

            <div className="post-display">
                {datos.length > 0 ? (
                    <div key={datos[currentIndex].id} className="card">
                        <h3>Frase: {datos[currentIndex].id}</h3>
                        <h3>Título: {datos[currentIndex].title}</h3>
                        <p>Frase: {datos[currentIndex].body}</p>
                    </div>
                ) : (
                    <p>Cargando posts...</p>
                )}
            </div>

            <div className="button-container">
                <button onClick={BeforePost}>Anterior Frase</button>
                <button onClick={nextPost}>Siguiente Frase</button>
            </div>
        </div>
    );
}



