import React, { useState } from "react";

function SuplimenteazaStoc({ onBack }) {
  const [searchTerm, setSearchTerm] = useState(""); // Termenul de căutare
  const [books, setBooks] = useState([]); // Lista de cărți
  const [selectedBook, setSelectedBook] = useState(null); // Cartea selectată
  const [numarCarti, setNumarCarti] = useState(""); // Numărul de exemplare pentru suplimentare

  // Căutarea cărților după titlu
  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/carti/cautare?titlu=${searchTerm}`);
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      } else {
        alert("Nu s-au găsit cărți pentru termenul căutat.");
        setBooks([]);
      }
    } catch (error) {
      console.error("Eroare la căutarea cărților:", error);
      alert("A apărut o eroare la căutarea cărților.");
    }
  };

  // Suplimentează stocul cărții selectate
  const handleSuplimenteazaStoc = async () => {
    if (!selectedBook) {
      alert("Te rog selectează o carte înainte de a suplimenta stocul.");
      return;
    }

    if (!numarCarti || parseInt(numarCarti) <= 0) {
      alert("Introdu un număr valid de exemplare.");
      return;
    }

    try {
      const response = await fetch(
        `/api/carti/suplimenteaza-stoc/${selectedBook.id}?numarCarti=${numarCarti}`,
        { method: "PUT" }
      );

      if (response.ok) {
        alert("Stocul a fost suplimentat cu succes!");
        setBooks([]); // Resetează lista de cărți
        setSelectedBook(null); // Resetează cartea selectată
        setNumarCarti(""); // Resetează numărul de exemplare
      } else {
        const message = await response.text();
        alert(`Eroare: ${message}`);
      }
    } catch (error) {
      console.error("Eroare la suplimentarea stocului:", error);
      alert("A apărut o eroare la suplimentarea stocului.");
    }
  };

  return (
    <div className="text-center">
      <h1 className="mb-4">Suplimentează Stoc</h1>

      {/* Căutare carte */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Introdu titlul cărții"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={handleSearch}>
          Caută
        </button>
      </div>

      {/* Rezultatele căutării */}
      {books.length > 0 && (
        <div>
          <h5>Cărți disponibile:</h5>
          <ul className="list-group">
            {books.map((book) => (
              <li
                key={book.id}
                className={`list-group-item ${selectedBook?.id === book.id ? "active" : ""}`}
                onClick={() => setSelectedBook(book)}
                style={{ cursor: "pointer" }}
              >
                {book.titlu} - {book.autor}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Cartea selectată */}
      {selectedBook && (
        <div className="mt-3">
          <h5>Carte selectată:</h5>
          <p>
            <strong>{selectedBook.titlu}</strong>
          </p>
          <input
            type="number"
            className="form-control mb-3"
            placeholder="Număr de exemplare"
            value={numarCarti}
            onChange={(e) => setNumarCarti(e.target.value)}
          />
        </div>
      )}

      {/* Butoane de acțiune */}
      <div className="mt-4">
        <button className="btn btn-success me-2" onClick={handleSuplimenteazaStoc}>
          Suplimentează
        </button>
        <button className="btn btn-secondary" onClick={onBack}>
          Înapoi
        </button>
      </div>
    </div>
  );
}

export default SuplimenteazaStoc;
