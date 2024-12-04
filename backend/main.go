package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
)

// WebSocket接続の管理
type Client struct {
	conn *websocket.Conn
	room string
}

type Server struct {
	clients map[*Client]bool
	rooms   map[string]map[*Client]bool
}

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

var server = Server{
	clients: make(map[*Client]bool),
	rooms:   make(map[string]map[*Client]bool),
}

func handleWebSocket(c echo.Context) error {
	// クエリパラメータでルーム名を受け取る
	room := c.QueryParam("room")
	if room == "" {
		return c.JSON(http.StatusBadRequest, "Room is required")
	}

	// WebSocket接続をアップグレード
	conn, err := upgrader.Upgrade(c.Response(), c.Request(), nil)
	if err != nil {
		return err
	}
	defer conn.Close()

	// 新しいクライアントを作成
	client := &Client{conn: conn, room: room}

	// サーバーにクライアントを追加
	if server.rooms[room] == nil {
		server.rooms[room] = make(map[*Client]bool)
	}
	server.rooms[room][client] = true
	server.clients[client] = true

	// ルームに参加したことを通知
	for otherClient := range server.rooms[room] {
		if otherClient != client {
			otherClient.conn.WriteMessage(websocket.TextMessage, []byte(fmt.Sprintf("%s has joined the room", room)))
		}
	}

	// メッセージの送受信ループ
	for {
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			log.Println("Error reading message:", err)
			break
		}

		// ルーム内の他のクライアントにメッセージを送信
		for otherClient := range server.rooms[room] {
			if otherClient != client {
				if err := otherClient.conn.WriteMessage(messageType, p); err != nil {
					log.Println("Error writing message:", err)
				}
			}
		}
	}

	// クライアントが接続を終了した場合
	delete(server.rooms[room], client)
	delete(server.clients, client)

	// ルームからクライアントが退出したことを通知
	for otherClient := range server.rooms[room] {
		if otherClient != client {
			otherClient.conn.WriteMessage(websocket.TextMessage, []byte(fmt.Sprintf("%s has left the room", room)))
		}
	}

	return nil
}

func main() {
	// Echoインスタンスを作成
	e := echo.New()

	// WebSocket接続のハンドラーを設定
	e.GET("/ws", handleWebSocket)

	// サーバーを起動
	e.Logger.Fatal(e.Start(":8080"))
}
