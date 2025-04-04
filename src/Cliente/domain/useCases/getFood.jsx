import CageAPI from '../../data/datasources/CageApi';
import FoodAPI from '../../../home/data/datasources/FoodAPI';

async function getFood() {
  try {
    // 1️⃣ Obtener el token desde sessionStorage o localStorage
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
    if (!token) {
      console.error("❌ No se encontró un token de sesión.");
      return;
    }

    // 2️⃣ Obtén la lista de jaulas del usuario
    const jaulas = await CageAPI.getCagesByUser(token);
    
    if (!jaulas || jaulas.length === 0) {
      console.warn("⚠️ No se encontraron jaulas para este usuario.");
      return;
    }

    // 3️⃣ Extrae el ID de la primera jaula disponible
    const idjaula = jaulas[0].id; // Ajusta según la estructura de tus datos
    console.log("🆔 ID de jaula obtenida:", idjaula);

    // 4️⃣ Usa el `idjaula` en `FoodAPI`
    const estadoAlimento = await FoodAPI.fetchFoodStatus(idjaula);
    console.log("📊 Estado del alimento:", estadoAlimento);

  } catch (error) {
    console.error("❌ Error al obtener el estado del alimento:", error);
  }
}

// 🔥 Llamada a la función sin necesidad de pasar el token manualmente
getFood();
