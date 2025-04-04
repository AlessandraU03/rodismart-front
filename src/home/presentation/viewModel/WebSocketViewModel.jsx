// src/home/presentation/viewModels/WebSocketViewModel.jsx
import { useEffect } from "react";

export const useWebSocket = (token, onMessageCallback) => {
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    const ws = new WebSocket(`ws://localhost:8080/ws/connect?token=${token}`);

    ws.onopen = () => {
      console.log("Conectado al WebSocket");
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Mensaje WebSocket:", message);

      if (onMessageCallback) {
        onMessageCallback(message);
      }
    };

    ws.onerror = (error) => {
      console.error("Error en WebSocket:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket cerrado");
    };

    return () => {
      ws.close();
    };
  }, [token]);
};
