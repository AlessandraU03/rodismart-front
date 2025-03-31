import React from "react";

function ClimateCard({ title, value }) {
  return (
    <div className="bg-blue-500 text-white p-6 rounded-xl shadow-md flex flex-col items-center">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

export default ClimateCard;