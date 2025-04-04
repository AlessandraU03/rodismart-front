import React, { useEffect } from "react";
import { data, useParams } from "react-router-dom";
import { useCage } from "../../../core/context/CageContext";
import SensorCard from "./components/SensorCard";
import ConnectionStatusBar from "./components/ConnectionStatuBar";
import CameraView from "./components/CameraView";
import ClimateChart from "./ClimateChart";
import { useClimateViewModel } from "../viewModel/ClimateViewModel";

function DashboardView() {
  const { idjaula } = useParams();
  const { 
    currentCage, 
    data, 
    connectionStatus,
    setCurrentCage 
  } = useCage();
  const { climateData, fetchData } = useClimateViewModel();


  // Efecto para actualizar la jaula actual cuando cambia el parámetro de la URL
  useEffect(() => {
    if (idjaula && (!currentCage || currentCage.idjaula !== idjaula)) {
      setCurrentCage({ idjaula });
    }
  }, [idjaula, currentCage, setCurrentCage]);

  // Función para determinar el estado de alerta de cada sensor
  const getAlertStatus = (type) => {
    switch(type) {
      case 'temperature':
        return data.temperatura !== null && data.temperatura >= 30;
      case 'humidity':
        return data.humedad !== null && data.humedad <= 20;
      case 'food':
        return data.porcentaje !== null && data.porcentaje <= 20;
      case 'motion':
        return data.movimiento === true;
      default:
        return false;
    }
  };

  // Función para formatear valores nulos
  const formatValue = (value, unit = '') => {
    return value !== null ? `${value}${unit}` : 'N/A';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Título con nombre del hamster o ID de jaula */}
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        {currentCage?.nombre_hamster || `Jaula ${idjaula}`}
      </h1>
      
      {/* Barra de estado de conexión */}
      <ConnectionStatusBar 
        isConnected={connectionStatus.isConnected}
      />
      
      {/* Vista de la cámara */}
      <CameraView cageId={idjaula} />
      
      {/* Grid de tarjetas de sensores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Tarjeta de Temperatura */}
        <SensorCard
          type="temperature"
          value={data.temperatura}
          unit="°C"
          alert={getAlertStatus('temperature')}
          lastUpdated={data.lastUpdated}
        />
        
        {/* Tarjeta de Humedad */}
        <SensorCard
          type="humidity"
          value={data.humedad}
          unit="%"
          alert={getAlertStatus('humidity')}
          lastUpdated={data.lastUpdated}
        />
        
        {/* Tarjeta de Movimiento */}
        <SensorCard
          type="motion"
          value={data.movimiento}
          alert={getAlertStatus('motion')}
          lastUpdated={data.lastUpdated}
        />
        
        {/* Tarjeta de Alimento */}
        <SensorCard
          type="food"
          value={data.porcentaje}
          unit="%"
          status={data.alimento !== null 
            ? data.alimento ? "Disponible" : "Agotado" 
            : "N/A"}
          alert={getAlertStatus('food')}
          lastUpdated={data.lastUpdated}
        />
      </div>
      <div className="mt-6">
        <ClimateChart data={climateData} />
      </div>


    </div>
  );
}

export default DashboardView;