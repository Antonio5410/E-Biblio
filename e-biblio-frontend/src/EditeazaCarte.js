import React, { useState } from "react";

function EditeazaCarte({ onBack }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const [titlu, setTitlu] = useState("");
  const [autor, setAutor] = useState("");
  const [descriere, setDescriere] = useState("");
  const [stoc, setStoc] = useState(1);
  const [gen, setGen] = useState("");

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

  const handleSelectBook = (book) => {
    setSelectedBook(book);
    setTitlu(book.titlu);
    setAutor(book.autor);
    setDescriere(book.descriere);
    setGen(book.gen);
  };
  

  const handleEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/carti/edit/${selectedBook.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            titlu: titlu,
            autor: autor,
            gen: gen,
            descriere: descriere,
          }),
        }
      );

      const message = await response.text();

      if (response.ok) {
        alert(message); // Carte editată cu succes
      } else {
        alert(`Eroare: ${message}`);
      }
    } catch (error) {
      console.error("Eroare la editarea cărții:", error);
      alert("A apărut o eroare la editarea cărții.");
    }
  };

  return (
    <div className="container text-center mt-5">
      <h1>Editează o Carte</h1>
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
          <li
            key={book.id}
            className="list-group-item"
            onClick={() => handleSelectBook(book)}
            style={{ cursor: "pointer" }}
          >
            {book.titlu} - {book.autor}
          </li>
        ))}
      </ul>

      {selectedBook && (
        <div className="mt-4">
          <h4>Editare Carte</h4>
          <input
            type="text"
            className="form-control mb-2"
            value={titlu}
            onChange={(e) => setTitlu(e.target.value)}
            placeholder="Titlu"
          />
          <input
            type="text"
            className="form-control mb-2"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            placeholder="Autor"
          />
          <textarea
            className="form-control mb-2"
            value={descriere}
            onChange={(e) => setDescriere(e.target.value)}
            placeholder="Descriere"
          />
          <input
            type="text"
            className="form-control mb-2"
            value={gen}
            onChange={(e) => setGen(e.target.value)}
            placeholder="Gen"
          />
          <button className="btn btn-success me-2" onClick={handleEdit}>
            Salvează
          </button>
          <button className="btn btn-secondary" onClick={onBack}>
            Înapoi
          </button>
        </div>
      )}
    </div>
  );
}

export default EditeazaCarte;
