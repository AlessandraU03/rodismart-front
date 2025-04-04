export function getUserIdFromToken(token) {
    try {
      if (!token) throw new Error("No token provided");
      
      const payload = JSON.parse(atob(token.split('.')[1]));
      const user_id = payload.user_id || payload.id || payload.sub || payload.iduser;
      
      if (!user_id) throw new Error("Token no contiene user_id");
      return user_id;
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      throw error;
    }
  }