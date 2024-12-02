# ベースイメージ
FROM golang:1.21 AS build

# 作業ディレクトリを設定
WORKDIR /app

# Goモジュールファイルをコピー
COPY go.mod go.sum ./

# 依存関係をダウンロード
RUN go mod download

# ソースコードをコピー
COPY . .

# バイナリをビルド
RUN go build -o main .

# ランタイムイメージ
FROM alpine:latest

# 必要なライブラリをインストール
RUN apk --no-cache add ca-certificates

# バイナリをコピー
COPY --from=build /app/main /app/main

# 作業ディレクトリを設定
WORKDIR /app

# コンテナが使用するポート
EXPOSE 8080

# アプリを起動
CMD ["./main"]
