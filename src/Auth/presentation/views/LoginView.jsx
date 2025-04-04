import React from 'react';
import useLoginViewModel from '../viewModels/LoginViewModel';
import Header from "../../../home/presentation/views/HeaderView";

function LoginView() {
  const { correo, setCorreo, contrasena, setContrasena, handleLogin } = useLoginViewModel();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Header></Header>
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className= "bg-[#FFE6C8] p-6 rounded-lg shadow-lg w-80">
      <div className="flex justify-center mb-4">
        <img src="/logo.png" alt="Hamster" className="w-20 h-16" />
      </div>
      <label className="block text-sm font-medium mb-1" htmlFor="correo">
            Usuario
          </label>
        <input
          type="text"
          name="correo"
          placeholder="Correo"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />

          <label className="block text-sm font-medium mb-1" htmlFor="contrasena">
            Contraseña
          </label>
        <input
          type="password"
          name="contrasena"
          placeholder="Contraseña"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />
        <button type="submit" className="w-full py-2 mt-4 bg-white text-black rounded-md">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default LoginView;
