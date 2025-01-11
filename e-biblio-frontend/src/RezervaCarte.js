import React, { useState } from "react";

function RezervaCarte({ userId, onBack }) {
  const [searchTerm, setSearchTerm] = useState(""); // Termenul de căutare
  const [books, setBooks] = useState([]); // Lista cărților disponibile
  const [selectedBook, setSelectedBook] = useState(null); // Cartea selectată

  // Funcție pentru căutarea cărților
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
    }
  };

  // Funcție pentru rezervarea unei cărți
  const handleRezerva = async () => {
    if (!selectedBook) {
      alert("Te rog selectează o carte înainte de a rezerva.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/rezervari/creeaza/${userId}/${selectedBook.id}`,
        { method: "POST" }
      );

      const message = await response.text();

      if (response.ok) {
        alert(message); // Rezervare creată cu succes
      } else {
        alert(`Eroare: ${message}`); // Mesaj de eroare de la backend
      }
    } catch (error) {
      console.error("Eroare la rezervare:", error);
      alert("A apărut o eroare la rezervare.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Rezervă o Carte</h1>

      {/* Căutare */}
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
      <div>
        <h5>Cărți disponibile:</h5>
        <ul className="list-group">
          {books.map((book) => (
            <li
              key={book.id}
              className={`list-group-item ${
                selectedBook?.id === book.id ? "active" : ""
              }`}
              onClick={() => setSelectedBook(book)}
              style={{ cursor: "pointer" }}
            >
              {book.titlu} - {book.autor}
            </li>
          ))}
        </ul>
      </div>

      {/* Carte selectată */}
      {selectedBook && (
        <div className="mt-3">
          <h5>Carte selectată:</h5>
          <p>
            <strong>{selectedBook.titlu}</strong>
          </p>
        </div>
      )}

      {/* Butoane */}
      <div className="mt-4">
        <button className="btn btn-success me-2" onClick={handleRezerva}>
          Rezervă
        </button>
        <button className="btn btn-secondary" onClick={onBack}>
          Înapoi
        </button>
      </div>
    </div>
  );
}

export default RezervaCarte;
