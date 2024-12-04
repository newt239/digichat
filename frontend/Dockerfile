FROM node:22-slim
ENV TZ=Asia/Tokyo

# Python をインストール
RUN apt-get update && apt-get install -y python3 python3-dev python3-pip

WORKDIR /app

RUN npm install -g pnpm

COPY ./package.json ./package.json

RUN pnpm store prune

RUN pnpm install

COPY . .

# 開発環境に必要なポートを公開
EXPOSE 5173

# 開発用コマンドを実行
CMD ["pnpm", "dev", "--host"]
