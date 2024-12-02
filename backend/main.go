package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	// ルートエンドポイント
	e.GET("/", func(c echo.Context) error {
		return c.JSON(http.StatusOK, map[string]string{"message": "Hello, aaa!"})
	})

	// APIサーバーをポート8080で起動
	e.Logger.Fatal(e.Start(":8080"))
}
