const API_URL = "http://34.197.223.139:8080/temperatures/hamster/1";

const TemperatureAPI = {
  async fetchTemperature() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      console.log("Datos recibidos de la API de temperatura:", data);

      if (!Array.isArray(data) || data.length === 0) {
        console.error("La API no devolvió un array válido:", data);
        return 0;
      }

      const latestTemperature = data[data.length - 1].temperatura;
      return latestTemperature ?? 0;
    } catch (error) {
      console.error("Error al obtener la temperatura:", error);
      return 0;
    }
  },

  async fetchTemperatureHistory() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      console.log("Historial de temperatura recibido:", data);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Error obteniendo historial de temperatura:", error);
      return [];
    }
  },
};

export default TemperatureAPI;
