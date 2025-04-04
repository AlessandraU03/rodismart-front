import React from "react";
import useRegisterViewModel from "../viewModels/RegisterViewModel";
import Header from "../../../home/presentation/views/HeaderView";

function RegisterView() {
  const {
    formData,
    loading,
    error,
    handleInputChange,
    handleSubmit,
  } = useRegisterViewModel();

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <Header></Header>
    <div className="bg-[#FFE6C8] p-6 rounded-lg shadow-lg w-80">
      <div className="flex justify-center mb-4">
        <img src="/logo.png" alt="Hamster" className="w-20 h-16" />
      </div>
      <h2 className="text-xl font-bold mb-4">Registro de Usuario</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="nombre">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="correo">
            Correo
          </label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="contrasena">
            Contraseña
          </label>
          <input
            type="password"
            id="contrasena"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 mt-4 bg-white text-black rounded-md"
          disabled={loading}
        >
          {loading ? "Registrando..." : "Registrar"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
    </div>
  );
}

export default RegisterView;
