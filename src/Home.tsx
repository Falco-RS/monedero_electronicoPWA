// src/Home.tsx
import React, { useState } from 'react';
import QrScanner from './QrScanner'; // Asegúrate de que este componente esté definido
import './Styles.css'; // Asegúrate de tener los estilos aplicados
import { saveIdClient } from './Store';

const Home: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showQrScanner, setShowQrScanner] = useState(false);
  const [balance, setBalance] = useState<number | null>(null); // Balance inicial, puede ser null hasta que inicie sesión

  const handleLogin = async () => {
    console.log('Iniciando sesión con:', { name, phone, email, password });
    
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setIsLoggedIn(true); // Cambiar el estado a "logueado"
        setBalance(data.balance); // Actualiza el balance si la respuesta es exitosa
        saveIdClient(data.id)
      } else {
        alert('Credenciales incorrectas o cliente no encontrado.');
        setBalance(null); // Resetear balance si hay un error
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Ocurrió un error al iniciar sesión.');
    }
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
            Su saldo es de: ${balance !== null ? balance : 0}
          </div>
          <div>
            <button onClick={toggleQrScanner}>
              {showQrScanner ? 'Cerrar Escáner' : 'Escanear QR'}
            </button>
          </div>
          {showQrScanner && <QrScanner/>} {/* Muestra el escáner solo si se activa */}
        </>
      )}
    </div>
  );
};

export default Home;

