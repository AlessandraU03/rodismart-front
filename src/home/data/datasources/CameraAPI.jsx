const CameraAPI = {
  createWebSocketConnection(onMessage) {
    const ws = new WebSocket("ws://3.230.129.149:3000/ws"); // Dirección del WebSocket

    ws.onopen = () => {
      console.log("✅ Conectado al WebSocket de la ESP32-CAM");
    };

    ws.onmessage = (event) => {
      if (typeof event.data === "object") {
        const imageBlob = new Blob([event.data], { type: "image/jpeg" });
        const imageUrl = URL.createObjectURL(imageBlob);
        onMessage(imageUrl); // Llama a la función de callback para actualizar la imagen
      }
    };

    ws.onerror = (error) => {
      console.error("❌ Error en WebSocket:", error);
    };

    ws.onclose = () => {
      console.log("⚠️ Conexión WebSocket cerrada");
    };

    return ws; // Retornamos el WebSocket para manejarlo desde el ViewModel
  },
};

export default CameraAPI;
