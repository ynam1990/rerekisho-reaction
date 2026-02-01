-- CreateTable
CREATE TABLE `resumes` (
    `id` VARCHAR(128) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `is_published` BOOLEAN NOT NULL DEFAULT false,
    `is_gender_visible` BOOLEAN NOT NULL DEFAULT true,
    `is_contact_visible` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resume_values` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `resume_id` VARCHAR(128) NOT NULL,
    `display_date` DATETIME(3) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `name_ruby` VARCHAR(255) NOT NULL,
    `family_name` VARCHAR(255) NOT NULL,
    `family_name_ruby` VARCHAR(255) NOT NULL,
    `birthdate` DATETIME(3) NULL,
    `gender` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `resume_values_resume_id_key`(`resume_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resume_photo_imgs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `resume_values_id` INTEGER NOT NULL,
    `mime_type` VARCHAR(255) NOT NULL,
    `img_data` MEDIUMBLOB NOT NULL,

    UNIQUE INDEX `resume_photo_imgs_resume_values_id_key`(`resume_values_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resume_addresses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `resume_values_id` INTEGER NOT NULL,
    `postal_code` VARCHAR(255) NOT NULL,
    `line1` VARCHAR(255) NOT NULL,
    `line2` VARCHAR(255) NOT NULL,
    `line1_ruby` VARCHAR(255) NOT NULL,
    `line2_ruby` VARCHAR(255) NOT NULL,
    `tel` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `resume_addresses_resume_values_id_key`(`resume_values_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resume_contact_addresses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `resume_values_id` INTEGER NOT NULL,
    `postal_code` VARCHAR(255) NOT NULL,
    `line1` VARCHAR(255) NOT NULL,
    `line2` VARCHAR(255) NOT NULL,
    `line1_ruby` VARCHAR(255) NOT NULL,
    `line2_ruby` VARCHAR(255) NOT NULL,
    `tel` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `resume_contact_addresses_resume_values_id_key`(`resume_values_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resume_education_entities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `resume_values_id` INTEGER NOT NULL,
    `year` VARCHAR(255) NOT NULL,
    `month` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `entity_index` INTEGER NOT NULL,

    UNIQUE INDEX `resume_education_entity_id_entity_index_unique`(`resume_values_id`, `entity_index`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resume_experience_entities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `resume_values_id` INTEGER NOT NULL,
    `year` VARCHAR(255) NOT NULL,
    `month` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `entity_index` INTEGER NOT NULL,

    UNIQUE INDEX `resume_experience_entity_id_entity_index_unique`(`resume_values_id`, `entity_index`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resume_certification_entities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `resume_values_id` INTEGER NOT NULL,
    `year` VARCHAR(255) NOT NULL,
    `month` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `entity_index` INTEGER NOT NULL,

    UNIQUE INDEX `resume_certification_entity_id_entity_index_unique`(`resume_values_id`, `entity_index`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resume_custom_entities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `resume_values_id` INTEGER NOT NULL,
    `label` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `entity_index` INTEGER NOT NULL,

    UNIQUE INDEX `resume_custom_entity_id_entity_index_unique`(`resume_values_id`, `entity_index`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `resumes` ADD CONSTRAINT `resumes_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resume_values` ADD CONSTRAINT `resume_values_resume_id_fkey` FOREIGN KEY (`resume_id`) REFERENCES `resumes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resume_photo_imgs` ADD CONSTRAINT `resume_photo_imgs_resume_values_id_fkey` FOREIGN KEY (`resume_values_id`) REFERENCES `resume_values`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resume_addresses` ADD CONSTRAINT `resume_addresses_resume_values_id_fkey` FOREIGN KEY (`resume_values_id`) REFERENCES `resume_values`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resume_contact_addresses` ADD CONSTRAINT `resume_contact_addresses_resume_values_id_fkey` FOREIGN KEY (`resume_values_id`) REFERENCES `resume_values`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resume_education_entities` ADD CONSTRAINT `resume_education_entities_resume_values_id_fkey` FOREIGN KEY (`resume_values_id`) REFERENCES `resume_values`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resume_experience_entities` ADD CONSTRAINT `resume_experience_entities_resume_values_id_fkey` FOREIGN KEY (`resume_values_id`) REFERENCES `resume_values`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resume_certification_entities` ADD CONSTRAINT `resume_certification_entities_resume_values_id_fkey` FOREIGN KEY (`resume_values_id`) REFERENCES `resume_values`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resume_custom_entities` ADD CONSTRAINT `resume_custom_entities_resume_values_id_fkey` FOREIGN KEY (`resume_values_id`) REFERENCES `resume_values`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
