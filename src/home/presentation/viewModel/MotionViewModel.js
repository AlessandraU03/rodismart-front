import { useState, useEffect, useCallback } from 'react';

export default function useMotionViewModel(cageId) {
  const [movimiento, setMovimiento] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState(null);

  const connectWebSocket = useCallback((token) => {
    if (!token || socket) return;

    const newSocket = new WebSocket(`ws://localhost:8080/ws/motion?token=${token}`);

    newSocket.onopen = () => {
      console.log("✅ WebSocket movimiento conectado");
      setIsConnected(true);
    };

    newSocket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log("Mensaje movimiento recibido:", message);
        
        if (message.cage_id === cageId && message.event === "new_motion") {
          setMovimiento(message.data.movimiento);
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
      console.log("🔌 WebSocket movimiento cerrado");
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
    movimiento,
    isConnected,
    isLoading: movimiento === null
  };
}