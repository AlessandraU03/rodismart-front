import UserAPI from "../datasources/UserAPI";

const UserRepository = {
  async getAllUsers(token) {
    try {
      const response = await UserAPI.fetchAllUsers(token);
      // Mapear los datos para estandarizar el nombre del campo ID
      return response.map(user => ({
        idusuario: user.iduser,  // Convertir iduser a idusuario
        nombre: user.nombre,
        correo: user.correo
      }));
    } catch (error) {
      console.error("Error en UserRepository:", error);
      return [];
    }
  }
};


export default UserRepository;