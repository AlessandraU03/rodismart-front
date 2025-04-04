import authApi from '../datasources/AuthAPI.JSX';
import { UserModel } from '../../domain/models/UserModel';

const authRepository = {
  login: async (correo, contrasena) => {
    try {
      const data = await authApi.login(correo, contrasena);
      return new UserModel(data.token, data.userType, data.expiresAt);
    } catch (error) {
      throw new Error('Error al iniciar sesión: ' + error.message);
    }
  }
};

export default authRepository;
