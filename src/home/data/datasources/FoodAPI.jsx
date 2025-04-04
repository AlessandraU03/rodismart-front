const API_BASE_URL = "http://localhost:8080/food";
const WS_BASE_URL = "ws://localhost:8080/ws/food";

let socket = null;
let reconnectTimeout = null;

const FoodAPI = {
  // Obtiene el estado actual del alimento para una jaula específica
  async fetchFoodStatus(idjaula) {
    try {
      const response = await fetch(`${API_BASE_URL}/hamster/${idjaula}`);
      if (!response.ok) throw new Error("❌ Error al obtener estado de alimento");

      const data = await response.json();
      console.log(`📊 Estado actual del alimento para jaula ${idjaula}:`, data);

      if (Array.isArray(data) && data.length > 0) {
        return data[data.length - 1];
      }

      return { alimento: false, porcentaje: 0 };
    } catch (error) {
      console.error(`❌ Error al obtener estado de alimento para jaula ${idjaula}:`, error);
      return { alimento: false, porcentaje: 0 };
    }
  },

  // Obtiene el historial de alimento para una jaula específica
  async fetchFoodHistory(idjaula) {
    try {
      const response = await fetch(`${API_BASE_URL}/hamster/${idjaula}`);
      if (!response.ok) throw new Error("❌ Error al obtener historial de alimento");

      const data = await response.json();
      console.log(`📜 Historial de alimento para jaula ${idjaula}:`, data);

      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error(`❌ Error al obtener historial de alimento para jaula ${idjaula}:`, error);
      return [];
    }
  },

  // Conectar WebSocket para recibir datos de alimento en tiempo real para una jaula específica
  connectWebSocket(idjaula, token, onDataReceived) {
    if (socket && socket.readyState === WebSocket.OPEN) {
      console.warn("⚠️ WebSocket ya está conectado.");
      return;
    }

    const wsUrl = `${WS_BASE_URL}/${idjaula}?token=${token}`;
    socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      console.log(`✅ Conectado al WebSocket de alimento para jaula ${idjaula}`);
      clearTimeout(reconnectTimeout);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log(`🔄 Datos en tiempo real de alimento para jaula ${idjaula}:`, data);
        onDataReceived(data);
      } catch (error) {
        console.error("❌ Error al procesar mensaje WebSocket:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("❌ Error en WebSocket:", error);
    };

    socket.onclose = (event) => {
      console.warn(`🔌 WebSocket de alimento para jaula ${idjaula} cerrado:`, event.reason);
      this.reconnectWebSocket(idjaula, token, onDataReceived);
    };
  },

  // Reconectar WebSocket en caso de cierre inesperado
  reconnectWebSocket(idjaula, token, onDataReceived) {
    if (reconnectTimeout) return;
    reconnectTimeout = setTimeout(() => {
      console.log(`♻️ Reintentando conexión WebSocket para jaula ${idjaula}...`);
      this.connectWebSocket(idjaula, token, onDataReceived);
    }, 3000);
  },

  // Cerrar WebSocket manualmente
  closeWebSocket() {
    if (socket) {
      socket.close();
      socket = null;
      console.log("🔒 WebSocket de alimento cerrado manualmente.");
    }
  }
};

export default FoodAPI;