import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../core/context/AuthContext';

function Header() {
  const { user, logout } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    logout();  // Llamar al método de logout del contexto
    setIsModalOpen(false);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <header className="bg-[#B4825A] text-white p-4 shadow-md fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-9 h-8 mr-2"
          />
          <h1 className="text-xl font-semibold">RodiSmart</h1>
        </div>
        <nav className="flex space-x-6">
          <Link to="/login" className="hover:text-gray-300">Sing In</Link>
          <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
          {user ? (
            <>
              {/* Logo de perfil */}
              <div className="relative cursor-pointer" onClick={toggleModal}>
                <img
                  src="/profile-avatar.png" // Coloca aquí la imagen de perfil del usuario
                  alt="Avatar"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              </div>
              {isModalOpen && (
                <div className="absolute top-16 right-0 bg-white hover:text-gray-300 p-4 rounded-md shadow-lg">
                  <button className="block mb-2 text-bg-gray" onClick={() => alert('Ver perfil')}>
                    Ver perfil
                  </button>
                  <button className="block" onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link to="/login" className="hover:text-gray-300">Iniciar sesión</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
