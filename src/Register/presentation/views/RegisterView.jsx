import React from "react";
import useRegisterViewModel from "../viewModels/RegisterViewModel";

function RegisterView() {
  const {
    formData,
    loading,
    error,
    handleInputChange,
    handleSubmit,
  } = useRegisterViewModel();

  return (
    <div className="w-full max-w-md mx-auto p-6">
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
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="tipo">
            Tipo
          </label>
          <select
            id="tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Selecciona el tipo</option>
            <option value="usuario">Cliente</option>
            <option value="administrador">Administrador</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md"
          disabled={loading}
        >
          {loading ? "Registrando..." : "Registrar"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default RegisterView;
