const API_URL = "http://34.197.223.139:8080/food/hamster/1";

const FoodAPI = {
  async fetchFoodStatus() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Error al obtener estado de alimento");

      const data = await response.json();
      console.log("Datos recibidos de la API de Alimento:", data);

      if (Array.isArray(data) && data.length > 0) {
        return data[data.length - 1];
      }

      return { alimento: false, porcentaje: 0 };
    } catch (error) {
      console.error(error);
      return { alimento: false, porcentaje: 0 };
    }
  },

  async fetchFoodHistory() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Error al obtener historial de alimento");

      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  },
};

export default FoodAPI;
