import  { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Papa from 'papaparse';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export const Informes = () => {
  const [champions, setChampions] = useState([]);
  const [difficulty, setDifficulty] = useState('');
  const [heroType, setHeroType] = useState('');
  const [filteredChampions, setFilteredChampions] = useState([]);

  // Cargar CSV desde la carpeta public
  useEffect(() => {
    fetch('/200125_LoL_champion_data.csv')
      .then(response => response.text())
      .then(data => {
        Papa.parse(data, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            console.log('CSV data loaded:', result.data);
            setChampions(result.data);
          },
        });
      })
      .catch((error) => {
        console.error('Error al cargar el CSV:', error);
      });
  }, []);

  // Función para filtrar campeones
  const handleFilter = () => {
    console.log('Aplicando filtros: dificultad =', difficulty, 'tipo =', heroType);
    const filtered = champions.filter(champion => {
      const champDifficulty = String(champion.difficulty || '').trim();
      const champHeroType = String(champion.herotype || '').trim();

      const difficultyMatch = difficulty === '' || champDifficulty === difficulty;
      const heroTypeMatch = heroType === '' || champHeroType.toLowerCase() === heroType.toLowerCase();
      
      return difficultyMatch && heroTypeMatch;
    });
    console.log('Campeones filtrados:', filtered);
    setFilteredChampions(filtered);
  };

  // Función para generar PDF usando los campeones filtrados
  const generatePDF = () => {
    if (filteredChampions.length === 0) {
      alert('No hay campeones que coincidan con los filtros seleccionados.');
      return;
    }

    const doc = new jsPDF();
    doc.text('Informe de campeones de League of Legends', 20, 10);
    doc.setFontSize(10);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, 20);

    const tableColumn = ['Nombre', 'Título', 'Dificultad', 'Tipo'];
    const tableRows = filteredChampions.map(champion => [
      champion.apiname,
      champion.title,
      champion.difficulty,
      champion.herotype,
    ]);

    // Generar tabla con autoTable
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      theme: 'striped',
    });

    doc.text('Este informe fue generado automáticamente.', 20, doc.internal.pageSize.height - 10);
    doc.save('informe_champions.pdf');
  };

  // Funciones para contar datos para los gráficos
  const countByRole = () => {
    const counts = {};
    champions.forEach(champion => {
      const role = champion.role ? champion.role.trim() : 'Desconocido';
      counts[role] = (counts[role] || 0) + 1;
    });
    return counts;
  };

  const countByPosition = () => {
    const counts = {};
    champions.forEach(champion => {
      const position = champion.client_positions ? champion.client_positions.trim() : 'Desconocido';
      counts[position] = (counts[position] || 0) + 1;
    });
    return counts;
  };

  const rolesCount = countByRole();
  const positionsCount = countByPosition();

  // Datos para gráfico de barras (por role)
  const barData = {
    labels: Object.keys(rolesCount),
    datasets: [
      {
        label: 'Cantidad de Personajes por Rol',
        data: Object.values(rolesCount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Datos para gráfico circular (por client_positions)
  const pieData = {
    labels: Object.keys(positionsCount),
    datasets: [
      {
        label: 'Cantidad de Personajes por Posición',
        data: Object.values(positionsCount),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Informes</h2>
      <div>
        <label>
          Dificultad:
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="">Todas</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </label>
        <br />
        <label>
          Tipo de Héroe:
          <select value={heroType} onChange={(e) => setHeroType(e.target.value)}>
            <option value="">Todos</option>
            <option value="Fighter">Fighter</option>
            <option value="Mage">Mage</option>
            <option value="Assassin">Assassin</option>
            <option value="Marksman">Marksman</option>
            <option value="Tank">Tank</option>
            <option value="Support">Support</option>
          </select>
        </label>
        <br />
        <button onClick={handleFilter}>Filtrar</button>
        <button onClick={generatePDF}>Imprimir</button>
      </div>

      {/* Gráficos debajo de lo anterior */}
      <div style={{ marginTop: '50px' }}>
        <h3>Gráficos de Campeones</h3>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h4>Cantidad de Personajes según Rol</h4>
          <Bar data={barData} />
        </div>
        <div style={{ maxWidth: '400px', margin: '50px auto 0' }}>
          <h4>Cantidad de Personajes según Client Positions</h4>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};



