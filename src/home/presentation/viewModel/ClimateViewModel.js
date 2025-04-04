import { useEffect, useState } from "react";


export function useClimateViewModel(cageId) {
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [motion, setMotion] = useState(null);
  const [foodPercentage, setFoodPercentage] = useState(null);


  useEffect(() => {
    // Obtener datos históricos
    
    const token = sessionStorage.getItem("token");
    if (!token) return;
    

    // Conectar al WebSocket
    const ws = new WebSocket(`ws://localhost:8080/ws/connect?token=${token}`);

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

  return {
    temperature,
    humidity,
    motion,
    foodPercentage,
    
  };
}
