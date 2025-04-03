import { messaging } from "../../data/datasources/FirebaseConfig";
import { getToken } from "firebase/messaging";

export async function getFCMToken() {
  try {
    const token = await getToken(messaging, { vapidKey: "TU_VAPID_KEY" });
    console.log("Token de FCM obtenido:", token);
    return token;
  } catch (error) {
    console.error("Error al obtener el token de FCM:", error);
    return null;
  }
}
