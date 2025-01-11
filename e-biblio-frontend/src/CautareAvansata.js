import React, { useState } from 'react';

function CautareAvansata({ onBack }) {
  const [titlu, setTitlu] = useState('');
  const [carti, setCarti] = useState([]);
  const [mesaj, setMesaj] = useState('');

  const handleCauta = async () => {
    try {
      const response = await fetch(`/api/carti/cautare?titlu=${titlu}`);
      const data = await response.json();

      if (data.length > 0) {
        setCarti(data);
        setMesaj('');
      } else {
        setCarti([]);
        setMesaj('Nicio carte nu a fost găsită cu acest titlu.');
      }
    } catch (error) {
      console.error('Eroare la căutare:', error);
      setMesaj('A apărut o eroare. Vă rugăm să încercați din nou.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Căutare Avansată</h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Introdu titlul cărții"
        value={titlu}
        onChange={(e) => setTitlu(e.target.value)}
      />
      <button className="btn btn-primary mb-3" onClick={handleCauta}>
        Caută
      </button>
      {mesaj && <p className="text-danger">{mesaj}</p>}
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

export default CautareAvansata;
