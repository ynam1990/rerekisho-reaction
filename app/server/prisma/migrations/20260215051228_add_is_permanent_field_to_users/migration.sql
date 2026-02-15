-- AlterTable
ALTER TABLE `users` ADD COLUMN `is_permanent` BOOLEAN NOT NULL DEFAULT false AFTER `session_version`;
