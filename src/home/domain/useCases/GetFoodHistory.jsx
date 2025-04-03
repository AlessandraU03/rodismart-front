import FoodRepository from "../../data/repositories/FoodRepository";

async function GetFoodHistory() {
  return await FoodRepository.getFoodHistory();
}

export default GetFoodHistory;
