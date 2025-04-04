import { useEffect, useState } from "react";
import GetTemperature from "../../domain/useCases/GetTemperature";
import GetHumidity from "../../domain/useCases/GetHumidity";
import GetClimateData from "../../domain/useCases/GetClimateData";

export function useClimateViewModel(cageId) {
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [motion, setMotion] = useState(null);
  const [foodPercentage, setFoodPercentage] = useState(null);
  const [climateData, setClimateData] = useState([]);


  useEffect(() => {
    // Obtener datos históricos
    
    const token = sessionStorage.getItem("token");
    if (!token) return;
    

    // Conectar al WebSocket
    const ws = new WebSocket(`ws://34.197.223.139:8080/ws/connect?token=${token}`);

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.cage_id !== cageId) return;

      switch (message.event) {
        case "new_temperature":
          setTemperature(message.data.temperatura);
          break;
        case "new_humidity":
          setHumidity(message.data.humedad);
          break;
        case "new_motion":
          setMotion(message.data.movimiento);
          break;
        case "new_food":
          setFoodPercentage(message.data.porcentaje);
          break;
        default:
          break;
      }
    };

    return () => ws.close();
  }, [cageId]);

  async function fetchData() {
    try {
      const tempData = await GetTemperature();
      const humData = await GetHumidity();
      let climateHistory = await GetClimateData();

      console.log("Datos históricos recibidos:", climateHistory);

      // Ordenamos por fecha y hora
      climateHistory.sort(
        (a, b) => new Date(a.hora_registro) - new Date(b.hora_registro)
      );

      setTemperature(tempData ?? 0);
      setHumidity(humData ?? 0);
      setClimateData(climateHistory);
    } catch (error) {
      console.error("Error obteniendo datos:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  

  return {
    temperature,
    humidity,
    motion,
    foodPercentage,
    fetchData,
    climateData
  };
}
