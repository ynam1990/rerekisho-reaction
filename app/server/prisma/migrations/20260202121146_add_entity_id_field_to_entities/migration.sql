/*
  Warnings:

  - Added the required column `entity_id` to the `resume_certification_entities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entity_id` to the `resume_custom_entities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entity_id` to the `resume_education_entities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entity_id` to the `resume_experience_entities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `resume_certification_entities` ADD COLUMN `entity_id` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `resume_custom_entities` ADD COLUMN `entity_id` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `resume_education_entities` ADD COLUMN `entity_id` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `resume_experience_entities` ADD COLUMN `entity_id` VARCHAR(255) NOT NULL;
