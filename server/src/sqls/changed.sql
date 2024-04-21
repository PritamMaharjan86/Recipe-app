CREATE TABLE `recipe_app`.`users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(500) NULL,
    `password` VARCHAR(1000) NULL,
    `created_at` DATETIME NULL,
    `updated_at` DATETIME NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `recipes_name` (
    `id` int NOT NULL AUTO_INCREMENT,
    `recipe_name` varchar(500) DEFAULT NULL,
    `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 231638 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE `recipes_name` (
    `id` int NOT NULL AUTO_INCREMENT,
    `recipe_name` varchar(500) DEFAULT NULL,
    `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 231638 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
