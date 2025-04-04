import React, { useState } from "react";
import UsersView from "./UserView";
import CageView from "./CageView";

const AdminDashboard = () => {
  const [view, setView] = useState("users");

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Panel de Administrador</h1>

      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setView("users")}
          className={`px-4 py-2 rounded ${view === "users" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
        >
          Usuarios
        </button>
        <button
          onClick={() => setView("cages")}
          className={`px-4 py-2 rounded ${view === "cages" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
        >
          Jaulas
        </button>
      </div>

      {view === "users" && <UsersView />}
      {view === "cages" && <CageView/>}
    </div>
  );
};

export default AdminDashboard;
