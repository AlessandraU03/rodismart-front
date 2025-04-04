import TemperatureAPI from "../datasources/TemperatureAPI.jsX";
import HumidityAPI from "../datasources/HumidityAPI";

const ClimateRepository = {
  async getTemperature() {
    return await TemperatureAPI.fetchTemperature();
  },

  async getHumidity() {
    return await HumidityAPI.fetchHumidity();
  },

  async getClimateData() {
    try {
      const temperatureHistory = await TemperatureAPI.fetchTemperatureHistory();
      const humidityHistory = await HumidityAPI.fetchHumidityHistory();

      console.log("Historial de temperatura:", temperatureHistory);
      console.log("Historial de humedad:", humidityHistory);

      if (!Array.isArray(temperatureHistory) || !Array.isArray(humidityHistory)) {
        console.error("Los datos recibidos no son arreglos.");
        return [];
      }

      // Unimos los datos por `hora_registro`
      return temperatureHistory.map((tempEntry) => {
        const matchingHumidity = humidityHistory.find(
          (humEntry) => humEntry.hora_registro === tempEntry.hora_registro
        );

        return {
          hora_registro: new Date(tempEntry.hora_registro).toLocaleTimeString(), // Convertimos la fecha
          temperatura: tempEntry.temperatura ?? 0,
          humedad: matchingHumidity ? matchingHumidity.humedad ?? 0 : 0,
        };
      });
    } catch (error) {
      console.error("Error obteniendo historial climático:", error);
      return [];
    }
  },
};

export default ClimateRepository;
