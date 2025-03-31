const API_URL = "http://localhost:8080/temperatures/hamster/1";
const WS_URL = "ws://localhost:8080/ws"; // WebSocket en localhost


export const api = {
  // Método para obtener la temperatura en tiempo real.
  async getTemperatura() {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Error al obtener la temperatura");
    }
    return response.json(); // Retorna la respuesta en formato JSON
  },
};
