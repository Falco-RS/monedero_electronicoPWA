// src/Dashboard.tsx
import React, { useState } from 'react';
import QrScanner from './QrScanner';
import './styles.css'; // Asegúrate de que el nombre del archivo sea el correcto

const Dashboard: React.FC<{ name: string }> = ({ name }) => {
  const [showQrScanner, setShowQrScanner] = useState(false);
  const balance = 5000; // Saldo fijo por el momento

  const handleRequestCode = () => {
    // Aquí puedes agregar la lógica para solicitar un código QR
    console.log('Solicitud de código QR realizada.');
  };

  return (
    <div className="container">
      <h1>Bienvenido, {name}</h1>
      <div className="balance-card">
        <p>Su saldo es de: ${balance}</p>
      </div>
      <div>
        <button onClick={handleRequestCode}>Solicitar Código QR</button>
        <button onClick={() => setShowQrScanner(true)}>Escanear QR</button>
      </div>
      {showQrScanner && (
        <div>
          <QrScanner />
          <button onClick={() => setShowQrScanner(false)}>Cerrar Escáner</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
