import React, { useState } from 'react';

import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import ListaCarti from './ListaCarti';
import CautareAvansata from './CautareAvansata';
import VizualizareDetalii from './VizualizareDetalii';
import ImprumutaCarte from './ImprumutaCarte';
import RezervaCarte from './RezervaCarte';
import AdaugaCarte from './AdaugaCarte';
import EditeazaCarte from './EditeazaCarte';
import StergeCarte from './StergeCarte';
import ReturneazaCarte from './ReturneazaCarte';
import SuplimenteazaStoc from './SuplimenteazaStoc';




function App() {
  const [loggedInUser, setLoggedInUser] = useState(null); // null, 'user', 'admin'
  const [currentPage, setCurrentPage] = useState('login'); // 'login', 'register', etc.
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch(`http://localhost:8080/api/auth/login?username=${username}&password=${password}`, {
        method: 'POST',
      });
  
      if (response.ok) {
        const message = await response.text(); // Așteaptă răspunsul text
        alert(message);
  
        // Extrage userId din mesaj
        const userIdMatch = message.match(/ID:\s*(\d+)/); // Caută în text "ID: <valoare>"
        const userId = userIdMatch ? parseInt(userIdMatch[1], 10) : null;
  
        if (!userId) {
          alert('Autentificare eșuată! ID-ul utilizatorului nu a fost găsit.');
          return;
        }
  
        // Setează utilizatorul și userId-ul
        if (message.includes('admin')) {
          setLoggedInUser('admin');
          setLoggedInUserId(userId); // Salvează userId
          setCurrentPage('adminDashboard'); // Setează pagina pentru admin
        } else if (message.includes('user')) {
          setLoggedInUser('user');
          setLoggedInUserId(userId); // Salvează userId
          setCurrentPage('userDashboard'); // Setează pagina pentru user
        }
      } else {
        alert('Autentificare eșuată! Verifică datele.');
      }
    } catch (error) {
      console.error('Eroare la autentificare:', error);
      alert('A apărut o eroare la autentificare.');
    }
  };
  

  const handleRegister = async (username, password, email) => {
    try {
      const response = await fetch(`/api/auth/register?username=${username}&password=${password}&email=${email}`, {
        method: 'POST',
      });

      if (response.ok) {
        const message = await response.text();
        alert(message);
        return true; // Succes
      } else {
        const errorMessage = await response.text();
        alert(`Eroare la crearea contului: ${errorMessage}`);
        return false; // Eroare
      }
    } catch (error) {
      console.error('Eroare:', error);
      alert('A apărut o eroare la crearea contului.');
      return false;
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setCurrentPage('login');
  };

  if (currentPage === 'register') {
    return <RegisterPage onRegister={handleRegister} onBack={() => setCurrentPage('login')} />;
  }

  if (currentPage === "adminDashboard") {
    return <AdminDashboard onLogout={handleLogout} onChangePage={setCurrentPage} />;
  }
  

  if (loggedInUser === "admin") {
    // Navigație pentru Admin
    if (currentPage === "adminDashboard") {
      return <AdminDashboard onLogout={handleLogout} onChangePage={setCurrentPage} />;
    } else if (currentPage === "adaugaCarte") {
      return <AdaugaCarte onBack={() => setCurrentPage("adminDashboard")} />;
    } else if (currentPage === "editeazaCarte") {
      return <EditeazaCarte onBack={() => setCurrentPage("adminDashboard")} />;
    } else if (currentPage === "suplimenteazaStoc") {
      return <SuplimenteazaStoc onBack={() => setCurrentPage("adminDashboard")} />;
    } else if (currentPage === "stergeCarte") {
      return <StergeCarte onBack={() => setCurrentPage("adminDashboard")} />;
    }
  } else if (loggedInUser === 'user') {
    // Navigation for the `user`
    switch (currentPage) {
      case 'userDashboard':
        return <UserDashboard onLogout={handleLogout} onChangePage={setCurrentPage} />;
      case 'listaCarti':
        return <ListaCarti onBack={() => setCurrentPage('userDashboard')} />;
      case 'cautareAvansata':
        return <CautareAvansata onBack={() => setCurrentPage('userDashboard')} />;
      case 'vizualizareDetalii':
        return <VizualizareDetalii onBack={() => setCurrentPage('userDashboard')} />;
      case 'imprumutaCarte':
        return (<ImprumutaCarte userId={loggedInUserId} onBack={() => setCurrentPage('userDashboard')}/>);
      case 'rezervaCarte':
        return (<RezervaCarte userId={loggedInUserId} onBack={() => setCurrentPage("userDashboard")}/>);
      case 'returneazaCarte':
        return(<ReturneazaCarte userId={loggedInUserId} onBack={() => setCurrentPage('userDashboard')}/>);
      case 'adaugaCarte':
        return <AdaugaCarte onBack={() => setCurrentPage('userDashboard')} />;
      default:
        return <UserDashboard onLogout={handleLogout} onChangePage={setCurrentPage} />;
    }
  }
  

  return <LoginPage onLogin={handleLogin} onGoToRegister={() => setCurrentPage('register')} />;
}

export default App;
