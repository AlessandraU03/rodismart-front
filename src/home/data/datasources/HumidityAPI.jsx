const WS_URL = "ws://34.197.223.139:8080/ws/connect";

let socket = null;
let reconnectTimeout = null;

const HumidityAPI = {
  // Obtiene la última humedad
  async fetchHumidity(idjaula) {
    try {
      const response = await fetch(`http://34.197.223.139:8080/humidity/hamster/${idjaula}`);
      const data = await response.json();

      console.log("Datos recibidos de la API de humedad:", data);

      if (!Array.isArray(data) || data.length === 0) {
        console.error("La API no devolvió un array válido:", data);
        return { humedad: 0 };
      }

      return data[data.length - 1] || { humedad: 0 };
    } catch (error) {
      console.error("Error al obtener la humedad:", error);
      return { humedad: 0 };
    }
  },

  // Conectar WebSocket para recibir datos de humedad en tiempo real
  connectWebSocket(idjaula, token, onDataReceived) {
    if (socket && socket.readyState === WebSocket.OPEN) {
      console.warn("⚠️ WebSocket ya está conectado.");
      return;
    }

    const wsUrlWithToken = `${WS_URL}?token=${token}`;
    socket = new WebSocket(wsUrlWithToken);

    socket.onopen = () => {
      console.log("✅ Conectado al WebSocket de humedad");
      clearTimeout(reconnectTimeout);
    };

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        
        // Filtrar solo los eventos de humedad para la jaula específica
        if (message.event === "new_humidity" && message.cage_id === idjaula) {
          console.log("🔄 Datos de humedad recibidos:", message.data);
          onDataReceived(message.data);
        }
      } catch (error) {
        console.error("❌ Error al procesar mensaje WebSocket:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("❌ Error en WebSocket:", error);
    };

    socket.onclose = (event) => {
      console.warn("🔌 WebSocket de humedad cerrado:", event.reason);
      this.reconnectWebSocket(idjaula, token, onDataReceived);
    };
  },

  // Reconectar WebSocket en caso de cierre inesperado
  reconnectWebSocket(idjaula, token, onDataReceived) {
    if (reconnectTimeout) return;
    reconnectTimeout = setTimeout(() => {
      console.log("♻️ Reintentando conexión WebSocket de humedad...");
      this.connectWebSocket(idjaula, token, onDataReceived);
    }, 3000);
  },

  // Cerrar WebSocket manualmente
  closeWebSocket() {
    if (socket) {
      socket.close();
      socket = null;
      console.log("🔒 WebSocket de humedad cerrado manualmente.");
    }
  }
};

export default HumidityAPI;