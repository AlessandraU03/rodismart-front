import { useState, useEffect } from "react";
import CameraAPI from "../../data/datasources/CameraAPI";

function CameraViewModel() {
  const [cameraStream, setCameraStream] = useState("");
  let ws = null; // Variable para almacenar la conexión WebSocket

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (ws) {
        ws.close(); // Cerramos la conexión WebSocket al desmontar el componente
      }
    };
  }, []);

  function connectWebSocket() {
    ws = CameraAPI.createWebSocketConnection(setCameraStream);
  }

  function refreshStream() {
    setCameraStream(""); // Borra la imagen actual
    if (ws) {
      ws.close(); // Cierra la conexión WebSocket actual
    }
    setTimeout(() => {
      connectWebSocket(); // Reconectar al WebSocket
    }, 500);
  }

  return { cameraStream, refreshStream };
}

export default CameraViewModel;
