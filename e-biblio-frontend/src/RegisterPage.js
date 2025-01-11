import React, { useState } from 'react';

function RegisterPage({ onRegister, onBack }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    const success = await onRegister(username, password, email);
    if (success) {
      onBack(); // Redirecționează la pagina de login
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="p-4 border rounded bg-white shadow-sm" style={{ width: '300px' }}>
        <h1 className="text-center mb-4">Creare cont</h1>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Nume utilizator"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Parolă"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn btn-primary w-100 mb-2" onClick={handleSubmit}>
          Creare cont
        </button>
        <button className="btn btn-secondary w-100" onClick={onBack}>
          Înapoi la autentificare
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;
