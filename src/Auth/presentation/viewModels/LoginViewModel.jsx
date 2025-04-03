import { useState, useContext } from 'react';
import { AuthContext } from '../../../core/context/AuthContext'; // Reemplaza el path si es necesario
import loginUseCase from '../../domain/useCases/LoginUseCase'; // Reemplaza con el path correcto
import { useNavigate } from 'react-router-dom';

function useLoginViewModel () {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Llama al caso de uso de login
      const user = await loginUseCase(correo, contrasena);
      login(user); // Guarda al usuario en el contexto
      navigate('/dashboard'); // Redirige a Dashboard después del login
    } catch (error) {
      alert(error.message); // Muestra error si el login falla
    }
  };

  return {
    correo, setCorreo, contrasena, setContrasena, handleLogin
  };
}

export default useLoginViewModel;
