-- shadowDBの作成と、prisma_user_localに権限を付与
CREATE DATABASE IF NOT EXISTS rerekisho_reaction_shadow_db
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

GRANT ALL PRIVILEGES ON rerekisho_reaction_shadow_db.* TO 'prisma_user_local'@'%';
FLUSH PRIVILEGES;

-- テスト用DBの作成と、prisma_user_localへの権限付与
CREATE DATABASE IF NOT EXISTS rerekisho_reaction_test_db
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

GRANT ALL PRIVILEGES ON rerekisho_reaction_test_db.* TO 'prisma_user_local'@'%';
FLUSH PRIVILEGES;
