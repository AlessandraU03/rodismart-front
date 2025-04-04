import { useState, useEffect } from "react";
import CageRepository from "../../data/repositories/CageRepository"; // Importamos el repositorio de jaulas

const CageViewModel = (token) => {
  const [cages, setCages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCages = async () => {
      try {
        if (!token) {
          console.error("No se encontró el token de autenticación.");
          return;
        }

        const data = await CageRepository.getAllCages(token);
        setCages(data);
        setLoading(false);
      } catch (err) {
        console.error("Error al cargar las jaulas:", err);
        setError("Error al cargar las jaulas.");
        setLoading(false);
      }
    };

    fetchCages();
  }, [token]);

  // Método para actualizar una jaula
  const updateCage = async (idjaula, idusuario, nombre_hamster) => {
    try {
      const updatedCage = await CageRepository.updateCage(idjaula, idusuario, nombre_hamster, token);
      
      // Actualizamos el estado de las jaulas después de la actualización
      setCages((prevCages) => prevCages.map(cage => 
        cage.idjaula === idjaula ? { ...cage, idusuario, nombre_hamster } : cage
      ));

      return updatedCage;  // Retornamos el resultado de la actualización
    } catch (error) {
      console.error("Error al actualizar la jaula:", error);
      throw error;  // Lanza el error para que sea manejado por el componente
    }
  };

  return { cages, loading, error, updateCage };
};

export default CageViewModel;
