-- prisma_user_localにshadowDBの作成権限を付与（ローカルのみ）
CREATE DATABASE IF NOT EXISTS rerekisho_reaction_shadow_db
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

GRANT ALL PRIVILEGES ON rerekisho_reaction_shadow_db.* TO 'prisma_user_local'@'%';
FLUSH PRIVILEGES;
