import { useState, useContext } from 'react';
import { AuthContext } from '../../../core/context/AuthContext';
import authRepository from '../../data/repositories/AuthRepository';
import { useNavigate } from 'react-router-dom';

function useLoginViewModel() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await authRepository.login(correo, contrasena);
      login({ token: user.token, userType: user.userType, expiresAt: user.expiresAt });

      if (user.userType === "administrador") {
        navigate("/admin-dashboard");
      } else {
        navigate("/usuario-dashboard");
      }

    } catch (error) {
      alert(error.message);
    }
  };

  return {
    correo,
    setCorreo,
    contrasena,
    setContrasena,
    handleLogin,
  };
}

export default useLoginViewModel;
