import TemperatureAPI from "../datasources/TemperatureAPI.jsX";
import HumidityAPI from "../datasources/HumidityAPI";

const ClimateRepository = {
  async getClimateData(cageId) {
    try {
      // Obtener datos de temperatura y humedad
      const temperatureData = await TemperatureAPI.fetchTemperature(cageId);
      const humidityData = await HumidityAPI.fetchHumidity(cageId);

      // Combinar y formatear los datos
      const combinedData = [];
      
      // Procesar datos de temperatura
      if (Array.isArray(temperatureData)) {
        temperatureData.forEach(item => {
          combinedData.push({
            timestamp: item.hora_registro,
            temperatura: item.temperatura,
            tipo: 'temperatura'
          });
        });
      }

      // Procesar datos de humedad
      if (Array.isArray(humidityData)) {
        humidityData.forEach(item => {
          combinedData.push({
            timestamp: item.hora_registro,
            humedad: item.humedad,
            tipo: 'humedad'
          });
        });
      }

      // Ordenar por timestamp
      combinedData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

      return combinedData;
    } catch (error) {
      console.error("Error al obtener datos climáticos:", error);
      throw error;
    }
  },

  connectTemperatureWebSocket(token, callback) {
    TemperatureAPI.connectWebSocket(token, callback);
  },

  connectHumidityWebSocket(token, callback) {
    HumidityAPI.connectWebSocket(token, callback);
  },

  closeWebSockets() {
    TemperatureAPI.closeWebSocket();
    HumidityAPI.closeWebSocket();
  }
};

export default ClimateRepository;