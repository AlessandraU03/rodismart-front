import React, { useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function ClimateChart({ data }) {
  useEffect(() => {
    console.log("Datos para la gráfica:", data);
  }, [data]);

  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4">Historial de Clima</h2>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data}>
          <XAxis dataKey="hora_registro" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Area type="monotone" dataKey="temperatura" stroke="#FF8042" fill="#FFBB28" />
          <Area type="monotone" dataKey="humedad" stroke="#36A2EB" fill="#A2D5F2" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ClimateChart;
