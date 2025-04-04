import UserRepository from "../../data/repositories/UserRepository";

async function registerUserUseCase(formData) {
  const user = {
    nombre: formData.nombre,
    correo: formData.correo,
    contrasena: formData.contrasena,
    tipo: formData.tipo,
  };

  try {
    const response = await UserRepository.createUser(user);
    return response;
  } catch (error) {
    throw new Error("Error al registrar usuario: " + error.message);
  }
}

export default registerUserUseCase;
