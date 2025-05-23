import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../core/context/AuthContext';

function Header() {
  const { user, logout } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsModalOpen(false);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <header className="bg-[#B4825A] text-white p-4 shadow-md fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="w-9 h-8 mr-2" />
          <h1 className="text-xl font-semibold">RodiSmart</h1>
        </div>

        <nav className="flex space-x-6">
          {!user && <Link to="/login" className="hover:text-gray-300">Sign In</Link>}
          
          {user && (
            <>
              <div className="relative cursor-pointer" onClick={toggleModal}>
                <img
                  src="/usuario.png"
                  alt="Avatar"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              </div>

              {isModalOpen && (
                <div className="absolute top-16 right-0 bg-white text-gray-800 p-4 rounded-md shadow-lg">
                  <button className="block hover:text-gray-500" onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </div>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
