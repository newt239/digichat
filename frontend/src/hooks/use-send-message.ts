import { useAtom } from "jotai";
import { useCallback, useState } from "react";
import { websocketAtom } from "../utils/websocket";

export const useSendMessage = () => {
  const [socket] = useAtom(websocketAtom);
  const [input, setInput] = useState<string>("");

  const send = useCallback(() => {
    if (input.length === 0 || !socket) return;
    socket.send(JSON.stringify(input));
    setInput("");
  }, [input, socket]);

  return { input, setInput, send };
};
