import { useState, useEffect, useCallback } from 'react';

export default function useFoodViewModel(cageId) {
  const [alimento, setAlimento] = useState(null);
  const [porcentaje, setPorcentaje] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState(null);

  const connectWebSocket = useCallback((token) => {
    if (!token || socket) return;

    const newSocket = new WebSocket(`ws://34.197.223.139:8080/ws/connect?token=${token}`);

    newSocket.onopen = () => {
      console.log("✅ WebSocket alimento conectado");
      setIsConnected(true);
    };

    newSocket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log("Mensaje alimento recibido:", message);
        
        if (message.event === "new_food") {
          setAlimento(message.data.alimento === 1);
          setPorcentaje(message.data.porcentaje);
        }
      } catch (error) {
        console.error("Error procesando mensaje:", error);
      }
    };

    newSocket.onerror = (error) => {
      console.error("❌ Error en WebSocket:", error);
      setIsConnected(false);
    };

    newSocket.onclose = () => {
      console.log("🔌 WebSocket alimento cerrado");
      setIsConnected(false);
      setTimeout(() => connectWebSocket(token), 5000);
    };

    setSocket(newSocket);
  }, [cageId, socket]);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      connectWebSocket(token);
    }

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [connectWebSocket]);

  return {
    alimento,
    porcentaje,
    isConnected,
    isLoading: alimento === null && porcentaje === null
  };
}