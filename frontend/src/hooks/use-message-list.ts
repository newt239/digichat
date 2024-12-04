import { useAtom } from "jotai";
import { useEffect } from "react";
import { Message } from "../types/message";
import { messageListAtom } from "../utils/messages";
import { websocketAtom } from "../utils/websocket";

export const useMessageList = (): Message[] => {
  const [socket] = useAtom(websocketAtom);
  const [messageList, setMessageList] = useAtom(messageListAtom);

  useEffect(() => {
    if (!socket) return;

    // Handle incoming WebSocket messages
    socket.onmessage = (msg) => {
      const content = JSON.parse(msg.data as string);
      const message: Message = { content };
      setMessageList((prevMessages) => [...prevMessages, message]);
    };

    // Cleanup WebSocket event listener on unmount
    return () => {
      socket.onmessage = () => {};
    };
  }, [socket, setMessageList]);

  return messageList;
};
