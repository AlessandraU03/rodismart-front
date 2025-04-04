import React, { useEffect } from "react";
import Swal from "sweetalert2";

const sensorConfig = {
  temperature: {
    title: "Temperatura",
    icon: "🌡️",
    alertMessage: "¡Temperatura alta!",
    valueColor: (value) => (value >= 26 ? "text-red-600" : "text-green-600"),
  },
  temperature: {
    title: "Temperatura",
    icon: "🌡️",
    alertMessage: "¡Temperatura baja!",
    valueColor: (value) => (value >= 17 ? "text-red-600" : "text-green-600"),
  },
  humidity: {
    title: "Humedad",
    icon: "💧",
    alertMessage: "¡Humedad alta!",
    valueColor: (value) => (value >= 26 ? "text-red-600" : "text-green-600"),
  },
  motion: {
    title: "Movimiento",
    icon: (value) => (value),
    alertMessage: "¡Movimiento detectado!",
    valueColor: () => "text-blue-600",
  },
  food: {
    title: "Alimento",
    icon: "🍽️",
    alertMessage: (value) => `¡Queda ${value}%!`,
    valueColor: (value) => (value <= 20 ? "text-red-600" : "text-green-600"),
  },
};

function SensorCard({ type, value, unit, alert, status, lastUpdated }) {
  const config = sensorConfig[type];
  const displayValue = value !== null ? `${value}${unit || ""}` : "N/A";

  const valueClass =
    value !== null ? config.valueColor?.(value) || "text-gray-800" : "text-gray-500";

  useEffect(() => {
    if (alert) {
      Swal.fire({
        title: config.title,
        text: typeof config.alertMessage === "function" ? config.alertMessage(value) : config.alertMessage,
        icon: "warning",
        confirmButtonText: "Entendido",
      });
    }
  }, [alert, value, config]);

  return (
    <div
      className={`p-4 rounded-lg border ${
        alert ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center">
            <h3 className="text-lg font-semibold text-gray-700">{config.title}</h3>
            <span className="ml-2 text-xl">
              {typeof config.icon === "function" ? config.icon(value) : config.icon}
            </span>
          </div>
          <p className={`text-2xl font-bold mt-1 ${valueClass}`}>{displayValue}</p>
          {status && <p className="text-sm text-gray-600 mt-1">{status}</p>}
          {lastUpdated && (
            <p className="text-xs text-gray-500 mt-2">Actualizado: {lastUpdated.toLocaleTimeString()}</p>
          )}
        </div>
      </div>
      {alert && (
        <div className="mt-2 p-2 bg-red-100 text-red-800 text-sm rounded">
          {typeof config.alertMessage === "function" ? config.alertMessage(value) : config.alertMessage}
        </div>
      )}
    </div>
  );
}

export default SensorCard;
