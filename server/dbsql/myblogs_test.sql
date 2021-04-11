/*
 Navicat MySQL Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50710
 Source Host           : localhost
 Source Database       : myblogs_test

 Target Server Type    : MySQL
 Target Server Version : 50710
 File Encoding         : utf-8

 Date: 04/11/2021 18:38:13 PM
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
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `article`
-- ----------------------------
BEGIN;
INSERT INTO `article` VALUES ('-1', '留言页面', '留言页面，区分是留言还是文章，勿删', '8', '2021-04-11 17:46:55', '2021-04-11 18:14:55'), ('95', '测试添加文章', '### 测试第一篇添加的文章\n测试测试测试\n测试下修改标签和分类', '19', '2021-04-11 17:34:59', '2021-04-11 18:34:24');
COMMIT;

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
) ENGINE=InnoDB AUTO_INCREMENT=171 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `category`
-- ----------------------------
BEGIN;
INSERT INTO `category` VALUES ('170', '测试', '95', null);
COMMIT;

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
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `comment`
-- ----------------------------
BEGIN;
INSERT INTO `comment` VALUES ('72', '95', '测试下评论', '2021-04-11 17:37:31', '2021-04-11 17:37:31', '47529557', null), ('73', '95', '我来评论下', '2021-04-11 18:13:17', '2021-04-11 18:13:17', '47529558', null), ('74', '-1', '给你留个言', '2021-04-11 18:14:09', '2021-04-11 18:14:09', '47529558', null);
COMMIT;

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
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `reply`
-- ----------------------------
BEGIN;
INSERT INTO `reply` VALUES ('30', '测试下回复', '2021-04-11 17:37:45', '2021-04-11 17:37:45', '95', '72', '47529557', null), ('31', '测试下二级回复', '2021-04-11 18:06:14', '2021-04-11 18:06:14', '95', '72', '47529557', null), ('32', '回复你一下', '2021-04-11 18:13:31', '2021-04-11 18:13:31', '95', '72', '47529558', null), ('33', '谢谢！', '2021-04-11 18:15:07', '2021-04-11 18:15:07', '-1', '74', '47529557', null);
COMMIT;

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
) ENGINE=InnoDB AUTO_INCREMENT=223 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `tag`
-- ----------------------------
BEGIN;
INSERT INTO `tag` VALUES ('220', '测试', '95');
COMMIT;

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
) ENGINE=InnoDB AUTO_INCREMENT=47529559 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `user`
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('39258456', 'lcmomo', null, null, '1', '0', '1', '{\"login\":\"lcmomo\",\"id\":39258456,\"node_id\":\"MDQ6VXNlcjM5MjU4NDU2\",\"avatar_url\":\"https://avatars.githubusercontent.com/u/39258456?v=4\",\"gravatar_id\":\"\",\"url\":\"https://api.github.com/users/lcmomo\",\"html_url\":\"https://github.com/lcmomo\",\"followers_url\":\"https://api.github.com/users/lcmomo/followers\",\"following_url\":\"https://api.github.com/users/lcmomo/following{/other_user}\",\"gists_url\":\"https://api.github.com/users/lcmomo/gists{/gist_id}\",\"starred_url\":\"https://api.github.com/users/lcmomo/starred{/owner}{/repo}\",\"subscriptions_url\":\"https://api.github.com/users/lcmomo/subscriptions\",\"organizations_url\":\"https://api.github.com/users/lcmomo/orgs\",\"repos_url\":\"https://api.github.com/users/lcmomo/repos\",\"events_url\":\"https://api.github.com/users/lcmomo/events{/privacy}\",\"received_events_url\":\"https://api.github.com/users/lcmomo/received_events\",\"type\":\"User\",\"site_admin\":false,\"name\":null,\"company\":\"西北农林科技大学\",\"blog\":\"\",\"location\":\"陕西西安\",\"email\":null,\"hireable\":null,\"bio\":null,\"twitter_username\":null,\"public_repos\":18,\"public_gists\":0,\"followers\":0,\"following\":0,\"created_at\":\"2018-05-14T07:31:10Z\",\"updated_at\":\"2021-04-05T13:55:34Z\"}', '2021-04-11 17:28:51', '2021-04-11 17:28:51'), ('47529557', 'su', '$2a$10$VAPYv545xf9rZqf8bNQ58eSE3Ata052GyuCk/GSq2VNoi5sl71XGO', '1234@qq.com', '1', '0', '1', null, '2021-04-11 17:31:30', '2021-04-11 17:31:30'), ('47529558', 'lcmomo', '$2a$10$zy.rzoX1mcsTi69BnPSSbucUR/mMfElpjJ960zDFr/uBmFds/Hhei', '12345@qq.com', '1', '0', '2', null, '2021-04-11 18:12:10', '2021-04-11 18:12:10');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
