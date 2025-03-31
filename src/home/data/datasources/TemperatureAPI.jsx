const API_URL = "http://localhost:8080/temperatures/hamster/1";

const TemperatureAPI = {
  async fetchTemperature() {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.temperatura;
  },
  async fetchTemperatureHistory() {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.hora_registro ?? []; // Asumimos que la API tiene un campo "history"
  },
};

export default TemperatureAPI;
