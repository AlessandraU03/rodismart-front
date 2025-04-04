import CageAPI from "../datasources/CageApi";

const CageRepository = {
  async getAllCages(token) {
    return await CageAPI.fetchAllCages(token);
  },

  async updateCage(idjaula, idusuario, nombre_hamster, token) {
    return await CageAPI.updateCage(idjaula, idusuario, nombre_hamster, token);
  },
  async getCageById(idjaula, token) {
    return await CageAPI.getCageById(idjaula, token);
  },

  async getCagesByUser(token) {
    try {
      console.log("[Repository] Obteniendo jaulas para usuario...");
      const data = await CageAPI.getCagesByUser(token);
      
      if (!data) {
        console.warn("[Repository] No se recibieron datos");
        return [];
      }
      
      return data;
    } catch (error) {
      console.error("[Repository] Error al obtener jaulas:", error);
      throw error;
    }
  },

  async getCageById(idjaula, token) {
    throw new Error("Method not implemented");
  },

  async subscribeToCage(idjaula, callback) {
    throw new Error("Method not implemented");
  }
};

export default CageRepository;