const API_URL = "http://localhost:8080/users";

const UserAPI = {
  async createUser(user) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error(`Error al crear usuario: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error en la API de usuarios:", error.message);
      return null;
    }
  },
};

export default UserAPI;
