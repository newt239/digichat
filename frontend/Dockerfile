FROM node:22-slim
ENV TZ=Asia/Tokyo

WORKDIR /app

RUN npm install -g pnpm

COPY ./package.json ./package.json

RUN pnpm install

COPY . .

# 開発環境に必要なポートを公開
EXPOSE 5173

# 開発用コマンドを実行
CMD ["pnpm", "dev", "--host"]
