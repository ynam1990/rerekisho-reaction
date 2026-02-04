#!/bin/bash
set -euo pipefail

# CodeDeployのスクリプトはdeployment-archiveで実行されるため、まずappディレクトリに移動します
cd /var/rerekisho_reaction_app/app

../scripts/after_install_generate_env.sh

set -a
source ./.env
set +a

npm ci --omit=dev
npx prisma migrate deploy

systemctl enable nginx
../scripts/after_install_check_cert.sh
systemctl start nginx

systemctl enable rerekisho_reaction_app.service
