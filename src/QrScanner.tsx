// src/QrScanner.tsx
import React, { useRef, useEffect, useState } from 'react';
import jsQR from 'jsqr';
import { getIdClient } from './Store';

const QrScanner: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const startVideo = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        video.play();

        const scan = () => {
          const canvas = canvasRef.current;

          // Verifica si canvas y su contexto son válidos
          if (canvas) {
            const context = canvas.getContext('2d');
            // Verifica si context no es null
            if (context && video.readyState === video.HAVE_ENOUGH_DATA) {
              context.drawImage(video, 0, 0, canvas.width, canvas.height);
              const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
              const code = jsQR(imageData.data, canvas.width, canvas.height);
              if (code) {
                setResult(code.data);
                console.log(code.data)
                if(code.data){
                  const url = new URL(code.data);
                  const idString: string | null = url.searchParams.get('id');
                  const idNumber: number | null = idString ? Number(idString) : null;
                  if(idNumber===getIdClient()){
                    console.log("si es igual")
                    verification(code.data)
                  }
                }
              }
            }
          }
          requestAnimationFrame(scan);
        };

        requestAnimationFrame(scan);
      };

      startVideo();
    }
  }, []);

  const verification = async (apiUrl: string) => {
    try {
      const response = await fetch(apiUrl);
      
      // Verificamos que la respuesta sea exitosa
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error: any) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <video ref={videoRef} style={{ display: 'none' }} />
      <canvas ref={canvasRef} width={300} height={300} />
      <p>{result ? `Resultado: ${result}` : 'Escanea un código QR'}</p>
    </div>
  );
};

export default QrScanner;
