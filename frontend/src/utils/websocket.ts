import { atom } from "jotai";
import * as WebSocket from "websocket";

const connect = (): Promise<WebSocket.w3cwebsocket> => {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket.w3cwebsocket(
      "http://localhost:8080/ws?room=1"
    );
    socket.onopen = () => {
      console.log("connected");
      resolve(socket);
    };
    socket.onclose = () => {
      console.log("reconnecting...");
      connect();
    };
    socket.onerror = (err) => {
      console.log("connection error:", err);
      reject(err);
    };
  });
};

export const websocketAtom = atom<WebSocket.w3cwebsocket | null>(null);

export const websocketConnectionAtom = atom(async (get) => {
  const socket = await connect();
  get(websocketAtom);
  return socket;
});
