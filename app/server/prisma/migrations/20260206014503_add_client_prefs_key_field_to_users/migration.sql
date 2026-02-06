-- AlterTable
ALTER TABLE `users` ADD COLUMN `client_prefs_key` VARCHAR(128);
-- UpdateData
UPDATE `users` SET `client_prefs_key` = SHA2(UUID(), 256);
-- AlterTable
ALTER TABLE `users` MODIFY COLUMN `client_prefs_key` VARCHAR(128) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_client_prefs_key_key` ON `users`(`client_prefs_key`);
