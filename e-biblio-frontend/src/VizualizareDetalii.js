import React, { useState } from 'react';

function VizualizareDetalii({ onBack }) {
  const [titlu, setTitlu] = useState('');
  const [detaliiCarte, setDetaliiCarte] = useState(null);
  const [mesaj, setMesaj] = useState('');

  const handleCauta = async () => {
    try {
      const response = await fetch(`/api/carti/cautare?titlu=${titlu}`);
      const data = await response.json();

      if (data.length > 0) {
        setDetaliiCarte(data[0]); // Se afișează detaliile primei cărți găsite
        setMesaj('');
      } else {
        setDetaliiCarte(null);
        setMesaj('Nicio carte nu a fost găsită cu acest titlu.');
      }
    } catch (error) {
      console.error('Eroare la căutare:', error);
      setMesaj('A apărut o eroare. Vă rugăm să încercați din nou.');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Vizualizare Detalii Carte</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Introdu titlul cărții"
          value={titlu}
          onChange={(e) => setTitlu(e.target.value)}
        />
      </div>
      <div className="d-flex justify-content-start gap-3">
        <button className="btn btn-primary" onClick={handleCauta}>
          Caută
        </button>
        <button className="btn btn-secondary" onClick={onBack}>
          Înapoi
        </button>
      </div>
      {mesaj && <p className="text-danger mt-3">{mesaj}</p>}
      {detaliiCarte && (
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">{detaliiCarte.titlu}</h5>
            <p className="card-text">
              <strong>Autor:</strong> {detaliiCarte.autor}
            </p>
            <p className="card-text">
              <strong>Descriere:</strong> {detaliiCarte.descriere}
            </p>
            <p className="card-text">
              <strong>Stoc:</strong> {detaliiCarte.stoc}
            </p>
            <p className="card-text">
              <strong>Gen:</strong> {detaliiCarte.gen}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default VizualizareDetalii;
