import { getMessaging, getToken, onMessage } from "firebase/messaging";
import app from "./FirebaseConfig";

const messaging = getMessaging(app);

export const requestFCMToken = async () => {
  try {
    const token = await getToken(messaging, { vapidKey: "TU_VAPID_KEY" });
    return token;
  } catch (error) {
    console.error("Error obteniendo el token de FCM", error);
    return null;
  }
};

onMessage(messaging, (payload) => {
  console.log("Notificación recibida:", payload);
  alert(`Notificación: ${payload.notification.title}`);
});
