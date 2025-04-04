import authApi from '../datasources/AuthAPI.JSX';
import { UserModel } from '../../domain/models/UserModel';
import Swal from 'sweetalert2';

const authRepository = {
  login: async (correo, contrasena) => {
    try {
      const data = await authApi.login(correo, contrasena);

      // Si `data` es null, retornamos null sin intentar acceder a `token`
      if (!data) {
        return null;
      }

      return new UserModel(data.token, data.userType, data.expiresAt);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error inesperado',
        text: 'Ocurrió un problema al iniciar sesión.',
        confirmButtonColor: '#d33'
      });
      return null;
    }
  }
};

export default authRepository;
