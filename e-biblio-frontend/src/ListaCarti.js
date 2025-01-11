import React, { useEffect, useState } from 'react';

function ListaCarti({ onBack }) {
  const [carti, setCarti] = useState([]);

  useEffect(() => {
    const fetchCarti = async () => {
      try {
        const response = await fetch('/api/carti/toate');
        const data = await response.json();
        setCarti(data);
      } catch (error) {
        console.error('Eroare la încărcarea cărților:', error);
      }
    };

    fetchCarti();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Lista de Cărți</h2>
      <ul className="list-group">
        {carti.map((carte) => (
          <li key={carte.id} className="list-group-item">
            <strong>{carte.titlu}</strong> - {carte.autor}
          </li>
        ))}
      </ul>
      <button className="btn btn-secondary mt-3" onClick={onBack}>
        Înapoi
      </button>
    </div>
  );
}

export default ListaCarti;
