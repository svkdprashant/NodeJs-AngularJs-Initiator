-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.14-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.1.0.6116
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table node-api-initiator.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(191) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `mobile` varchar(50) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `user_type` enum('USER','ADMIN') NOT NULL DEFAULT 'USER',
  `is_active` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table node-api-initiator.users: ~3 rows (approximately)
DELETE FROM `users`;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `email`, `password`, `firstname`, `lastname`, `mobile`, `dob`, `user_type`, `is_active`, `created_at`, `updated_at`) VALUES
	(6, 'admin@demo.com', '7ece99e593ff5dd200e2b9233d9ba654', 'Admin', 'Demo', NULL, NULL, 'ADMIN', 1, '2021-03-25 11:26:03', '2021-03-25 11:26:03');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

-- Dumping structure for table node-api-initiator.user_devices
DROP TABLE IF EXISTS `user_devices`;
CREATE TABLE IF NOT EXISTS `user_devices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `users_id` int(11) NOT NULL,
  `device_id` varchar(250) NOT NULL,
  `device_token` varchar(250) DEFAULT NULL,
  `os_type` varchar(50) DEFAULT NULL,
  `model` varchar(50) DEFAULT NULL,
  `app_version` varchar(50) DEFAULT NULL,
  `os_version` varchar(250) DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_id` (`users_id`),
  CONSTRAINT `user_devices_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table node-api-initiator.user_devices: ~4 rows (approximately)
DELETE FROM `user_devices`;
/*!40000 ALTER TABLE `user_devices` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_devices` ENABLE KEYS */;

-- Dumping structure for table node-api-initiator.user_login_by
DROP TABLE IF EXISTS `user_login_by`;
CREATE TABLE IF NOT EXISTS `user_login_by` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `users_id` int(11) NOT NULL,
  `login_by` enum('Google','Facebook','Apple') NOT NULL DEFAULT 'Google',
  `social_id` varchar(3000) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_id` (`users_id`),
  CONSTRAINT `user_login_by_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table node-api-initiator.user_login_by: ~3 rows (approximately)
DELETE FROM `user_login_by`;
/*!40000 ALTER TABLE `user_login_by` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_login_by` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
