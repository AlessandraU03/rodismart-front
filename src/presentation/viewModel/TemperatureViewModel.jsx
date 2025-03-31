import { useState, useEffect } from "react";
import { TemperaturaRepository } from "../../data/TemperatureRepository";
import { GetTemperaturaUseCase } from "../../domain/useCases/GetTemperatureUseCase";

export function useTemperatureViewModel() {
  const [temperatura, setTemperatura] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTemperatura() {
      try {
        const temperaturaRepository = new TemperaturaRepository();
        const getTemperaturaUseCase = new GetTemperaturaUseCase(temperaturaRepository);
        const result = await getTemperaturaUseCase.execute();

        if (Array.isArray(result) && result.length > 0) {
          setTemperatura(result[0]);
        } else {
          setTemperatura(null);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error obteniendo la temperatura:", error);
        setError("No se pudo obtener la temperatura");
        setLoading(false);
      }
    }

    fetchTemperatura();

    const socket = new WebSocket("ws://localhost:8080/ws");

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.sensor === "temperatura") {
          setTemperatura({
            Temperatura: data.value,
            HoraRegistro: data.timestamp,
          });
        }
      } catch (err) {
        console.error("Error procesando mensaje WebSocket:", err);
      }
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
      setError("Error en la conexión WebSocket");
    };

    socket.onclose = () => {
      console.log("Conexión WebSocket cerrada, intentando reconectar...");
      setTimeout(() => {
        fetchTemperatura();
      }, 5000);
    };

    return () => {
      socket.close();
    };
  }, []);

  return { temperatura, loading, error };
}
