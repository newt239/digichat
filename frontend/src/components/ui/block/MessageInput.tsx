import { messageAtom, messagesAtom } from "#/utils/messages";
import { useAtom } from "jotai";
import React, { useEffect, useRef } from "react";

export const MessageInput: React.FC = () => {
  const [message, setMessage] = useAtom(messageAtom);
  const [, setMessages] = useAtom(messagesAtom);
  const socketRef = useRef<WebSocket | null>(null);

  // WebSocketの接続を管理
  useEffect(() => {
    const connectToRoom = () => {
      const socket = new WebSocket(`http://localhost:8080/ws?room=general`);
      socketRef.current = socket;

      socket.onopen = () => {
        console.log(`Connected to room: general`);
        addMessage(`Connected to room: general`);
      };

      socket.onmessage = (event) => {
        addMessage(`Received: ${event.data}`);
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        addMessage("WebSocket error occurred.");
      };

      socket.onclose = () => {
        console.log("Connection closed");
        addMessage("Connection closed.");
      };
    };

    connectToRoom();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const sendMessage = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
      addMessage(`You: ${message}`);
      setMessage("");
    }
  };

  const addMessage = (newMessage: string) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};
