#!/bin/bash

cd /var/rerekisho_reaction_app/app
npm install
cd ../

./scripts/after_install_generate_env.sh

systemctl enable rerekisho_reaction_app.service
