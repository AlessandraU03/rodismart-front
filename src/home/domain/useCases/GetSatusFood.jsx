import FoodRepository from "../../data/repositories/FoodRepository";
import CageAPI from "../../../Administrador/data/datasources/CageApi";

async function GetStatusFood() {
  try {
    // 1️⃣ Obtener el token desde sessionStorage o localStorage
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
    if (!token) {
      console.error("❌ No se encontró un token de sesión.");
      return { alimento: false, porcentaje: 0 };
    }

    // 2️⃣ Obtén la lista de jaulas del usuario
    const jaulas = await CageAPI.getCagesByUser(token);
    
    if (!jaulas || jaulas.length === 0) {
      console.warn("⚠️ No se encontraron jaulas para este usuario.");
      return { alimento: false, porcentaje: 0 };
    }

    // 3️⃣ Extrae el ID de la primera jaula disponible
    const idjaula = jaulas[0].id;
    console.log("🆔 ID de jaula obtenida:", idjaula);

    // 4️⃣ Llamar al repositorio con el ID de jaula obtenido
    return await FoodRepository.getFoodStatus(idjaula);

  } catch (error) {
    console.error("❌ Error en GetStatusFood:", error);
    return { alimento: false, porcentaje: 0 };
  }
}

export default GetStatusFood;
