const API_URL = "http://34.197.223.139:8080/temperatures/hamster/1";

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
