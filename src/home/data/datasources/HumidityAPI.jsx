const API_URL = "http://34.197.223.139:8080/humidity/hamster/1";

const HumidityAPI = {
  async fetchHumidity() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      console.log("Datos recibidos de la API de humedad:", data);

      if (!Array.isArray(data) || data.length === 0) {
        console.error("La API no devolvió un array válido:", data);
        return 0;
      }

      const latestHumidity = data[data.length - 1].humedad;
      return latestHumidity ?? 0;
    } catch (error) {
      console.error("Error al obtener la humedad:", error);
      return 0;
    }
  },

  async fetchHumidityHistory() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      console.log("Historial de humedad recibido:", data);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Error obteniendo historial de humedad:", error);
      return [];
    }
  },
};

export default HumidityAPI;
