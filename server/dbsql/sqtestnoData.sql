/*
 Navicat MySQL Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50710
 Source Host           : localhost
 Source Database       : sqtest

 Target Server Type    : MySQL
 Target Server Version : 50710
 File Encoding         : utf-8

 Date: 04/11/2021 17:21:36 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `article`
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` mediumtext CHARACTER SET utf8mb4,
  `viewCount` int(11) DEFAULT '0',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `category`
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
  `articleId` int(11) DEFAULT NULL,
  `category_id` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `articleId` (`articleId`),
  KEY `articleId_2` (`articleId`),
  CONSTRAINT `category_ibfk_1` FOREIGN KEY (`articleId`) REFERENCES `article` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=167 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `comment`
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `articleId` int(11) DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `commentId` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `articleId` (`articleId`),
  KEY `userId` (`userId`),
  KEY `articleId_2` (`articleId`),
  KEY `userId_2` (`userId`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`articleId`) REFERENCES `article` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `ip`
-- ----------------------------
DROP TABLE IF EXISTS `ip`;
CREATE TABLE `ip` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip` text NOT NULL,
  `auth` tinyint(1) DEFAULT '1',
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `userId` (`userId`) USING BTREE,
  CONSTRAINT `ip_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `reply`
-- ----------------------------
DROP TABLE IF EXISTS `reply`;
CREATE TABLE `reply` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text CHARACTER SET utf8mb4 NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `articleId` int(11) DEFAULT NULL,
  `commentId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `reply_id` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `articleId` (`articleId`),
  KEY `userId` (`userId`),
  KEY `articleId_2` (`articleId`),
  KEY `userId_2` (`userId`),
  CONSTRAINT `reply_ibfk_1` FOREIGN KEY (`articleId`) REFERENCES `article` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `reply_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `tag`
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
  `articleId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `articleId` (`articleId`),
  KEY `articleId_2` (`articleId`),
  CONSTRAINT `tag_ibfk_1` FOREIGN KEY (`articleId`) REFERENCES `article` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=214 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 NOT NULL,
  `password` varchar(255) DEFAULT NULL COMMENT '通过 bcrypt 加密后的密码',
  `email` varchar(50) DEFAULT NULL,
  `notice` tinyint(1) DEFAULT '1',
  `disabledDiscuss` tinyint(1) DEFAULT '0',
  `role` tinyint(4) DEFAULT '2' COMMENT '用户权限：1 - admin, 2 - 普通用户',
  `github` text CHARACTER SET utf8mb4,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47529557 DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
