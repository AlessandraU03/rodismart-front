const API_URL = "http://localhost:8080/admin/cages";
const API_URL_USER = "http://localhost:8080/cages";

const CageAPI = {
  async fetchAllCages(token) {
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (response.status === 401) {
        throw new Error("No autorizado. Verifica tu token.");
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al obtener las jaulas: ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error en fetchAllCages:", error);
      throw error;
    }
  },

  async updateCage(idjaula, idusuario, nombre_hamster, token) {
    try {
      const response = await fetch(`${API_URL}/${idjaula}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          idjaula,
          idusuario,
          nombre_hamster
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al actualizar: ${errorText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error en updateCage:", error);
      throw error;
    }
  },

  async getCagesByUser(token) {
    try {
      // Extraer el user_id del token - versión mejorada
      const payload = JSON.parse(atob(token.split('.')[1]));
      const user_id = payload.user_id || payload.id || payload.sub || payload.iduser;
      
      if (!user_id) {
        throw new Error("El token no contiene un ID de usuario válido");
      }

      console.log(`[API] Obteniendo jaulas para usuario ID: ${user_id}`);
      const response = await fetch(`${API_URL_USER}/user/${user_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      console.log("[API] Estado de respuesta:", response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("[API] Error del servidor:", errorData);
        
        if (response.status === 401) {
          throw new Error("Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.");
        }
        if (response.status === 404) {
          return []; // Retorna array vacío si no encuentra jaulas
        }
        
        throw new Error(errorData.message || `Error ${response.status}`);
      }

      const data = await response.json();
      console.log("[API] Datos recibidos:", data);
      return data.data || data;
    } catch (error) {
      console.error("[API] Error en la solicitud:", error);
      throw error;
    }
  },

  async getCageById(idjaula,  token) {
    try {
      const response = await fetch(`${API_URL_USER}/${idjaula}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          idjaula,
          idusuario,
          nombre_hamster
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al actualizar: ${errorText}`);
      }
      
      const data = await response.json();
      console.log("[API] Datos recibidos por ID:", data);
      return data.data || data;
    } catch (error) {
      console.error("Error en updateCage:", error);
      throw error;
    }
  },

};

export default CageAPI;