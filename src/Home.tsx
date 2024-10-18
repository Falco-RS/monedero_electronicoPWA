// src/Home.tsx
import React, { useState } from 'react';
import QrScanner from './QrScanner'; // Asegúrate de que este componente esté definido
import './Styles.css'; // Asegúrate de tener los estilos aplicados

const Home: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showQrScanner, setShowQrScanner] = useState(false);
  const [balance] = useState(5000); // Balance inicial

  const handleLogin = () => {
    console.log('Iniciando sesión con:', { name, phone, email, password });
    setIsLoggedIn(true); // Cambiar el estado a "logueado"
  };

  const toggleQrScanner = () => {
    setShowQrScanner((prev) => !prev);
  };

  return (
    <div className="container">
      {!isLoggedIn ? ( // Muestra el formulario de inicio de sesión
        <>
          <button>Bienvenido al Monedero Electronico</button>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Teléfono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Iniciar Sesión</button>
        </>
      ) : ( // Muestra el dashboard
        <>
          <div className="info-box" style={{ backgroundColor: 'green', color: 'white', padding: '10px' }}>
            <h1>Bienvenido, {name}</h1>
          </div>
          <div className="info-box" style={{ backgroundColor: 'green', color: 'white', padding: '10px' }}>
            Su saldo es de: ${balance}
          </div>
          <div>
            <button onClick={() => {/* Aquí va la lógica para solicitar código QR */}}>
              Solicitar Código QR
            </button>
            <button onClick={toggleQrScanner}>
              {showQrScanner ? 'Cerrar Escáner' : 'Escanear QR'}
            </button>
          </div>
          {showQrScanner && <QrScanner />} {/* Muestra el escáner solo si se activa */}
        </>
      )}
    </div>
  );
};

export default Home;

