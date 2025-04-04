import React from "react";

function ConnectionStatusBar({ isConnected, lastUpdated }) {
  const formatTime = (date) => {
    if (!date) return "Sin datos";
    const now = new Date();
    const diffMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffMinutes < 1) return "Hace unos segundos";
    if (diffMinutes === 1) return "Hace 1 minuto";
    if (diffMinutes < 60) return `Hace ${diffMinutes} minutos`;
    
    return date.toLocaleTimeString();
  };

  return (
    <div className={`p-3 mb-6 rounded-md flex items-center ${
      isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    }`}>
      <div className="flex items-center">
        <span className="font-medium mr-2">Estado:</span>
        {isConnected ? (
          <>
            <span>Conectado</span>
            <span className="ml-2">✅</span>
          </>
        ) : (
          <>
            <span>Desconectado</span>
            <span className="ml-2">❌</span>
          </>
        )}
      </div>
      <span className="ml-auto text-sm">
        {isConnected ? (
          <>Últ. actualización: {formatTime(lastUpdated)}</>
        ) : (
          "Intentando reconectar..."
        )}
      </span>
    </div>
  );
}

export default ConnectionStatusBar;