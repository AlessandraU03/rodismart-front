import authApi from '../datasources/AuthAPI.JSX';// Aquí va la importación de la API para login
import { UserModel } from '../../domain/models/UserModel'; // Asegúrate de que el modelo esté correctamente configurado

const authRepository = {
  login: async (correo, contrasena) => {
    try {
      // Llama a la API para obtener la respuesta de login
      const data = await authApi.login(correo, contrasena);
      
      // Convierte los datos recibidos en un modelo UserModel
      return new UserModel(data.id, data.correo, data.userType, data.token);
    } catch (error) {
      throw new Error('Error al iniciar sesión: ' + error.message);
    }
  }
};

export default authRepository;
