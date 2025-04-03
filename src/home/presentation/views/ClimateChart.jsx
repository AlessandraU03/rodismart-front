import React, { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function ClimateChart({ data }) {
  const [selectedChart, setSelectedChart] = useState("temperatura");

  return (
    <div className="bg-blue-300 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4">Clima de Jaula</h2>
      <div className="flex justify-center space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${selectedChart === "temperatura" ? "bg-blue-600 text-white" : "bg-white text-black"}`}
          onClick={() => setSelectedChart("temperatura")}
        >
          Temperatura
        </button>
        <button
          className={`px-4 py-2 rounded ${selectedChart === "humedad" ? "bg-blue-600 text-white" : "bg-white text-black"}`}
          onClick={() => setSelectedChart("humedad")}
        >
          Humedad
        </button>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data}>
          <XAxis dataKey="hora_registro" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          {selectedChart === "temperatura" && (
            <Area type="monotone" dataKey="temperatura" stroke="#FF8042" fill="#FFBB28" />
          )}
          {selectedChart === "humedad" && (
            <Area type="monotone" dataKey="humedad" stroke="#36A2EB" fill="#A2D5F2" />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ClimateChart;
