import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = import.meta.env.VITE_API_URL_SOCKET;

// export const socket = io(URL, {
//     autoConnect: true,
//   });

export const socket = io(URL, {
  transports: ["websocket", "polling"], // Intenta usar ambos transportes
  autoConnect: true,
});
