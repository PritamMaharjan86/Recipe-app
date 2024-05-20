CREATE TABLE `recipe_app`.`users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(500) NULL,
    `password` VARCHAR(1000) NULL,
    `email` VARCHAR(225) NULL,
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

CREATE TABLE `recipe_app`.`favorites` (
    `id` INT NOT NULL AUTO_INCREMENT COMMENT '	',
    `userId` INT NULL,
    `recipe_name_id` INT NULL,
    `recipe_id` INT NULL,
    `created_at` DATETIME NULL,
    `updated_at` DATETIME NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `recipe_app`.`comments` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `recipe_id` INT NULL,
    `user_id` INT NULL,
    `comment` TEXT NULL,
    `created_at` DATETIME NULL,
    `updated_at` DATETIME NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `recipe_app`.`like` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NULL,
    `recipe_id` INT NULL,
    `created_at` DATETIME NULL,
    `updated_at` DATETIME NULL,
    PRIMARY KEY (`id`)
);