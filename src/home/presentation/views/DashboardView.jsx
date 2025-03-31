import React, { useEffect, useState } from "react";
import ClimateCard from "./ClimateCard";
import ClimateViewModel from "../viewModel/ClimateViewModel";
import ClimateChart from "./ClimateChart";
import CameraView from "./CameraView";

function DashboardView() {
  const { temperatura, humedad, climateData, fetchData } = ClimateViewModel();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>
      <CameraView></CameraView>
      <div className="grid grid-cols-2 gap-4">
        <ClimateCard title="Temperatura" value={`${temperatura}°C`} />
        <ClimateCard title="Humedad" value={`${humedad}%`} />
      </div>
      <div className="mt-6">
        <ClimateChart data={climateData} />
      </div>
    </div>
  );
}

export default DashboardView;
