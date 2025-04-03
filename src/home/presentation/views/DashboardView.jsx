import React, { useEffect } from "react";
import ClimateCard from "./ClimateCard";
import ClimateViewModel from "../viewModel/ClimateViewModel";
import ClimateChart from "./ClimateChart";
import CameraView from "./CameraView";
import FoodStatusCard from "./FoodCard";
import FoodViewModel from "../viewModel/FoodViewModel";

function DashboardView() {
  const { temperatura, humedad, climateData, fetchData } = ClimateViewModel();
  const { alimento, porcentaje, foodData, fetchFoodData } = FoodViewModel();

  console.log("Datos en DashboardView:", { alimento, porcentaje, foodData });

  useEffect(() => {
    fetchData();
    fetchFoodData();
  }, [fetchData, fetchFoodData]); // Agregamos las dependencias para evitar bugs

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>
      <CameraView />
      <div className="grid grid-cols-3 gap-4">
        <ClimateCard title="Temperatura" value={`${temperatura}°C`} />
        <ClimateCard title="Humedad" value={`${humedad}%`} />
        <FoodStatusCard porcentaje={porcentaje} alimento={alimento} />
      </div>
      <div className="mt-6">
        <ClimateChart data={climateData} />
      </div>
    </div>
  );
}

export default DashboardView;
