const API_URL = "http://localhost:8080/humidity/hamster/1";

const HumidityAPI = {
  async fetchHumidity() {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.humedad;
  },
  async fetchHumidityHistory() {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.hora_registro ?? [];
  },
};

export default HumidityAPI;
