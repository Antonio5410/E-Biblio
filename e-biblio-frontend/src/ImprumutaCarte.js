import React, { useState } from 'react';

function ImprumutaCarte({ userId, onBack }) {
  const [titlu, setTitlu] = useState('');
  const [carti, setCarti] = useState([]);
  const [carteSelectata, setCarteSelectata] = useState(null);
  const [durata, setDurata] = useState(14);
  const [mesaj, setMesaj] = useState('');

  const cautaCarti = async () => {
    try {
      const response = await fetch(`/api/carti/cautare?titlu=${titlu}`);
      if (response.ok) {
        const data = await response.json();
        setCarti(data);
        setMesaj('');
      } else {
        setCarti([]);
        setMesaj('Nu s-a găsit nicio carte cu acest titlu.');
      }
    } catch (error) {
      console.error('Eroare:', error);
      setMesaj('A apărut o eroare la căutarea cărților.');
    }
  };

  const imprumutaCarte = async () => {
    if (!carteSelectata) {
      setMesaj('Te rog să selectezi o carte.');
      return;
    }
  
    if (!userId) {
      setMesaj('Eroare: ID-ul utilizatorului nu este setat.');
      return;
    }
  
    try {
      const response = await fetch(
        `/api/imprumuturi/imprumuta?userId=${userId}&carteId=${carteSelectata.id}&durataImprumutului=${durata}`,
        { method: 'POST' }
      );
  
      if (response.ok) {
        const message = await response.text();
        setMesaj(message);
      } else {
        const errorMessage = await response.text();
        setMesaj(`Eroare: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Eroare:', error);
      setMesaj('A apărut o eroare la împrumut.');
    }
  };
  
  

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Împrumută o Carte</h2>

      {!carteSelectata ? (
        <>
          <div className="mb-3">
            <label className="form-label">Caută după titlu</label>
            <input
              type="text"
              className="form-control"
              placeholder="Introdu titlul cărții"
              value={titlu}
              onChange={(e) => setTitlu(e.target.value)}
            />
          </div>
          <div>
            <button className="btn btn-primary mb-3" onClick={cautaCarti}>
              Caută
            </button>
            <button className="btn btn-secondary mb-3" onClick={onBack}>
              Înapoi la Panou
            </button>
          </div>
          {carti.length > 0 && (
            <ul className="list-group">
              {carti.map((carte) => (
                <li
                  key={carte.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                  onClick={() => setCarteSelectata(carte)}
                  style={{ cursor: 'pointer' }}
                >
                  {carte.titlu} - {carte.autor}
                  <span className="badge bg-primary">Selectează</span>
                </li>
              ))}
            </ul>
          )}
          {mesaj && <p className="mt-3 text-danger">{mesaj}</p>}
        </>
      ) : (
        <>
          <div className="mb-3">
            <h5>Cartea selectată: {carteSelectata.titlu}</h5>
          </div>
          <div className="mb-3">
            <label className="form-label">Durata Împrumutului (zile)</label>
            <input
              type="number"
              className="form-control"
              value={durata}
              onChange={(e) => {
                const val = Math.max(1, Math.min(14, e.target.value)); // Min: 1, Max: 14
                setDurata(val);
              }}
              min="1"
              max="14"
            />
          </div>
          <div>
            <button className="btn btn-success mb-3" onClick={imprumutaCarte}>
              Împrumută
            </button>
            <button className="btn btn-secondary mb-3" onClick={() => setCarteSelectata(null)}>
              Înapoi la căutare
            </button>
          </div>
          {mesaj && <p className="mt-3 text-success">{mesaj}</p>}
        </>
      )}
    </div>
  );
}

export default ImprumutaCarte;
