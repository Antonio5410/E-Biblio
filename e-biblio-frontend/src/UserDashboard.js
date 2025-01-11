import React from 'react';

function UserDashboard({ onLogout, onChangePage }) {
  return (
    <div className="text-center">
      <h1 className="mb-4">Panou Utilizator</h1>
      <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
        <button
          className="btn btn-primary"
          onClick={() => onChangePage("listaCarti")}
        >
          Vizualizează lista de cărți
        </button>
        <button
          className="btn btn-info"
          onClick={() => onChangePage("cautareAvansata")}
        >
          Căutare avansată
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => onChangePage("vizualizareDetalii")}
        >
          Vizualizează detalii
        </button>
        <button
          className="btn btn-success"
          onClick={() => onChangePage("imprumutaCarte")}
        >
          Împrumută o carte
        </button>
        <button
          className="btn btn-warning" onClick={() => onChangePage("rezervaCarte")} >
          Rezervă o carte
        </button>
        <button className="btn btn-danger" onClick={() => onChangePage("returneazaCarte")} >
          Returnează o carte
        </button>
      </div>

      <button className="btn btn-dark mt-4" onClick={onLogout}>
        Deconectare
      </button>
    </div>
  );
}

export default UserDashboard;
