FROM golang:1.23 AS base
ENV TZ=Asia/Tokyo

WORKDIR /app

# HMRとしてAirをインストール
RUN go install github.com/air-verse/air@latest

COPY go.mod go.sum .air.toml ./
RUN go mod download

# ソースコードをコピー
COPY . .

# 開発環境に必要なポートを公開
EXPOSE 8080

# Airを使って開発モードで実行
CMD ["air"]
