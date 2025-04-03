import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../core/context/AuthContext';

function HomeView() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(user.userType === 'admin' ? '/dashboard' : '/');
    }
  }, [user, navigate]);

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      {/* Contenedor con imagen a la izquierda y texto a la derecha */}
      <section className="bg-[#FFE6C8] text-white w-full max-w-6xl p-8 flex items-center justify-between rounded-xl">
        {/* Columna de imagen */}
        <div className="w-1/2 pr-8">
          <img 
            src="/rodi.png"
            alt="Imagen de bienvenida"
            className="w-100 h-100"
          />
        </div>

        {/* Columna de información */}
        <div className="w-1/2 pl-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">Bienvenido a Hámster Monitor</h1>
          <p className="text-xl sm:text-2xl mb-6">
            Sabemos lo crucial que es el bienestar de tu mascota, y por eso hemos diseñado un sistema que te facilita cuidarla de forma sencilla y efectiva...
          </p>
            <Link to="/login" className="bg-yellow-500 text-black py-2 px-6 rounded-full hover:bg-yellow-400">
              Iniciar sesión
            </Link>
        </div>
      </section>
    </div>
  );
}

export default HomeView;
