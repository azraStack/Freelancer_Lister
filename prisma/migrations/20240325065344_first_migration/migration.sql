-- CreateTable
CREATE TABLE `freelancers` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone_number` VARCHAR(255) NOT NULL,
    `skillsets` VARCHAR(255) NOT NULL,
    `hobby` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `freelancers_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
