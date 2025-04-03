import { onMessage } from "firebase/messaging";
import { messaging } from "./FirebaseConfig";

onMessage(messaging, (payload) => {
  console.log("Notificación recibida: ", payload);
  alert(`Mensaje: ${payload.notification.title}`);
});