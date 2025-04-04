import React from 'react';

function ClimateCard({ title, value, alert, alertMessage, icon, hora_registro }) {
  return (
    <div className={`p-4 rounded-lg border ${alert ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {hora_registro && (
            <p className="text-xs text-gray-500 mt-1">Actualizado: {hora_registro}</p>
          )}
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
      {alert && (
        <div className="mt-2 p-2 bg-red-100 text-red-800 text-sm rounded">
          {alertMessage}
        </div>
      )}
    </div>
  );
}

export default ClimateCard;