CREATE TABLE `forums`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NULL,
    `image` VARCHAR(255) NULL,
    `creation_date` DATETIME NOT NULL
);
CREATE TABLE `subjects`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `content` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NULL,
    `creation_date` DATETIME NOT NULL,
    `is_locked` BOOLEAN NOT NULL DEFAULT '0',
    `id_forum` BIGINT NOT NULL,
    `id_author` BIGINT NOT NULL
);
CREATE TABLE `messages`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `content` VARCHAR(255) NOT NULL,
    `creation_date` DATETIME NOT NULL,
    `id_subject` BIGINT NOT NULL,
    `id_author` BIGINT NOT NULL
);
CREATE TABLE `users`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `avatar` VARCHAR(255) NULL
);
ALTER TABLE
    `subjects` ADD CONSTRAINT `subjects_id_forum_foreign` FOREIGN KEY(`id_forum`) REFERENCES `forums`(`id`);
ALTER TABLE
    `messages` ADD CONSTRAINT `messages_id_subject_foreign` FOREIGN KEY(`id_subject`) REFERENCES `subjects`(`id`);
ALTER TABLE
    `messages` ADD CONSTRAINT `messages_id_author_foreign` FOREIGN KEY(`id_author`) REFERENCES `users`(`id`);
ALTER TABLE
    `subjects` ADD CONSTRAINT `subjects_id_author_foreign` FOREIGN KEY(`id_author`) REFERENCES `users`(`id`);