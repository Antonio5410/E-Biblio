import React from "react";

function AdminDashboard({ onLogout, onChangePage }) {
  return (
    <div className="text-center">
      <h1 className="mb-4">Panou Admin</h1>
      <div className="d-flex flex-wrap justify-content-center">
        <button
          className="btn btn-success me-2 mb-2"
          onClick={() => onChangePage("adaugaCarte")}
        >
          Adaugă o carte
        </button>
        <button
          className="btn btn-primary me-2 mb-2"
          onClick={() => onChangePage("editeazaCarte")}
        >
          Editează o carte
        </button>
        <button
          className="btn btn-warning me-2 mb-2"
          onClick={() => onChangePage("suplimenteazaStoc")}
        >
          Suplimentează stoc
        </button>
        <button
          className="btn btn-danger me-2 mb-2"
          onClick={() => onChangePage("stergeCarte")}
        >
          Șterge o carte
        </button>
      </div>
      <button className="btn btn-dark mt-4" onClick={onLogout}>
        Deconectare
      </button>
    </div>
  );
}

export default AdminDashboard;
