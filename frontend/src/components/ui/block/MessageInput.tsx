import { messageAtom, messagesAtom } from "#/utils/messages";
import { Box, Button, Textarea } from "@mantine/core";
import { useAtom } from "jotai";
import React, { useEffect, useRef } from "react";

import styles from "./MessageInput.module.css";

export const MessageInput: React.FC = () => {
  const [message, setMessage] = useAtom(messageAtom);
  const [, setMessages] = useAtom(messagesAtom);
  const socketRef = useRef<WebSocket | null>(null);

  // WebSocketの接続を管理
  useEffect(() => {
    const connectToRoom = () => {
      const socket = new WebSocket(`ws://localhost:8080/ws?room=general`);
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
    <Box pos="relative">
      <Textarea
        placeholder="Type a message"
        value={message}
        autosize
        minRows={3}
        onChange={(e) => setMessage(e.target.value)}
        classNames={{
          wrapper: styles.wrapper,
          input: styles.input,
        }}
      />
      <Button
        size="xs"
        pos="absolute"
        bottom={4}
        right={4}
        onClick={sendMessage}
      >
        Send
      </Button>
    </Box>
  );
};
