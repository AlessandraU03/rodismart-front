import FoodAPI from "../datasources/FoodAPI";

const FoodRepository = {
  async getFoodStatus() {
    return await FoodAPI.fetchFoodStatus();
  },

  async getFoodHistory() {
    return await FoodAPI.fetchFoodHistory();
  }
};

export default FoodRepository;
