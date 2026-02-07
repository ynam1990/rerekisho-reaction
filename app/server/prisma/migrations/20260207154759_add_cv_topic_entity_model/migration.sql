-- AlterTable
ALTER TABLE `resumes` ADD COLUMN `is_cv_visible` BOOLEAN NOT NULL DEFAULT false AFTER `is_contact_visible`;

-- CreateTable
CREATE TABLE `resume_cv_topic_entities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `resume_values_id` INTEGER NOT NULL,
    `label` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `entity_index` INTEGER NOT NULL,
    `entity_id` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `resume_cv_topic_entity_id_entity_index_unique`(`resume_values_id`, `entity_index`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `resume_cv_topic_entities` ADD CONSTRAINT `resume_cv_topic_entities_resume_values_id_fkey` FOREIGN KEY (`resume_values_id`) REFERENCES `resume_values`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
