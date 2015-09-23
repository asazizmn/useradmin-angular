--
-- useradmin_lamp.sql
-- includes instructions to create 'useradmin-lamp' db containing 'users' table
-- 
-- Aziz | 15 Sep 2015
--

CREATE DATABASE `useradmin_lamp`;

CREATE TABLE IF NOT EXISTS `useradmin_lamp`.`users`
(
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `full_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
    `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
    `age` tinyint(2) unsigned NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=1;