import React, { useEffect, useRef, useState } from "react";

export const MessageInput: React.FC = () => {
  const [room, setRoom] = useState<string>("general");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  // WebSocketの接続を管理
  useEffect(() => {
    // WebSocketを初期化
    const connectToRoom = () => {
      const socket = new WebSocket(`http://localhost:8080/ws?room=${room}`);
      socketRef.current = socket;

      // 接続確立時
      socket.onopen = () => {
        console.log(`Connected to room: ${room}`);
        addMessage(`Connected to room: ${room}`);
      };

      // メッセージ受信時
      socket.onmessage = (event) => {
        addMessage(`Received: ${event.data}`);
      };

      // エラー発生時
      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        addMessage("WebSocket error occurred.");
      };

      // 接続が閉じられたとき
      socket.onclose = () => {
        console.log("Connection closed");
        addMessage("Connection closed.");
      };
    };

    // 初回接続
    connectToRoom();

    // クリーンアップ処理
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [room]); // ルームが変更されたら再接続

  // メッセージを送信
  const sendMessage = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
      addMessage(`You: ${message}`);
      setMessage("");
    }
  };

  // メッセージを追加
  const addMessage = (newMessage: string) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>WebSocket Room Test</h2>
      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="room">Room: </label>
        <input
          id="room"
          type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        <h3>Messages:</h3>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
