#!/bin/bash
set -euo pipefail

# このスクリプトはCodeDeployでは自動実行されません
# EC2のスペックが低く、npm installなどでメモリ不足が発生する場合には、EC2のroot権限で手動実行し、スワップ領域を追加します

fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
grep -q "/swapfile swap swap defaults 0 0" /etc/fstab || echo "/swapfile swap swap defaults 0 0" >> /etc/fstab
swapon /swapfile
swapon --show
free -h
