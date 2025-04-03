import React from 'react';
import useLoginViewModel from '../viewModels/LoginViewModel';// Asegúrate de que el path sea correcto

function LoginView() {
  const { correo, setCorreo, contrasena, setContrasena, handleLogin } = useLoginViewModel();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Iniciar Sesión</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="bg-white p-6 shadow-md rounded-lg">
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          className="border p-2 w-full mb-2"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <input
          type="password"
          name="contrasena"
          placeholder="Contraseña"
          className="border p-2 w-full mb-4"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default LoginView;
