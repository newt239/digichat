# ベースイメージ
FROM golang:1.23 AS base

# 作業ディレクトリを設定
WORKDIR /app

# Airをインストール
RUN go install github.com/air-verse/air@latest

# 必要なファイルをコピー
COPY go.mod go.sum ./
RUN go mod download

# ソースコードをコピー
COPY . .

# 開発環境に必要なポートを公開
EXPOSE 8080

# Airを使って開発モードで実行
CMD ["air"]
