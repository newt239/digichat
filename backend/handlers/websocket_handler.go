package handlers

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/newt239/digichat/domains"
)

type WebsocketHandler struct {
	hub *domains.Hub
}

func NewWebsocketHandler(hub *domains.Hub) *WebsocketHandler {
	return &WebsocketHandler{
		hub: hub,
	}
}

func (h *WebsocketHandler) Handle(w http.ResponseWriter, r *http.Request) {
	upgrader := &websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
	_, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatal(err)
	}
}
