FROM node:22-slim

# 作業ディレクトリを設定
WORKDIR /app

# pnpmをインストール
RUN npm install -g pnpm

# package.jsonをコピー
COPY ./package.json ./package.json

# 依存関係をインストール
RUN pnpm install

# ソースコードをコピー
COPY . .

# 開発環境に必要なポートを公開
EXPOSE 5173

# 開発用コマンドを実行
CMD ["pnpm", "dev", "--host"]
