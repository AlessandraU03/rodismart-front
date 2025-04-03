import { getMessaging, getToken, onMessage } from "firebase/messaging";
import app from "./FirebaseConfig";

const messaging = getMessaging(app);

// 🔹 Solicita el token FCM
export const requestFCMToken = async () => {
  try {
    const token = await getToken(messaging, { vapidKey: "TU_VAPID_KEY" });

    if (token) {
      console.log("FCM Token obtenido:", token);
      return token;
    } else {
      console.warn("No se pudo obtener el token FCM.");
      return null;
    }
  } catch (error) {
    console.error("Error obteniendo el token de FCM", error);
    return null;
  }
};

// 🔹 Escucha mensajes cuando la app está abierta
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("Mensaje recibido:", payload);
      alert(`Notificación: ${payload.notification?.title}`);
      resolve(payload);
    });
  });
