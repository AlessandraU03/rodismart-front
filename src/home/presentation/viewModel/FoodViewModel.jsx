import { useState, useEffect } from "react";
import GetFoodStatus from "../../domain/useCases/GetSatusFood";
import GetFoodHistory from "../../domain/useCases/GetFoodHistory"; // ✅ Asegúrate de que existe y está bien importado

function FoodViewModel() {
  const [alimento, setAlimento] = useState(false);
  const [porcentaje, setPorcentaje] = useState(0);
  const [foodData, setFoodData] = useState([]);

  async function fetchFoodData() {
    try {
      const foodStatus = await GetFoodStatus(); // 🔍 Asegúrate de que esta función existe y se exporta correctamente
      let foodHistory = await GetFoodHistory();

      console.log("Historial de alimento recibido:", foodHistory);

      // Ordenamos por fecha y hora
      foodHistory.sort(
        (a, b) => new Date(a.hora_registro) - new Date(b.hora_registro)
      );

      setAlimento(foodStatus?.alimento ?? false);
      setPorcentaje(foodStatus?.porcentaje ?? 0);
      setFoodData(foodHistory);
    } catch (error) {
      console.error("Error obteniendo datos de alimento:", error);
    }
  }

  useEffect(() => {
    fetchFoodData();
  }, []);

  return { alimento, porcentaje, foodData, fetchFoodData };
}

export default FoodViewModel;
