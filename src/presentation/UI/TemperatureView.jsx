import React from "react";
import { useTemperatureViewModel } from "../viewModel/TemperatureViewModel"; 

const TemperatureView = () => {
  const { temperatura, loading, error } = useTemperatureViewModel();

  if (loading) return <p className="text-center">Cargando temperatura...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>; // Muestra el error en rojo

  return (
    <div className="px-12 py-8">
      <h2 className="text-2xl text-center font-bold mb-4">Temperatura en Tiempo Real</h2>

      {temperatura ? (
        <div className="text-center">
          <p className="text-lg">⏳ Hora de Registro: {temperatura.HoraRegistro}</p>
          <p className="text-xl font-semibold">🔥 Temperatura: {temperatura.Temperatura}°C</p>
        </div>
      ) : (
        <p className="text-center text-gray-500">No hay datos disponibles</p>
      )}
    </div>
  );
};

export default TemperatureView;
