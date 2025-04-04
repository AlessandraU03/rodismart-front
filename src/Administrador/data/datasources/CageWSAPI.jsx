const WS_URL = "ws://34.197.223.139:8080/ws/connect";

export default class CageWSDataSource {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
    this.connectionStatus = false;
  }

  connect(token) {
    if (!token) {
      console.error('No se proporcionó token para la conexión WebSocket');
      return;
    }

    try {
      this.socket = new WebSocket(`${WS_URL}?token=${token}`);

      this.socket.onopen = () => {
        console.log("Conexión WS establecida");
        this.connectionStatus = true;
      };

      this.socket.onclose = () => {
        console.log("Conexión WS cerrada");
        this.connectionStatus = false;
      };

      this.socket.onerror = (error) => {
        console.error("Error WS:", error);
        this.connectionStatus = false;
      };

      this.socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          const { event: eventType, cage_id, data } = message;
          
          if (this.listeners.has(cage_id)) {
            this.listeners.get(cage_id).forEach(cb => cb(eventType, data));
          }
        } catch (error) {
          console.error("Error procesando mensaje WS:", error);
        }
      };
    } catch (error) {
      console.error("Error al crear WebSocket:", error);
    }
  }

  subscribe(cageId, callback) {
    if (!this.listeners.has(cageId)) {
      this.listeners.set(cageId, []);
    }
    this.listeners.get(cageId).push(callback);
  }

  unsubscribe(cageId) {
    this.listeners.delete(cageId);
  }

  isConnected() {
    return this.connectionStatus && this.socket?.readyState === WebSocket.OPEN;
  }
}