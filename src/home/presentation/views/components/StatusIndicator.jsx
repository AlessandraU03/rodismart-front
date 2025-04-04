import React from "react";

function StatusIndicator({ title, value, status = 'neutral', loading = false }) {
  const statusColors = {
    good: 'bg-green-100 text-green-800',
    bad: 'bg-red-100 text-red-800',
    neutral: 'bg-gray-100 text-gray-800'
  };

  return (
    <div className={`p-4 rounded-lg shadow ${loading ? 'bg-gray-100' : statusColors[status]}`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      {loading ? (
        <div className="animate-pulse flex space-x-4">
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        </div>
      ) : (
        <p className="text-xl font-bold">{value}</p>
      )}
    </div>
  );
}

export default StatusIndicator;