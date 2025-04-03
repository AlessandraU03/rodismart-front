import authRepository from "../../data/repositories/AuthRepository";

const loginUseCase = async (correo, contrasena) => {
  try {
    // Llama al repositorio de autenticación para obtener el usuario
    const user = await authRepository.login(correo, contrasena);
    return user;
  } catch (error) {
    throw new Error('Login failed: ' + error.message);
  }
};

export default loginUseCase;
