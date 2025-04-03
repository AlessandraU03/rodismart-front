import FoodRepository from "../../data/repositories/FoodRepository";

async function GetStatusFood() {
  return await FoodRepository.getFoodStatus();
}

export default GetStatusFood;
