-- AlterTable
ALTER TABLE `resumes` ADD COLUMN `layouts` JSON NULL AFTER `is_contact_visible`;
-- UpdateData
UPDATE `resumes` SET `layouts` = JSON_OBJECT();
-- AlterTable
ALTER TABLE `resumes` MODIFY COLUMN `layouts` JSON NOT NULL;
