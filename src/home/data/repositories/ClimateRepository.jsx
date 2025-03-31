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
    const temperatureHistory = await TemperatureAPI.fetchTemperatureHistory();
    const humidityHistory = await HumidityAPI.fetchHumidityHistory();

    // Unimos los datos por `hora_registro`
    return temperatureHistory.map((tempEntry) => {
      const matchingHumidity = humidityHistory.find(
        (humEntry) => humEntry.hora_registro === tempEntry.hora_registro
      );

      return {
        hora_registro: tempEntry.hora_registro,
        temperatura: tempEntry.temperatura ?? 0,
        humedad: matchingHumidity ? matchingHumidity.humedad ?? 0 : 0,
      };
    });
  },
};

export default ClimateRepository;
