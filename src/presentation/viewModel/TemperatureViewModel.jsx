import { useState, useEffect } from "react";
import { TemperaturaRepository } from "../../data/TemperatureRepository";
import { GetTemperaturaUseCase } from "../../domain/useCases/GetTemperatureUseCase";

export function useTemperatureViewModel() {
  const [temperatura, setTemperatura] = useState(null); // Inicializamos con `null`
  const [loading, setLoading] = useState(true); // Estado de carga.
  const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    async function fetchTemperatura() {
      try {
        const temperaturaRepository = new TemperaturaRepository(); // Corrección: Instancia correctamente el repositorio
        const getTemperaturaUseCase = new GetTemperaturaUseCase(temperaturaRepository);
        const result = await getTemperaturaUseCase.execute();
        
        // Verifica si la API devuelve un array y toma el primer elemento si es necesario
        if (Array.isArray(result) && result.length > 0) {
          setTemperatura(result[0]); // Tomamos la última medición
        } else {
          setTemperatura(null); // No hay datos
        }

        setLoading(false);
      } catch (error) {
        console.error("Error obteniendo la temperatura:", error);
        setError("No se pudo obtener la temperatura");
        setLoading(false);
      }
    }

    fetchTemperatura(); 

    // Opcional: Refrescar cada 10 segundos para obtener datos en tiempo real
    const interval = setInterval(fetchTemperatura, 10000);
    
    return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonta
  }, []);

  return { temperatura, loading, error }; // Devuelve los datos y el estado de error.
}
