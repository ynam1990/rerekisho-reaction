#!/bin/bash
set -euo pipefail

APP_DIR="/var/rerekisho_reaction_app/app"
ENV_FILE_PATH="${APP_DIR}/.env"
SSM_PATH="/RerekishoReaction/"
MAX_PAGES_LIMIT=10

# EC2リージョンを取得
TOKEN="$(curl -sS -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")"
CURRENT_REGION="$(curl -s -H "X-aws-ec2-metadata-token: $TOKEN" http://169.254.169.254/latest/meta-data/placement/region)"

# 一時ファイル生成
TMP_ENV="$(mktemp)"
chmod 600 "$TMP_ENV"
cleanup() {
  rm -f "$TMP_ENV"
}
trap cleanup EXIT

# ヘッダーコメント
{
  echo "# Generated from SSM Parameter Store"
  echo "# Path: ${SSM_PATH}"
  echo "# Region: ${CURRENT_REGION}"
  echo "# Generated at (UTC): $(date -u +"%Y-%m-%dT%H:%M:%SZ")"
  echo
} > "$TMP_ENV"

# SSMから取得
fetch_ssm_page() {
  local token="${1:-}"

  local -a cmd=(
    aws ssm get-parameters-by-path
    --region "$CURRENT_REGION"
    --path "$SSM_PATH"
    --recursive
    --with-decryption
    # [hold] 下を指定すると--no-paginateと競合とのエラーが発生する？
    # --max-results 10
    --output json
  )

  if [[ -n "$token" ]]; then
    cmd+=( --starting-token "$token" )
  fi

  "${cmd[@]}"
}

# Parametersを分解
append_env_from_resp() {
  local resp="$1"

  jq -r '
    (.Parameters // [])[]
    | (.Name | split("/") | last) as $key
    | (.Value) as $val
    | "\($key)=\"\($val)\""
  ' <<< "$resp" >> "$TMP_ENV"
}

# 次ページのトークンの取り出し
next_token_from_resp() {
  local resp="$1"
  jq -r '.NextToken // empty' <<< "$resp"
}

# 全てのパラメータを取得するまで繰り返し
page=0
token=""
while :; do
  # 無限ループ阻止
  page=$((page + 1))
  if (( page > MAX_PAGES_LIMIT )); then
    echo "Reached max pagination limit (${MAX_PAGES_LIMIT}). Aborting."
    break
  fi

  resp="$(fetch_ssm_page "$token")"

  append_env_from_resp "$resp"

  token="$(next_token_from_resp "$resp")"
  [[ -z "$token" ]] && break
done

# 書き出し
install -m 600 -o "root" -g "root" "$TMP_ENV" "$ENV_FILE_PATH"
echo "Wrote .env file to ${ENV_FILE_PATH}"