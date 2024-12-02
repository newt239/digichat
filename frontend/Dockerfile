# ベースイメージ
FROM node:22 AS build

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとlockファイルをコピー
COPY package.json pnpm-lock.yaml ./

# 依存関係をインストール
RUN pnpm install

# ソースコードをコピー
COPY . .

# アプリをビルド
RUN pnpm run build

# ランタイムイメージ
FROM nginx:alpine

# Nginxのデフォルト設定を削除してビルドされたファイルをコピー
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html

# コンテナが使用するポート
EXPOSE 80

# Nginxを起動
CMD ["nginx", "-g", "daemon off;"]
