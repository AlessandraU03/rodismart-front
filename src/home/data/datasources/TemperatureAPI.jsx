const WS_URL = "ws://34.197.223.139:8080/ws/connect";

let socket = null;
let reconnectTimeout = null;

const TemperatureAPI = {
  // Obtiene la última temperatura
  async fetchTemperature(idjaula) {
    try {
      const response = await fetch(`http://34.197.223.139:8080/temperatures/hamster/${idjaula}`);
      const data = await response.json();
      console.log("📡 Datos recibidos de la API de temperatura:", data);

      if (!Array.isArray(data) || data.length === 0) {
        console.error("⚠️ La API no devolvió un array válido:", data);
        return { temperatura: 0 };
      }

      return data[data.length - 1] || { temperatura: 0 };
    } catch (error) {
      console.error("❌ Error al obtener la temperatura:", error);
      return { temperatura: 0 };
    }
  },

  // Conectar WebSocket para recibir datos de temperatura en tiempo real
  connectWebSocket(idjaula, token, onDataReceived) {
    if (socket && socket.readyState === WebSocket.OPEN) {
      console.warn("⚠️ WebSocket ya está conectado.");
      return;
    }

    const wsUrlWithToken = `${WS_URL}?token=${token}`;
    socket = new WebSocket(wsUrlWithToken);

    socket.onopen = () => {
      console.log("✅ Conectado al WebSocket de temperatura");
      clearTimeout(reconnectTimeout);
    };

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        
        // Filtrar solo los eventos de temperatura para la jaula específica
        if (message.event === "new_temperature" && message.cage_id === idjaula) {
          console.log("🔄 Datos de temperatura recibidos:", message.data);
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
      console.warn("🔌 WebSocket de temperatura cerrado:", event.reason);
      this.reconnectWebSocket(idjaula, token, onDataReceived);
    };
  },

  // Reconectar WebSocket en caso de cierre inesperado
  reconnectWebSocket(idjaula, token, onDataReceived) {
    if (reconnectTimeout) return;
    reconnectTimeout = setTimeout(() => {
      console.log("♻️ Reintentando conexión WebSocket de temperatura...");
      this.connectWebSocket(idjaula, token, onDataReceived);
    }, 3000);
  },

  // Cerrar WebSocket manualmente
  closeWebSocket() {
    if (socket) {
      socket.close();
      socket = null;
      console.log("🔒 WebSocket de temperatura cerrado manualmente.");
    }
  }
};

export default TemperatureAPI;