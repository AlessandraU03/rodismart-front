import React from "react";

const CageCard = ({ title, children }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 border border-gray-200">
      {title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}
      <div>{children}</div>
    </div>
  );
};

export default CageCard;
