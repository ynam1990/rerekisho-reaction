#!/bin/bash
set -euo pipefail

# EC2リージョンを取得
TOKEN="$(curl -sS -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")"
CURRENT_REGION="$(curl -s -H "X-aws-ec2-metadata-token: $TOKEN" http://169.254.169.254/latest/meta-data/placement/region)"

# SSMパラメータを取得
DOMAIN="$(aws ssm get-parameter \
  --region "$CURRENT_REGION" \
  --name "/RerekishoReaction/RecordName" \
  --query 'Parameter.Value' \
  --with-decryption \
  --output text)"
LIVE_DIR_PATH="/etc/letsencrypt/live/${DOMAIN}"
FULLCHAIN="${LIVE_DIR_PATH}/fullchain.pem"
PRIVKEY="${LIVE_DIR_PATH}/privkey.pem"

# 証明書の存在確認
if [ -s "${FULLCHAIN}" ] && [ -s "${PRIVKEY}" ]; then
  # 既に証明書取得済みの場合はスキップ
  echo "Let's Encrypt cert already exists. Skip certbot."
else
  # Let's Encryptの実行
  echo "Let's Encrypt cert not found. Run certbot."

  DEV_EMAIL="$(aws ssm get-parameter \
    --region "$CURRENT_REGION" \
    --name "/RerekishoReaction/DevEmail" \
    --query 'Parameter.Value' \
    --with-decryption \
    --output text)"
  
  # 初回実行時には証明書がないため、ssl無しの状態でNginxを起動し、証明書取得後にNginxを再起動します
  # /etc/nginx/conf.d/app.conf.withoutssl
  # /etc/nginx/conf.d/app.conf.withssl
  systemctl stop nginx

  CONF="/etc/nginx/conf.d/app.conf"
  BACKUP="/etc/nginx/conf.d/app.conf.$(date +%Y%m%d-%H%M%S)"

  if [ -f "$CONF" ]; then
    mv "$CONF" "$BACKUP"
  fi

  # 80番のみの一時的なapp.conf
  cp /etc/nginx/conf.d/app.conf.withoutssl /etc/nginx/conf.d/app.conf
  systemctl start nginx
  certbot certonly \
    --webroot \
    -w "/var/www/certbot" \
    -d "${DOMAIN}" \
    --agree-tos \
    -m "${DEV_EMAIL}" \
    --non-interactive
  
  # 恐らくcronは自動的に設定される？
  # echo '0 */12 * * * root certbot renew -q' > /etc/cron.d/certbot
  # chmod 644 /etc/cron.d/certbot

  # 443番を証明書を使って待受け開始
  systemctl stop nginx
  rm -f /etc/nginx/conf.d/app.conf
  cp /etc/nginx/conf.d/app.conf.withssl /etc/nginx/conf.d/app.conf
  systemctl start nginx
fi
