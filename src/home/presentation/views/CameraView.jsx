import React from "react";
import CameraViewModel from "../viewModel/CameraViewModel";

function CameraView() {
  const { cameraStream, refreshStream } = CameraViewModel();

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Monitoreo en tiempo real</h2>
      {cameraStream ? (
        <img
          src={cameraStream}
          alt="ESP32-CAM Stream"
          className="w-96 h-64 rounded-lg shadow-md"
        />
      ) : (
        <p className="text-gray-500">Esperando imagen...</p>
      )}
      <button
        onClick={refreshStream}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
      >
        Refrescar Stream
      </button>
    </div>
  );
}

export default CameraView;
