#!/usr/bin/env bash
set -euo pipefail

# ディレクトリのパス確認
cd "$(dirname "$0")/../../"
ROOT_DIR="$(pwd)"
TEMP_DIR="$ROOT_DIR/.temp"
REVISION_ZIP="$ROOT_DIR/revision.zip"
SERVER_DIR="$ROOT_DIR/app/server"
CLIENT_DIR="$ROOT_DIR/app/client"
CODEDEPLOY_DIR="$ROOT_DIR/app/codedeploy"
echo "[gen:revision] root: $ROOT_DIR"

# 一時ディレクトリの作成
rm -rf "$TEMP_DIR"
mkdir -p "$TEMP_DIR/app"
mkdir -p "$TEMP_DIR/app/prisma"

# サーバー側ファイルのコピー
rsync -a "$SERVER_DIR/dist/" "$TEMP_DIR/app/"
rsync -a "$SERVER_DIR/prisma/" "$TEMP_DIR/app/prisma/"
rsync -a "$SERVER_DIR/prisma.config.ts" "$TEMP_DIR/app/"
rsync -a "$SERVER_DIR/package.json" "$TEMP_DIR/app/"

# package-lock.jsonを生成します
(
  cd "$TEMP_DIR/app"
  npm install --package-lock-only --omit=dev
)

# クライアント側ファイルのコピー
mkdir -p "$TEMP_DIR/app/public"
rsync -a "$CLIENT_DIR/dist/" "$TEMP_DIR/app/public/"

# codedeploy用ファイルのコピー
rsync -a \
  --exclude 'gen_revision.sh' \
  "$CODEDEPLOY_DIR/" "$TEMP_DIR/"

# systemd用のスタートスクリプトのコピー
rsync -a "$SERVER_DIR/server_start.sh" "$TEMP_DIR/"

# zipファイルの作成
rm -f "$REVISION_ZIP"
(
  cd "$TEMP_DIR"
  zip -r "$REVISION_ZIP" .
)
echo "[gen:revision] created: $REVISION_ZIP"
