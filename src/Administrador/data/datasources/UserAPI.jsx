const API_URL = "http://localhost:8080/users"; // URL de la API

const UserAPI = {
  // Obtener todos los usuarios
  async fetchAllUsers() {
    const token = sessionStorage.getItem("token");
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Agregar el token al encabezado
      },
    });
    const data = await response.json();
    console.log("Datos recibidos del backend:", data); // Ver estructura real
    return data;
  },
  

  // Obtener un usuario por ID
  async fetchUserById(id) {
    const token = sessionStorage.getItem("token");

    if (!token) {
      console.error("Error: No se encontró un token en sessionStorage.");
      return null; // Retorna null si no hay token
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        throw new Error("No autorizado. Verifica tu token.");
      }

      if (!response.ok) {
        throw new Error(`Error al obtener el usuario: ${response.statusText}`);
      }

      return await response.json(); // Retorna el usuario
    } catch (error) {
      console.error("Error en la API de usuario:", error.message);
      return null;
    }
  },
};

export default UserAPI;
