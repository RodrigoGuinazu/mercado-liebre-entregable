-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema mercado_liebre_entregable
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mercado_liebre_entregable
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mercado_liebre_entregable` DEFAULT CHARACTER SET utf8 ;
USE `mercado_liebre_entregable` ;

-- -----------------------------------------------------
-- Table `mercado_liebre_entregable`.`brands`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mercado_liebre_entregable`.`brands` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1001
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mercado_liebre_entregable`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mercado_liebre_entregable`.`categories` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 867
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mercado_liebre_entregable`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mercado_liebre_entregable`.`products` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `photo` VARCHAR(100) NOT NULL,
  `price` FLOAT(10,2) UNSIGNED NOT NULL,
  `stock` INT(10) UNSIGNED NOT NULL,
  `brand_id` INT(10) UNSIGNED NOT NULL,
  `category_id` INT(10) UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `product_belongs_to_brand_idx` (`brand_id` ASC),
  INDEX `product_belongs_to_category_idx` (`category_id` ASC),
  CONSTRAINT `product_belongs_to_brand`
    FOREIGN KEY (`brand_id`)
    REFERENCES `mercado_liebre_entregable`.`brands` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `product_belongs_to_category`
    FOREIGN KEY (`category_id`)
    REFERENCES `mercado_liebre_entregable`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 16
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mercado_liebre_entregable`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mercado_liebre_entregable`.`users` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `avatar` VARCHAR(100) NULL DEFAULT '/images/users/avatar_placeholder.png',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;