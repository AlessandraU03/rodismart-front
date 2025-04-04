import FoodAPI from "../datasources/FoodAPI.jsx";

const FoodRepository = {
  async getFoodStatus() {
    return await FoodAPI.fetchFoodStatus();
  },

  async getFoodHistory() {   // ✅ Asegúrate de que está llamando a `fetchFoodHistory`
    return await FoodAPI.fetchFoodHistory();
  }
};

export default FoodRepository;
