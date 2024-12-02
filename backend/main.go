package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/newt239/digichat/domains"
	"github.com/newt239/digichat/handlers"
)

func main() {
hub := domains.NewHub()
	go hub.RunLoop()

	e := echo.New()

	e.GET("/ws", func(c echo.Context) error {
		handler := handlers.NewWebsocketHandler(hub)
		handler.Handle(c.Response(), c.Request())
		return nil
	})

	// ルートエンドポイント
	e.GET("/", func(c echo.Context) error {
		return c.JSON(http.StatusOK, map[string]string{"message": "Hello, aaa!"})
	})

	// APIサーバーをポート8080で起動
	e.Logger.Fatal(e.Start(":8080"))
}
