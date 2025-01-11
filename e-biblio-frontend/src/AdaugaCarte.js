import React, { useState } from "react";

function AdaugaCarte({ onBack }) {
  const [titlu, setTitlu] = useState("");
  const [autor, setAutor] = useState("");
  const [descriere, setDescriere] = useState("");
  const [stoc, setStoc] = useState(1);
  const [gen, setGen] = useState("");

  const handleAdauga = async () => {
    try {
      // Verifică dacă cartea există deja
      const response = await fetch(`/api/carti/cautare?titlu=${titlu}`);
      const carti = await response.json();
  
      if (carti.length > 0) {
        alert("Cartea cu acest titlu există deja! Folosește butonul Suplimentează Stoc.");
        return;
      }
  
      // Adaugă cartea dacă nu există
      const adaugaResponse = await fetch("/api/carti/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titlu,
          autor,
          gen,
          stoc: parseInt(stoc),
          stocTotal: parseInt(stoc),
          disponibil: parseInt(stoc) > 0,
        }),
      });
  
      if (adaugaResponse.ok) {
        alert("Cartea a fost adăugată cu succes!");
      } else {
        const message = await adaugaResponse.text();
        alert(`Eroare: ${message}`);
      }
    } catch (error) {
      console.error("Eroare:", error);
      alert("A apărut o eroare la adăugarea cărții.");
    }
  };
  

  return (
    <div className="container text-center mt-5">
      <h1>Adaugă o Carte</h1>
      <div className="form-group mt-4">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Titlu"
          value={titlu}
          onChange={(e) => setTitlu(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Autor"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Descriere"
          value={descriere}
          onChange={(e) => setDescriere(e.target.value)}
        />
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Stoc"
          value={stoc}
          onChange={(e) => setStoc(e.target.value)}
          min="1"
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Gen"
          value={gen}
          onChange={(e) => setGen(e.target.value)}
        />
        <button className="btn btn-success me-2" onClick={handleAdauga}>
          Adaugă
        </button>
        <button className="btn btn-secondary" onClick={onBack}>
          Înapoi
        </button>
      </div>
    </div>
  );
}

export default AdaugaCarte;
