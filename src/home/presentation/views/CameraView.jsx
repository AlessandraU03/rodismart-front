import React, { useEffect } from "react";
import CameraViewModel from "../viewModel/CameraViewModel";

function CameraView () {
  const { cameraUrl, refreshStream, fetchCameraUrl } = CameraViewModel();

  useEffect(() => {
    fetchCameraUrl(); // Cargar la URL de la cámara al montar
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Monitoreo en tiempo real</h2>
      <img src={cameraUrl} alt="ESP32-CAM Stream" className="w-96 h-64 rounded-lg shadow-md" />
      <button 
        onClick={refreshStream} 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
      >
        Refrescar Stream
      </button>
    </div>
  );
};

export default CameraView;
