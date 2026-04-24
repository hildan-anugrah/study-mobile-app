CREATE DATABASE IF NOT EXISTS `jwt_db`;

USE `jwt_db`;

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `users` (`name`, `email`, `password`) VALUES
('Test User', 'test@example.com', 'password123');
