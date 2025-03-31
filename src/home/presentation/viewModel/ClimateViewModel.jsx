import { useState, useEffect } from "react";
import GetTemperature from "../../domain/useCases/GetTemperature";
import GetHumidity from "../../domain/useCases/GetHumidity";
import GetClimateData from "../../domain/useCases/GetClimateData";

function ClimateViewModel() {
  const [temperatura, setTemperatura] = useState(0);
  const [humedad, setHumedad] = useState(0);
  const [climateData, setClimateData] = useState([]);

  async function fetchData() {
    try {
      const tempData = await GetTemperature();
      const humData = await GetHumidity();
      const climateHistory = await GetClimateData();

      console.log("Datos históricos recibidos:", climateHistory);

      // Ordenamos por fecha y hora
      climateHistory.sort(
        (a, b) => new Date(a.hora_registro) - new Date(b.hora_registro)
      );

      setTemperatura(tempData ?? 0);
      setHumedad(humData ?? 0);
      setClimateData(climateHistory);
    } catch (error) {
      console.error("Error obteniendo datos:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { temperatura, humedad, climateData, fetchData };
}

export default ClimateViewModel;
