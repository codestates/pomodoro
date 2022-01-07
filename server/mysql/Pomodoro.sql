CREATE DATABASE IF NOT EXISTS `pomodoro`;

USE `pomodoro`;

CREATE TABLE IF NOT EXISTS `User` (
	`user_id`	INT UNSIGNED	NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`nickname`	VARCHAR(32)	NOT NULL,
	`email`	VARCHAR(89)	NOT NULL,
	`pwd_hash`	CHAR(64)	NOT NULL,
	`salt`	VARCHAR(32)	NOT NULL,
	`num_pomo`	INT UNSIGNED	NULL,
	`user_type`	INT	NOT NULL,
	`pending`	BOOLEAN	NULL
);

CREATE TABLE IF NOT EXISTS `Playlist` (
	`playlist_id`	INT UNSIGNED	NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id`	INT UNSIGNED	NOT NULL,
	`playlist_name`	VARCHAR(128) NOT NULL,
	`order`	VARCHAR(256) NULL,
  FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`)
);

CREATE TABLE IF NOT EXISTS `Music` (
	`music_id`	INT UNSIGNED	NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `playlist_id`  INT UNSIGNED	NOT NULL,
  `user_id`  INT UNSIGNED	NOT NULL,
	`music_name`	VARCHAR(128)	NULL,
	`music_address`	VARCHAR(128)	NULL,
	`music_length`	INT UNSIGNED	NULL,
  FOREIGN KEY (`playlist_id`)	REFERENCES `Playlist`(`playlist_id`),
	FOREIGN KEY (`user_id`)	REFERENCES `User`(`user_id`)
);