-- CreateTable
CREATE TABLE `sessions` (
    `session_id` VARCHAR(128) NOT NULL,
    `user_id` INTEGER NULL,
    `expires` BIGINT NOT NULL,
    `data` MEDIUMTEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `sessions_expires_index`(`expires`),
    INDEX `sessions_user_id_index`(`user_id`),
    PRIMARY KEY (`session_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `sessions` MODIFY COLUMN `user_id` INTEGER GENERATED ALWAYS AS (
    CAST(JSON_VALUE(data, '$.userId') AS SIGNED)
  ) STORED;
