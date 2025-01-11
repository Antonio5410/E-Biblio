import React from "react";

function ReturneazaCarte({ userId, onBack }) {
    const handleReturnare = async () => {
        console.log("Butonul de returnare a fost apăsat!"); // Debugging - verifică dacă funcția este apelată
        console.log("User ID transmis:", userId); // Debugging - verifică dacă userId este corect
              
        try {
          const response = await fetch(`http://localhost:8080/api/imprumuturi/returneaza/${userId}`, {
            method: "PUT",
          });
      
          const message = await response.text();
          console.log("Răspuns de la backend:", response, message); // Debugging - verifică răspunsul de la backend
      
          if (response.ok) {
            alert(message); // Returnarea a avut succes
            console.log("Returnarea cărții a avut succes."); // Debugging
          } else {
            alert(`Eroare: ${message}`); // Mesaj de eroare din backend
            console.error("Eroare de la backend:", message); // Debugging - eroare de la backend
          }
        } catch (error) {
          console.error("Eroare la returnarea cărții:", error); // Debugging - eroare în frontend
          alert("A apărut o eroare la returnarea cărții.");
        }
      };
      
      return (
        <div className="text-center">
          <h1 className="mb-4">Returnează o Carte</h1>
          <button className="btn btn-danger me-2" onClick={handleReturnare}>
            Returnează
          </button>
          <button className="btn btn-secondary" onClick={onBack}>
            Înapoi
          </button>
        </div>
      );
      
}

export default ReturneazaCarte;
