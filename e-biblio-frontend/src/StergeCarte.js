import React, { useState } from "react";

function StergeCarte({ onBack }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/carti/cautare?titlu=${searchTerm}`);
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      } else {
        alert("Nu s-au găsit cărți.");
        setBooks([]);
      }
    } catch (error) {
      console.error("Eroare la căutare:", error);
    }
  };

  const handleDelete = async (bookId) => {
    try {
      const response = await fetch(`/api/carti/delete/${bookId}`, {
        method: "DELETE",
      });

      const message = await response.text();

      if (response.ok) {
        alert(message);
        setBooks(books.filter((book) => book.id !== bookId));
      } else {
        alert(`Eroare: ${message}`);
      }
    } catch (error) {
      console.error("Eroare la ștergere:", error);
    }
  };

  return (
    <div className="container text-center mt-5">
      <h1>Șterge o Carte</h1>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Caută titlul cărții"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="btn btn-primary mb-4" onClick={handleSearch}>
        Caută
      </button>

      <ul className="list-group">
        {books.map((book) => (
          <li key={book.id} className="list-group-item">
            {book.titlu} - {book.autor}
            <button
              className="btn btn-danger float-end"
              onClick={() => handleDelete(book.id)}
            >
              Șterge
            </button>
          </li>
        ))}
      </ul>
      <button className="btn btn-secondary mt-4" onClick={onBack}>
        Înapoi
      </button>
    </div>
  );
}

export default StergeCarte;
