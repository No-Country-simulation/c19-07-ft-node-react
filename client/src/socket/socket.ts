import { io } from "socket.io-client";

const URL = import.meta.env.VITE_API_URL_SOCKET;

export const socket = io(URL, {
  transports: ["websocket", "polling"],
  autoConnect: true,
});
