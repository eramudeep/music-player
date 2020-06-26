/*
SQLyog Community v13.1.5  (64 bit)
MySQL - 10.4.11-MariaDB : Database - metrend
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`metrend` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `metrend`;

/*Table structure for table `album` */

DROP TABLE IF EXISTS `album`;

CREATE TABLE `album` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `userID` int(11) DEFAULT NULL,
  `artist_id` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `ar_name` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;

/*Data for the table `album` */

insert  into `album`(`id`,`name`,`userID`,`artist_id`,`createdAt`,`ar_name`) values 
(1,'Mohammed2020',NULL,1,'2020-05-05 04:00:00',''),
(2,'Mohammed2019',NULL,1,'2020-05-05 22:00:00',''),
(3,'Sami 2016',NULL,2,'2020-05-05 02:00:00',''),
(4,'Sami 2015',NULL,2,'2020-05-05 06:00:00',''),
(5,'kasim 2018',NULL,3,'2020-05-05 09:00:00',''),
(6,'kasim 2016',NULL,3,'2020-05-05 01:00:00',''),
(7,'ZAIN 2014',NULL,4,'2020-05-05 03:00:00',''),
(8,'ZAIN 2017',NULL,4,'2020-05-05 02:00:00',''),
(9,'mustapha 2017',NULL,5,'2020-05-05 19:00:00',''),
(10,'mustapha 2019',NULL,5,'2020-05-05 05:00:00',''),
(11,'Fadhil 2019',NULL,6,'2020-05-05 07:00:00',''),
(12,'Fadhil 2012',NULL,6,'2020-05-05 22:00:00',''),
(13,'kutaiba 2015',NULL,7,'2020-05-05 07:00:00',''),
(14,'kutaiba 2017',NULL,7,'2020-05-05 01:00:00',''),
(15,'baravan 2017',NULL,8,'2020-05-05 20:00:00',''),
(16,'baravan 2020',NULL,8,'2020-05-05 02:00:00',''),
(17,'Lee So Ryong 2020',NULL,18,'2020-05-05 19:00:00',''),
(18,'Lee So Ryong 2014',NULL,18,'2020-05-05 14:00:00',''),
(19,'Jin 2015',NULL,17,'2020-05-05 07:00:00',''),
(20,'Jin 2020',NULL,17,'2020-05-05 01:00:00',''),
(21,'wiki 2020',NULL,16,'2020-05-05 05:00:00',''),
(22,'wiki 2018',NULL,16,'2020-05-05 02:00:00',''),
(23,'kur 2018',NULL,15,'2020-05-05 23:00:00',''),
(24,'kur 2014',NULL,15,'2020-05-05 02:00:00',''),
(25,'abdul 2020',NULL,14,'2020-05-05 16:00:00',''),
(26,'abdul 2021',NULL,14,'2020-05-05 20:00:00',''),
(27,'ras 2010',NULL,13,'2020-05-05 03:00:00',''),
(28,'ras 2018',NULL,13,'2020-05-05 23:00:00','ras'),
(29,'ibrahim 2018',NULL,12,'2020-05-05 22:00:00',''),
(30,'ibrahim 2014',NULL,12,'2020-05-05 19:00:00',''),
(31,'samer 2014',NULL,11,'2020-05-05 17:00:00',''),
(32,'samer 2017',NULL,11,'2020-05-05 01:00:00',''),
(33,'nasim 2013',NULL,10,'2020-05-05 07:00:00',''),
(34,'nasim 2018',NULL,10,'2020-05-05 04:00:00',''),
(35,'Ali 2018',NULL,9,'2020-05-05 23:00:00',''),
(36,'Ali 2020',NULL,9,'2020-05-05 12:00:00',''),
(37,'345345',NULL,19,'2020-05-08 00:00:00',''),
(38,'78978978',NULL,19,'2020-05-08 00:00:00','');

/*Table structure for table `artist` */

DROP TABLE IF EXISTS `artist`;

CREATE TABLE `artist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `thumbnailURL` varchar(500) DEFAULT NULL,
  `genre_id` int(11) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `ar_name` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT '',
  `artist_photo` varchar(500) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

/*Data for the table `artist` */

insert  into `artist`(`id`,`name`,`thumbnailURL`,`genre_id`,`country_id`,`createdAt`,`ar_name`,`artist_photo`) values 
(1,'Mohammed Mohammed','thumbnails/1588652900417-1.jpg',1,4,'2020-05-05 05:00:00','','thumbnails/1588652900417-1.jpg'),
(2,'Sami Sami','thumbnails/1588652931032-2.jpg',1,8,'2020-05-05 05:00:00','','thumbnails/1588652931032-2.jpg'),
(3,'kasim kasim','thumbnails/1588652959971-3.jpg',1,5,'2020-05-05 02:00:00','','thumbnails/1588652959971-3.jpg'),
(4,'ZAIN ZAIN','thumbnails/1588652973135-4.jpg',1,7,'2020-05-05 03:00:00','','thumbnails/1588652973135-4.jpg'),
(5,'mustapha mustapha','thumbnails/1588652993855-5.jpg',1,8,'2020-05-05 09:00:00','','thumbnails/1588652993855-5.jpg'),
(6,'Fadhil Fadhil','thumbnails/1588653019736-6.jpg',1,7,'2020-05-05 01:00:00','','thumbnails/1588653019736-6.jpg'),
(7,'kutaiba kutaiba','thumbnails/1588653037188-7.jpg',1,5,'2020-05-05 08:00:00','','thumbnails/1588653037188-7.jpg'),
(8,'baravan baravan','thumbnails/1588653164725-8.jpg',1,4,'2020-05-05 03:00:00','','thumbnails/1588653164725-8.jpg'),
(9,'Ali Ali','thumbnails/1588654487754-9.jpg',2,1,'2020-05-05 01:00:00','','thumbnails/1588654487754-9.jpg'),
(10,'nasim nasim','thumbnails/1588654526621-10.jpg',2,1,'2020-05-05 02:00:00','','thumbnails/1588654526621-10.jpg'),
(11,'Samer Samer','thumbnails/1588654928667-ir.jpg',3,9,'2020-05-05 00:00:00','','thumbnails/1588654928667-ir.jpg'),
(12,'Ibrahim Ibrahim','thumbnails/1588654964903-ir2.jpg',3,9,'2020-05-05 00:00:00','','thumbnails/1588654964903-ir2.jpg'),
(13,'ras ras','thumbnails/1588654999364-tur.jpg',4,10,'2020-05-05 00:00:00','','thumbnails/1588654999364-tur.jpg'),
(14,'abdul abdul','thumbnails/1588655024331-tur2.jpg',4,10,'2020-05-05 00:00:00','','thumbnails/1588655024331-tur2.jpg'),
(15,'kur kur','thumbnails/1588655051143-kur.jpg',5,11,'2020-05-05 00:00:00','','thumbnails/1588655051143-kur.jpg'),
(16,'wiki wiki','thumbnails/1588655069848-kur2.jpg',5,11,'2020-05-05 00:00:00','','thumbnails/1588655069848-kur2.jpg'),
(17,'Jin Jin','thumbnails/1588655102645-ch.jpg',6,2,'2020-05-05 03:00:00','','thumbnails/1588655102645-ch.jpg'),
(18,'Lee So Ryong Lee So Ryong','thumbnails/1588655131155-ch2.jpg',6,2,'2020-05-05 04:00:00','','thumbnails/1588655131155-ch2.jpg'),
(26,'aab ccc','thumbnails/1591328994592-screenshot+2020-06-05+at+5.23.00+am.png',4,10,'0000-00-00 00:00:00','bbb ddd','thumbnails/1591328994592-screenshot+2020-06-05+at+5.23.00+am.png');

/*Table structure for table `content` */

DROP TABLE IF EXISTS `content`;

CREATE TABLE `content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `trailerURL` varchar(500) DEFAULT NULL,
  `contentURL` varchar(500) DEFAULT NULL,
  `thumbnailURL` varchar(500) DEFAULT NULL,
  `posterURL` varchar(500) DEFAULT NULL,
  `duration` varchar(45) DEFAULT NULL,
  `desc_short` varchar(500) DEFAULT NULL,
  `desc_long` varchar(1000) DEFAULT NULL,
  `fk_genre_id` int(11) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `featured` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `seasonID` int(11) DEFAULT NULL,
  `episodeNumber` int(11) DEFAULT NULL,
  `approved` int(10) DEFAULT NULL,
  `Type` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `ar_title` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT '',
  `ar_desc_short` varchar(500) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT '',
  `ar_desc_long` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=latin1;

/*Data for the table `content` */

insert  into `content`(`id`,`title`,`trailerURL`,`contentURL`,`thumbnailURL`,`posterURL`,`duration`,`desc_short`,`desc_long`,`fk_genre_id`,`year`,`rating`,`featured`,`created_at`,`seasonID`,`episodeNumber`,`approved`,`Type`,`ar_title`,`ar_desc_short`,`ar_desc_long`) values 
(1,'Frozen','trailers/1588661475954-#1-react-navigation-2.0-_-stack-navigator-_-react-native.mp4','content/1.mp3','thumbnails/1.jpg','posters/1.jpg','1 hour 30 minutes','Frozen is a story of a girl that has ice powers ','Frozen is a story of a girl that has ice powers Frozen is a story of a girl that has ice powers Frozen is a story of a girl that has ice powers Frozen is a story of a girl that has ice powers Frozen is a story of a girl that has ice powers Frozen is a story of a girl that has ice powers ',1,2016,5,0,'2019-10-21 00:00:00',0,0,1,'1','','',''),
(2,'Terminator 2','trailers/1588661538028-#2-root-screen---wix-react-native-navigation-2.mp4','content/2.mp4','thumbnails/2.jpg','posters/2.jpg','1 hour 30 minutes','A machine came back in time.','Arnold is the terminator who comes back in time to fix the past.',1,1997,5,0,'2019-10-21 00:00:00',0,0,1,'0','','',''),
(3,'Planet Earth','trailers/1588661608794-3d-modelling-using-autocad_-model-1.mp4','content/3.mp4','thumbnails/3.jpg','posters/3.jpg','1 hour 30 minutes','David Attenburg Documentary','Earth is a documentary about different seasons and animals',1,2010,5,0,'2019-10-21 00:00:00',0,0,1,'0','','',''),
(4,'Conjuring','trailers/1588661746778-3ds-max,-v-ray,-&-rayfire-test.mp4','content/4.mp3','thumbnails/4.jpg','posters/4.jpg','1 hour 30 minutes','Husband and Wife catches Ghosts','Conjuring is based on true events in which husband and wife were faced with supernatural challenges',2,2013,5,0,'2019-10-21 00:00:00',0,0,1,'1','','',''),
(5,'The Hangover','trailers/1588661809327-augmented-reality-for-packaging---shazam-x-bombay-sapphire.mp4','content/5.mp4','thumbnails/5.jpg','posters/5.jpg','1 hour 30 minutes','Bachelor party gone wrong.','four friends go to Bangkok for a wedding and lose a friend in the mid.',2,2015,5,0,'2019-10-21 00:00:00',0,0,1,'0','','',''),
(6,'Watchers 3','trailers/1588661850787-augmented-reality-for-packaging---shazam-x-bombay-sapphire.mp4','content/6.mp4','thumbnails/6.jpg','posters/6.jpg','2 Hours','Short Description','Long Description',2,1998,5,0,'2019-11-10 00:00:00',0,0,1,'0','','',''),
(7,'Tom and Jerry','trailers/1588661919785-cutting-meshes-in-unity.mp4','content/7.mp3','thumbnails/7.jpg','posters/7.jpg','1:59:15','Old Cartoon','Tom and Jerry is an old cartoon',3,1998,5,0,'2019-11-11 00:00:00',0,0,1,'1','','',''),
(8,'The Shining','trailers/1588661981801-cutting-meshes-in-unity.mp4','content/8.mp4','thumbnails/8.jpg','posters/8.jpg','2:16:40','Jack and his family move into an isolated hotel with a violent past.','Jack and his family move into an isolated hotel with a violent past. Living in isolation, Jack begins to lose his sanity, which affects his family members.',3,1980,5,0,'2019-12-06 00:00:00',0,0,1,'0','','',''),
(9,'Meet the Parents','trailers/1588662050989-easy-email-sender---tutorial-_unity-5.mp4','content/9.mp4','thumbnails/9.jpg','posters/9.jpg','1:48:00','Greg Focker decides to spend a weekend with his girlfriend parents before proposing to her.','Greg Focker decides to spend a weekend with his girlfriend parents before proposing to her. However, her father instantly dislikes Greg, which makes his stay far worse than he imagined.',3,2000,3,0,'2019-12-06 00:00:00',0,0,1,'0','','',''),
(10,'Deadpool','trailers/1588662117865-fadein.mp4','content/10.mp3','thumbnails/10.jpg','posters/10.jpg','1:48:00','A wisecracking mercenary gets experimented on and becomes immortal but ugly','A wisecracking mercenary gets experimented on and becomes immortal but ugly, and sets out to track down the man who ruined his looks.',4,2016,5,0,'2019-12-06 00:00:00',0,0,1,'1','','',''),
(11,'Meet the Parents','trailers/1588662216725-easy-email-sender---tutorial-_unity-5.mp4','content/11.mp4','thumbnails/11.jpg','posters/11.jpg','1:33:00','A detective recruits his Uber driver into an unexpected night of adventure.','A detective recruits his Uber driver into an unexpected night of adventure.',4,2019,4,0,'2019-12-06 00:00:00',0,0,1,'0','','',''),
(13,'Meet the Parents','trailers/1588662343774-fe.mp4','content/12.mp4','thumbnails/12.jpg','posters/12.jpg',NULL,'Greg Focker decides to spend a weekend with his girlfriend parents before proposing to her.','Greg Focker decides to spend a weekend with his girlfriend parents before proposing to her.',4,NULL,NULL,NULL,NULL,0,0,1,'0','','',''),
(14,'Meet the Parents','trailers/1588662410141-fesco-02_02(2).mp4','content/13.mp3','thumbnails/13.jpg','posters/13.jpg',NULL,'Greg Focker decides to spend a weekend with his girlfriend parents before proposing to her.','Greg Focker decides to spend a weekend with his girlfriend parents before proposing to her.',5,NULL,NULL,NULL,NULL,0,0,1,'1','','',''),
(15,'Meet the Parents','trailers/1588662447824-how-to-get-google-maps-api-key-in-1-minute-(2019).mp4','content/14.mp4','thumbnails/14.jpg','posters/14.jpg',NULL,'Greg Focker decides to spend a weekend with his girlfriend parents before proposing to her.','Greg Focker decides to spend a weekend with his girlfriend parents before proposing to her.',5,NULL,NULL,NULL,NULL,0,0,1,'0','','',''),
(16,'Meet the Parents','trailers/1588662499176-how-to-get-google-maps-api-key-in-1-minute-(2019).mp4','content/15.mp4','thumbnails/15.jpg','posters/15.jpg',NULL,'Greg Focker decides to spend a weekend with his girlfriend parents before proposing to her.','Greg Focker decides to spend a weekend with his girlfriend parents before proposing to her.',5,NULL,NULL,NULL,NULL,0,0,1,'0','','',''),
(17,'Meet the Parents','trailers/1588662551385-how-to-remove-watermark-on-any-app-for-free.mp4','content/16.mp3','thumbnails/16.jpg','posters/16.jpg',NULL,'Greg Focker decides to spend a weekend with his girlfriend parents before proposing to her.','Greg Focker decides to spend a weekend with his girlfriend parents before proposing to her.',6,NULL,NULL,NULL,NULL,0,0,1,'1','','',''),
(18,'Meet the Parents','trailers/1588662600849-how-to-setup-android-push-notifications-in-react-native.mp4','content/17.mp4','thumbnails/17.jpg','posters/17.jpg',NULL,'Greg Focker decides to spend a weekend with his girlfriend parents before proposing to her.','Greg Focker decides to spend a weekend with his girlfriend parents before proposing to her.',6,NULL,NULL,NULL,NULL,0,0,1,'0','','',''),
(19,'Meet the Parents','trailers/1588662666166-how-to-use-internet-connections-in-android-emulator_avd.mp4','content/18.mp4','thumbnails/18.jpg','posters/18.jpg',NULL,'Greg Focker decides to spend a weekend with his girlfriend parents before proposing to her.','Greg Focker decides to spend a weekend with his girlfriend parents before proposing to her.',6,NULL,NULL,NULL,NULL,0,NULL,1,'0','','',''),
(102,'fwefwfwf','trailers/1586986504840-wordpress-plugin-development---part-7---php-visibility-methods.mp4','content/1586986499851-wordpress-plugin-development---intro.mp4','thumbnails/1586986515511-images.jpg','posters/1586986510216-images.jpg','5:34:46',NULL,NULL,1,NULL,1,NULL,'2020-04-16 00:00:00',1,NULL,0,'0','','',''),
(103,'test movie1','trailers/1587382738316-how-to-get-google-maps-api-key-in-1-minute-(2019).mp4','content/1587382639083-fe.mp4','thumbnails/1587382822708-seven.jpg','posters/1587382758315-female.jpg','20:37:16',NULL,NULL,1,NULL,5,NULL,'2020-04-20 00:00:00',NULL,NULL,0,'0','','',''),
(104,'Arabic_movie','trailers/1587635914300-fe.mp4','content/1587635887109-fe.mp4','thumbnails/1587635940588-female.jpg','posters/1587635930617-female.jpg','17:56:52',NULL,NULL,1,NULL,4,NULL,'2020-04-23 00:00:00',NULL,NULL,0,'0','','','');

/*Table structure for table `contentnew` */

DROP TABLE IF EXISTS `contentnew`;

CREATE TABLE `contentnew` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `genreID` int(11) DEFAULT NULL,
  `countryID` int(11) DEFAULT NULL,
  `artistID` int(11) DEFAULT NULL,
  `albumID` int(11) DEFAULT NULL,
  `reg_count` int(11) DEFAULT NULL,
  `down_count` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `mainContent` int(11) DEFAULT NULL,
  `contentURL` varchar(500) DEFAULT NULL,
  `thumbnailURL` varchar(500) DEFAULT NULL,
  `posterURL` varchar(500) DEFAULT NULL,
  `desc_long` text DEFAULT NULL,
  `desc_short` varchar(500) DEFAULT NULL,
  `duration` varchar(45) DEFAULT NULL,
  `rating` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `singerID` int(11) DEFAULT NULL,
  `cp_id` int(11) DEFAULT NULL,
  `paid` tinyint(4) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `approved` tinyint(4) DEFAULT NULL,
  `date_turns_unpaid` datetime DEFAULT NULL,
  `ar_title` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `ar_desc_long` text CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `ar_desc_short` varchar(500) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=latin1;

/*Data for the table `contentnew` */

insert  into `contentnew`(`id`,`title`,`genreID`,`countryID`,`artistID`,`albumID`,`reg_count`,`down_count`,`createdAt`,`mainContent`,`contentURL`,`thumbnailURL`,`posterURL`,`desc_long`,`desc_short`,`duration`,`rating`,`type`,`singerID`,`cp_id`,`paid`,`price`,`approved`,`date_turns_unpaid`,`ar_title`,`ar_desc_long`,`ar_desc_short`) values 
(1,'qq',1,4,1,1,162,56,'2020-05-13 10:17:12',0,'content/1588661469517native.mp4','thumbnails/1588661494627-1.jpg','posters/1588661487922-1.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in interdum lorem. Vestibulum malesuada massa scelerisque mattis egestas. Nulla consectetur placerat metus eget tempus. Nunc ac erat et nunc lacinia accumsan sit amet sit amet justo. Donec non vestibulum purus, sed blandit nunc. Maecenas id orci dolor. Aliquam laoreet urna sed lorem pharetra tristique. Etiam a risus vitae enim congue cursus. Morbi sagittis erat urna. In hendrerit at augue in varius. Vestibulum purus mauris, posuere sed erat in, tristique rutrum mi. Etiam elementum varius vestibulum. Nunc id elementum augue. Duis at accumsan nibh, vitae vulputate nunc. Proin pulvinar felis tincidunt, condimentum erat iaculis, tincidunt nisl.','Interesting Film','00:06:33',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(2,'ww',1,4,1,2,57,52,'2020-05-13 10:17:15',1,'content/1588661529876-#2-root-screen---wix-react-native-navigation-2.mp4','thumbnails/1588661564941-1.jpg','posters/1588661560370-1.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in interdum lorem. Vestibulum malesuada massa scelerisque mattis egestas. Nulla consectetur placerat metus eget tempus. Nunc ac erat et nunc lacinia accumsan sit amet sit amet justo. Donec non vestibulum purus, sed blandit nunc. Maecenas id orci dolor. Aliquam laoreet urna sed lorem pharetra tristique. Etiam a risus vitae enim congue cursus. Morbi sagittis erat urna. In hendrerit at augue in varius. Vestibulum purus mauris, posuere sed erat in, tristique rutrum mi. Etiam elementum varius vestibulum. Nunc id elementum augue. Duis at accumsan nibh, vitae vulputate nunc. Proin pulvinar felis tincidunt, condimentum erat iaculis, tincidunt nisl.\r\n\r\nNulla vitae consectetur enim, sit amet interdum magna. Suspendisse a aliquet nisl, et lobortis odio. Duis varius pretium eros, id feugiat lacus. Ut quis purus ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc placerat dui at justo interdum varius. Phasellus iaculis ex a finibus volutpat. Nullam porta odio et lacinia feugiat. Fusce vel odio eu ante pharetra tincidunt. Proin lobortis tortor ut turpis fermentum, quis feugiat ligula aliquam. Integer eleifend viverra arcu vitae gravida.','Interesting Film','00:02:27',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(3,'ee',1,4,8,15,38,26,'2020-05-13 10:17:19',1,'content/1588661598036-3d-modelling-using-autocad_-model-1.mp4','thumbnails/1588661695698-2.jpg','posters/1588661623196-2.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in interdum lorem. Vestibulum malesuada massa scelerisque mattis egestas. Nulla consectetur placerat metus eget tempus. Nunc ac erat et nunc lacinia accumsan sit amet sit amet justo. Donec non vestibulum purus, sed blandit nunc. Maecenas id orci dolor. Aliquam laoreet urna sed lorem pharetra tristique. Etiam a risus vitae enim congue cursus. Morbi sagittis erat urna. In hendrerit at augue in varius. Vestibulum purus mauris, posuere sed erat in, tristique rutrum mi. Etiam elementum varius vestibulum. Nunc id elementum augue. Duis at accumsan nibh, vitae vulputate nunc. Proin pulvinar felis tincidunt, condimentum erat iaculis, tincidunt nisl.\r\n\r\nNulla vitae consectetur enim, sit amet interdum magna. Suspendisse a aliquet nisl, et lobortis odio. Duis varius pretium eros, id feugiat lacus. Ut quis purus ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc placerat dui at justo interdum varius. Phasellus iaculis ex a finibus volutpat. Nullam porta odio et lacinia feugiat. Fusce vel odio eu ante pharetra tincidunt. Proin lobortis tortor ut turpis fermentum, quis feugiat ligula aliquam. Integer eleifend viverra arcu vitae gravida.','Interesting Film','00:04:38',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(4,'rr',1,4,8,16,87,51,'2020-05-13 10:17:22',1,'content/1588661724453-3ds-max,-v-ray,-&-rayfire-test.mp4','thumbnails/1588661760730-2.jpg','posters/1588661757562-2.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in interdum lorem. Vestibulum malesuada massa scelerisque mattis egestas. Nulla consectetur placerat metus eget tempus. Nunc ac erat et nunc lacinia accumsan sit amet sit amet justo. Donec non vestibulum purus, sed blandit nunc. Maecenas id orci dolor. Aliquam laoreet urna sed lorem pharetra tristique. Etiam a risus vitae enim congue cursus. Morbi sagittis erat urna. In hendrerit at augue in varius. Vestibulum purus mauris, posuere sed erat in, tristique rutrum mi. Etiam elementum varius vestibulum. Nunc id elementum augue. Duis at accumsan nibh, vitae vulputate nunc. Proin pulvinar felis tincidunt, condimentum erat iaculis, tincidunt nisl.\r\n\r\nNulla vitae consectetur enim, sit amet interdum magna. Suspendisse a aliquet nisl, et lobortis odio. Duis varius pretium eros, id feugiat lacus. Ut quis purus ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc placerat dui at justo interdum varius. Phasellus iaculis ex a finibus volutpat. Nullam porta odio et lacinia feugiat. Fusce vel odio eu ante pharetra tincidunt. Proin lobortis tortor ut turpis fermentum, quis feugiat ligula aliquam. Integer eleifend viverra arcu vitae gravida.','Interesting Film','00:00:44',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(5,'tt',1,5,3,5,62,1,'2020-05-13 10:17:24',1,'content/1588661804299-augmented-reality-for-packaging---shazam-x-bombay-sapphire.mp4','thumbnails/1588661818708-3.jpg','posters/1588661814761-3.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in interdum lorem. Vestibulum malesuada massa scelerisque mattis egestas. Nulla consectetur placerat metus eget tempus. Nunc ac erat et nunc lacinia accumsan sit amet sit amet justo. Donec non vestibulum purus, sed blandit nunc. Maecenas id orci dolor. Aliquam laoreet urna sed lorem pharetra tristique. Etiam a risus vitae enim congue cursus. Morbi sagittis erat urna. In hendrerit at augue in varius. Vestibulum purus mauris, posuere sed erat in, tristique rutrum mi. Etiam elementum varius vestibulum. Nunc id elementum augue. Duis at accumsan nibh, vitae vulputate nunc. Proin pulvinar felis tincidunt, condimentum erat iaculis, tincidunt nisl.\r\n\r\nNulla vitae consectetur enim, sit amet interdum magna. Suspendisse a aliquet nisl, et lobortis odio. Duis varius pretium eros, id feugiat lacus. Ut quis purus ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc placerat dui at justo interdum varius. Phasellus iaculis ex a finibus volutpat. Nullam porta odio et lacinia feugiat. Fusce vel odio eu ante pharetra tincidunt. Proin lobortis tortor ut turpis fermentum, quis feugiat ligula aliquam. Integer eleifend viverra arcu vitae gravida.','Interesting Film','00:01:25',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(6,'yy',1,5,3,6,57,84,'2020-05-13 10:17:26',1,'content/1588661843589-augmented-reality-for-packaging---shazam-x-bombay-sapphire.mp4','thumbnails/1588661872962-3.jpg','posters/1588661869081-3.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in interdum lorem. Vestibulum malesuada massa scelerisque mattis egestas. Nulla consectetur placerat metus eget tempus. Nunc ac erat et nunc lacinia accumsan sit amet sit amet justo. Donec non vestibulum purus, sed blandit nunc. Maecenas id orci dolor. Aliquam laoreet urna sed lorem pharetra tristique. Etiam a risus vitae enim congue cursus. Morbi sagittis erat urna. In hendrerit at augue in varius. Vestibulum purus mauris, posuere sed erat in, tristique rutrum mi. Etiam elementum varius vestibulum. Nunc id elementum augue. Duis at accumsan nibh, vitae vulputate nunc. Proin pulvinar felis tincidunt, condimentum erat iaculis, tincidunt nisl.\r\n\r\nNulla vitae consectetur enim, sit amet interdum magna. Suspendisse a aliquet nisl, et lobortis odio. Duis varius pretium eros, id feugiat lacus. Ut quis purus ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc placerat dui at justo interdum varius. Phasellus iaculis ex a finibus volutpat. Nullam porta odio et lacinia feugiat. Fusce vel odio eu ante pharetra tincidunt. Proin lobortis tortor ut turpis fermentum, quis feugiat ligula aliquam. Integer eleifend viverra arcu vitae gravida.','Interesting Film','00:01:25',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(7,'uu',1,5,7,13,67,62,'2020-05-13 10:17:31',1,'content/1588661914329-cutting-meshes-in-unity.mp4','thumbnails/1588661933243-4.jpg','posters/1588661927146-4.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in interdum lorem. Vestibulum malesuada massa scelerisque mattis egestas. Nulla consectetur placerat metus eget tempus. Nunc ac erat et nunc lacinia accumsan sit amet sit amet justo. Donec non vestibulum purus, sed blandit nunc. Maecenas id orci dolor. Aliquam laoreet urna sed lorem pharetra tristique. Etiam a risus vitae enim congue cursus. Morbi sagittis erat urna. In hendrerit at augue in varius. Vestibulum purus mauris, posuere sed erat in, tristique rutrum mi. Etiam elementum varius vestibulum. Nunc id elementum augue. Duis at accumsan nibh, vitae vulputate nunc. Proin pulvinar felis tincidunt, condimentum erat iaculis, tincidunt nisl.\r\n\r\nNulla vitae consectetur enim, sit amet interdum magna. Suspendisse a aliquet nisl, et lobortis odio. Duis varius pretium eros, id feugiat lacus. Ut quis purus ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc placerat dui at justo interdum varius. Phasellus iaculis ex a finibus volutpat. Nullam porta odio et lacinia feugiat. Fusce vel odio eu ante pharetra tincidunt. Proin lobortis tortor ut turpis fermentum, quis feugiat ligula aliquam. Integer eleifend viverra arcu vitae gravida.','Interesting Film','00:04:51',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(8,'ii',1,5,3,6,78,2,'2020-05-13 10:17:33',0,'content/1588661975567-3ds-max,-v-ray,-&-rayfire-test.mp4','thumbnails/1588661995937-4.jpg','posters/1588661989682-4.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in interdum lorem. Vestibulum malesuada massa scelerisque mattis egestas. Nulla consectetur placerat metus eget tempus. Nunc ac erat et nunc lacinia accumsan sit amet sit amet justo. Donec non vestibulum purus, sed blandit nunc. Maecenas id orci dolor. Aliquam laoreet urna sed lorem pharetra tristique. Etiam a risus vitae enim congue cursus. Morbi sagittis erat urna. In hendrerit at augue in varius. Vestibulum purus mauris, posuere sed erat in, tristique rutrum mi. Etiam elementum varius vestibulum. Nunc id elementum augue. Duis at accumsan nibh, vitae vulputate nunc. Proin pulvinar felis tincidunt, condimentum erat iaculis, tincidunt nisl.\r\n\r\nNulla vitae consectetur enim, sit amet interdum magna. Suspendisse a aliquet nisl, et lobortis odio. Duis varius pretium eros, id feugiat lacus. Ut quis purus ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc placerat dui at justo interdum varius. Phasellus iaculis ex a finibus volutpat. Nullam porta odio et lacinia feugiat. Fusce vel odio eu ante pharetra tincidunt. Proin lobortis tortor ut turpis fermentum, quis feugiat ligula aliquam. Integer eleifend viverra arcu vitae gravida.','Interesting Film','00:00:44',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(9,'oo',1,7,4,7,90,15,'2020-05-13 10:17:35',1,'content/1588662045514-cutting-meshes-in-unity.mp4','thumbnails/1588662064827-5.jpg','posters/1588662061337-5.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in interdum lorem. Vestibulum malesuada massa scelerisque mattis egestas. Nulla consectetur placerat metus eget tempus. Nunc ac erat et nunc lacinia accumsan sit amet sit amet justo. Donec non vestibulum purus, sed blandit nunc. Maecenas id orci dolor. Aliquam laoreet urna sed lorem pharetra tristique. Etiam a risus vitae enim congue cursus. Morbi sagittis erat urna. In hendrerit at augue in varius. Vestibulum purus mauris, posuere sed erat in, tristique rutrum mi. Etiam elementum varius vestibulum. Nunc id elementum augue. Duis at accumsan nibh, vitae vulputate nunc. Proin pulvinar felis tincidunt, condimentum erat iaculis, tincidunt nisl.\r\n\r\nNulla vitae consectetur enim, sit amet interdum magna. Suspendisse a aliquet nisl, et lobortis odio. Duis varius pretium eros, id feugiat lacus. Ut quis purus ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc placerat dui at justo interdum varius. Phasellus iaculis ex a finibus volutpat. Nullam porta odio et lacinia feugiat. Fusce vel odio eu ante pharetra tincidunt. Proin lobortis tortor ut turpis fermentum, quis feugiat ligula aliquam. Integer eleifend viverra arcu vitae gravida.','Interesting Film','00:04:51',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(10,'pp',1,7,6,11,25,4,'2020-05-13 10:17:37',1,'content/1588662110682-fadein.mp4','thumbnails/1588662127394-5.jpg','posters/1588662123481-5.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in interdum lorem. Vestibulum malesuada massa scelerisque mattis egestas. Nulla consectetur placerat metus eget tempus. Nunc ac erat et nunc lacinia accumsan sit amet sit amet justo. Donec non vestibulum purus, sed blandit nunc. Maecenas id orci dolor. Aliquam laoreet urna sed lorem pharetra tristique. Etiam a risus vitae enim congue cursus. Morbi sagittis erat urna. In hendrerit at augue in varius. Vestibulum purus mauris, posuere sed erat in, tristique rutrum mi. Etiam elementum varius vestibulum. Nunc id elementum augue. Duis at accumsan nibh, vitae vulputate nunc. Proin pulvinar felis tincidunt, condimentum erat iaculis, tincidunt nisl.\r\n\r\nNulla vitae consectetur enim, sit amet interdum magna. Suspendisse a aliquet nisl, et lobortis odio. Duis varius pretium eros, id feugiat lacus. Ut quis purus ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc placerat dui at justo interdum varius. Phasellus iaculis ex a finibus volutpat. Nullam porta odio et lacinia feugiat. Fusce vel odio eu ante pharetra tincidunt. Proin lobortis tortor ut turpis fermentum, quis feugiat ligula aliquam. Integer eleifend viverra arcu vitae gravida.','Interesting Film','00:02:09',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(11,'aa',1,8,2,3,64,62,'2020-05-13 10:17:39',1,'content/1588662212253-easy-email-sender---tutorial-_unity-5.mp4','thumbnails/1588662241425-6.jpg','posters/1588662229777-6.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in interdum lorem. Vestibulum malesuada massa scelerisque mattis egestas. Nulla consectetur placerat metus eget tempus. Nunc ac erat et nunc lacinia accumsan sit amet sit amet justo. Donec non vestibulum purus, sed blandit nunc. Maecenas id orci dolor. Aliquam laoreet urna sed lorem pharetra tristique. Etiam a risus vitae enim congue cursus. Morbi sagittis erat urna. In hendrerit at augue in varius. Vestibulum purus mauris, posuere sed erat in, tristique rutrum mi. Etiam elementum varius vestibulum. Nunc id elementum augue. Duis at accumsan nibh, vitae vulputate nunc. Proin pulvinar felis tincidunt, condimentum erat iaculis, tincidunt nisl.\r\n\r\nNulla vitae consectetur enim, sit amet interdum magna. Suspendisse a aliquet nisl, et lobortis odio. Duis varius pretium eros, id feugiat lacus. Ut quis purus ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc placerat dui at justo interdum varius. Phasellus iaculis ex a finibus volutpat. Nullam porta odio et lacinia feugiat. Fusce vel odio eu ante pharetra tincidunt. Proin lobortis tortor ut turpis fermentum, quis feugiat ligula aliquam. Integer eleifend viverra arcu vitae gravida.','Interesting Film','00:02:39',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(12,'ss',1,8,2,4,69,0,'2020-05-13 10:17:41',1,'content/1588662301918-fadein.mp4','thumbnails/1588662314361-6.jpg','posters/1588662311298-6.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in interdum lorem. Vestibulum malesuada massa scelerisque mattis egestas. Nulla consectetur placerat metus eget tempus. Nunc ac erat et nunc lacinia accumsan sit amet sit amet justo. Donec non vestibulum purus, sed blandit nunc. Maecenas id orci dolor. Aliquam laoreet urna sed lorem pharetra tristique. Etiam a risus vitae enim congue cursus. Morbi sagittis erat urna. In hendrerit at augue in varius. Vestibulum purus mauris, posuere sed erat in, tristique rutrum mi. Etiam elementum varius vestibulum. Nunc id elementum augue. Duis at accumsan nibh, vitae vulputate nunc. Proin pulvinar felis tincidunt, condimentum erat iaculis, tincidunt nisl.\r\n\r\nNulla vitae consectetur enim, sit amet interdum magna. Suspendisse a aliquet nisl, et lobortis odio. Duis varius pretium eros, id feugiat lacus. Ut quis purus ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc placerat dui at justo interdum varius. Phasellus iaculis ex a finibus volutpat. Nullam porta odio et lacinia feugiat. Fusce vel odio eu ante pharetra tincidunt. Proin lobortis tortor ut turpis fermentum, quis feugiat ligula aliquam. Integer eleifend viverra arcu vitae gravida.','Interesting Film','00:02:09',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(13,'dd',1,8,5,9,57,15,'2020-05-13 10:17:43',1,'content/1588662338878-fe.mp4','thumbnails/1588662352226-7.jpg','posters/1588662349110-7.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in interdum lorem. Vestibulum malesuada massa scelerisque mattis egestas. Nulla consectetur placerat metus eget tempus. Nunc ac erat et nunc lacinia accumsan sit amet sit amet justo. Donec non vestibulum purus, sed blandit nunc. Maecenas id orci dolor. Aliquam laoreet urna sed lorem pharetra tristique. Etiam a risus vitae enim congue cursus. Morbi sagittis erat urna. In hendrerit at augue in varius. Vestibulum purus mauris, posuere sed erat in, tristique rutrum mi. Etiam elementum varius vestibulum. Nunc id elementum augue. Duis at accumsan nibh, vitae vulputate nunc. Proin pulvinar felis tincidunt, condimentum erat iaculis, tincidunt nisl.\r\n\r\nNulla vitae consectetur enim, sit amet interdum magna. Suspendisse a aliquet nisl, et lobortis odio. Duis varius pretium eros, id feugiat lacus. Ut quis purus ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc placerat dui at justo interdum varius. Phasellus iaculis ex a finibus volutpat. Nullam porta odio et lacinia feugiat. Fusce vel odio eu ante pharetra tincidunt. Proin lobortis tortor ut turpis fermentum, quis feugiat ligula aliquam. Integer eleifend viverra arcu vitae gravida.','Interesting Film','00:00:16',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(14,'ff',1,8,5,10,44,48,'2020-05-13 10:17:44',1,'content/1588662405698-fesco-02_02(2).mp4','thumbnails/1588662421832-7.jpg','posters/1588662419139-7.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in interdum lorem. Vestibulum malesuada massa scelerisque mattis egestas. Nulla consectetur placerat metus eget tempus. Nunc ac erat et nunc lacinia accumsan sit amet sit amet justo. Donec non vestibulum purus, sed blandit nunc. Maecenas id orci dolor. Aliquam laoreet urna sed lorem pharetra tristique. Etiam a risus vitae enim congue cursus. Morbi sagittis erat urna. In hendrerit at augue in varius. Vestibulum purus mauris, posuere sed erat in, tristique rutrum mi. Etiam elementum varius vestibulum. Nunc id elementum augue. Duis at accumsan nibh, vitae vulputate nunc. Proin pulvinar felis tincidunt, condimentum erat iaculis, tincidunt nisl.\r\n\r\nNulla vitae consectetur enim, sit amet interdum magna. Suspendisse a aliquet nisl, et lobortis odio. Duis varius pretium eros, id feugiat lacus. Ut quis purus ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc placerat dui at justo interdum varius. Phasellus iaculis ex a finibus volutpat. Nullam porta odio et lacinia feugiat. Fusce vel odio eu ante pharetra tincidunt. Proin lobortis tortor ut turpis fermentum, quis feugiat ligula aliquam. Integer eleifend viverra arcu vitae gravida.','Interesting Film','00:00:57',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(15,'gg',1,8,5,10,24,2,'2020-05-13 10:17:51',0,'content/1588662441448-firebase-authentication-tutorial-#1---introduction.mp4','thumbnails/1588662457377-8.jpg','posters/1588662452828-8.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in interdum lorem. Vestibulum malesuada massa scelerisque mattis egestas. Nulla consectetur placerat metus eget tempus. Nunc ac erat et nunc lacinia accumsan sit amet sit amet justo. Donec non vestibulum purus, sed blandit nunc. Maecenas id orci dolor. Aliquam laoreet urna sed lorem pharetra tristique. Etiam a risus vitae enim congue cursus. Morbi sagittis erat urna. In hendrerit at augue in varius. Vestibulum purus mauris, posuere sed erat in, tristique rutrum mi. Etiam elementum varius vestibulum. Nunc id elementum augue. Duis at accumsan nibh, vitae vulputate nunc. Proin pulvinar felis tincidunt, condimentum erat iaculis, tincidunt nisl.\r\n\r\nNulla vitae consectetur enim, sit amet interdum magna. Suspendisse a aliquet nisl, et lobortis odio. Duis varius pretium eros, id feugiat lacus. Ut quis purus ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc placerat dui at justo interdum varius. Phasellus iaculis ex a finibus volutpat. Nullam porta odio et lacinia feugiat. Fusce vel odio eu ante pharetra tincidunt. Proin lobortis tortor ut turpis fermentum, quis feugiat ligula aliquam. Integer eleifend viverra arcu vitae gravida.','Interesting Film','00:06:12',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(16,'hh',2,1,9,35,14,2,'2020-05-13 10:17:53',1,'content/1588662492915-how-to-get-google-maps-api-key-in-1-minute-(2019).mp4','thumbnails/1588662509410-8.jpg','posters/1588662506489-8.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in interdum lorem. Vestibulum malesuada massa scelerisque mattis egestas. Nulla consectetur placerat metus eget tempus. Nunc ac erat et nunc lacinia accumsan sit amet sit amet justo. Donec non vestibulum purus, sed blandit nunc. Maecenas id orci dolor. Aliquam laoreet urna sed lorem pharetra tristique. Etiam a risus vitae enim congue cursus. Morbi sagittis erat urna. In hendrerit at augue in varius. Vestibulum purus mauris, posuere sed erat in, tristique rutrum mi. Etiam elementum varius vestibulum. Nunc id elementum augue. Duis at accumsan nibh, vitae vulputate nunc. Proin pulvinar felis tincidunt, condimentum erat iaculis, tincidunt nisl.\r\n\r\nNulla vitae consectetur enim, sit amet interdum magna. Suspendisse a aliquet nisl, et lobortis odio. Duis varius pretium eros, id feugiat lacus. Ut quis purus ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc placerat dui at justo interdum varius. Phasellus iaculis ex a finibus volutpat. Nullam porta odio et lacinia feugiat. Fusce vel odio eu ante pharetra tincidunt. Proin lobortis tortor ut turpis fermentum, quis feugiat ligula aliquam. Integer eleifend viverra arcu vitae gravida.','Interesting Film','00:01:40',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(17,'jj',2,1,9,36,34,16,'2020-05-13 10:17:55',1,'content/1588662546492-how-to-remove-watermark-on-any-app-for-free.mp4','thumbnails/1588662560875-9.jpg','posters/1588662556568-9.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in interdum lorem. Vestibulum malesuada massa scelerisque mattis egestas. Nulla consectetur placerat metus eget tempus. Nunc ac erat et nunc lacinia accumsan sit amet sit amet justo. Donec non vestibulum purus, sed blandit nunc. Maecenas id orci dolor. Aliquam laoreet urna sed lorem pharetra tristique. Etiam a risus vitae enim congue cursus. Morbi sagittis erat urna. In hendrerit at augue in varius. Vestibulum purus mauris, posuere sed erat in, tristique rutrum mi. Etiam elementum varius vestibulum. Nunc id elementum augue. Duis at accumsan nibh, vitae vulputate nunc. Proin pulvinar felis tincidunt, condimentum erat iaculis, tincidunt nisl.\r\n\r\nNulla vitae consectetur enim, sit amet interdum magna. Suspendisse a aliquet nisl, et lobortis odio. Duis varius pretium eros, id feugiat lacus. Ut quis purus ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc placerat dui at justo interdum varius. Phasellus iaculis ex a finibus volutpat. Nullam porta odio et lacinia feugiat. Fusce vel odio eu ante pharetra tincidunt. Proin lobortis tortor ut turpis fermentum, quis feugiat ligula aliquam. Integer eleifend viverra arcu vitae gravida.','Interesting Film','00:02:05',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(18,'kk',2,1,9,36,45,14,'2020-05-05 00:00:00',0,'content/1588662595984-how-to-setup-android-push-notifications-in-react-native.mp4','thumbnails/1588662616248-10.jpg','posters/1588662606736-10.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in interdum lorem. Vestibulum malesuada massa scelerisque mattis egestas. Nulla consectetur placerat metus eget tempus. Nunc ac erat et nunc lacinia accumsan sit amet sit amet justo. Donec non vestibulum purus, sed blandit nunc. Maecenas id orci dolor. Aliquam laoreet urna sed lorem pharetra tristique. Etiam a risus vitae enim congue cursus. Morbi sagittis erat urna. In hendrerit at augue in varius. Vestibulum purus mauris, posuere sed erat in, tristique rutrum mi. Etiam elementum varius vestibulum. Nunc id elementum augue. Duis at accumsan nibh, vitae vulputate nunc. Proin pulvinar felis tincidunt, condimentum erat iaculis, tincidunt nisl.\r\n\r\nNulla vitae consectetur enim, sit amet interdum magna. Suspendisse a aliquet nisl, et lobortis odio. Duis varius pretium eros, id feugiat lacus. Ut quis purus ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc placerat dui at justo interdum varius. Phasellus iaculis ex a finibus volutpat. Nullam porta odio et lacinia feugiat. Fusce vel odio eu ante pharetra tincidunt. Proin lobortis tortor ut turpis fermentum, quis feugiat ligula aliquam. Integer eleifend viverra arcu vitae gravida.','Interesting Film','00:02:52',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(19,'ll',2,1,10,33,56,48,'2020-05-13 10:17:58',1,'content/1588662660547-how-to-use-internet-connections-in-android-emulator_avd.mp4','thumbnails/1588662675948-9.jpg','posters/1588662672563-9.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in interdum lorem. Vestibulum malesuada massa scelerisque mattis egestas. Nulla consectetur placerat metus eget tempus. Nunc ac erat et nunc lacinia accumsan sit amet sit amet justo. Donec non vestibulum purus, sed blandit nunc. Maecenas id orci dolor. Aliquam laoreet urna sed lorem pharetra tristique. Etiam a risus vitae enim congue cursus. Morbi sagittis erat urna. In hendrerit at augue in varius. Vestibulum purus mauris, posuere sed erat in, tristique rutrum mi. Etiam elementum varius vestibulum. Nunc id elementum augue. Duis at accumsan nibh, vitae vulputate nunc. Proin pulvinar felis tincidunt, condimentum erat iaculis, tincidunt nisl.\r\n\r\nNulla vitae consectetur enim, sit amet interdum magna. Suspendisse a aliquet nisl, et lobortis odio. Duis varius pretium eros, id feugiat lacus. Ut quis purus ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc placerat dui at justo interdum varius. Phasellus iaculis ex a finibus volutpat. Nullam porta odio et lacinia feugiat. Fusce vel odio eu ante pharetra tincidunt. Proin lobortis tortor ut turpis fermentum, quis feugiat ligula aliquam. Integer eleifend viverra arcu vitae gravida.','Interesting Film','00:01:18',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(20,'zz',2,1,10,34,104,25,'2020-05-13 10:18:00',1,'content/1588662703635-learn-redux-saga---introduction---1-of-8.mp4','thumbnails/1588662717593-10.jpg','posters/1588662714114-10.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in interdum lorem. Vestibulum malesuada massa scelerisque mattis egestas. Nulla consectetur placerat metus eget tempus. Nunc ac erat et nunc lacinia accumsan sit amet sit amet justo. Donec non vestibulum purus, sed blandit nunc. Maecenas id orci dolor. Aliquam laoreet urna sed lorem pharetra tristique. Etiam a risus vitae enim congue cursus. Morbi sagittis erat urna. In hendrerit at augue in varius. Vestibulum purus mauris, posuere sed erat in, tristique rutrum mi. Etiam elementum varius vestibulum. Nunc id elementum augue. Duis at accumsan nibh, vitae vulputate nunc. Proin pulvinar felis tincidunt, condimentum erat iaculis, tincidunt nisl.\r\n\r\nNulla vitae consectetur enim, sit amet interdum magna. Suspendisse a aliquet nisl, et lobortis odio. Duis varius pretium eros, id feugiat lacus. Ut quis purus ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc placerat dui at justo interdum varius. Phasellus iaculis ex a finibus volutpat. Nullam porta odio et lacinia feugiat. Fusce vel odio eu ante pharetra tincidunt. Proin lobortis tortor ut turpis fermentum, quis feugiat ligula aliquam. Integer eleifend viverra arcu vitae gravida.','Interesting Film','00:02:16',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(21,'xx',2,1,10,34,52,51,'2020-05-13 10:18:06',0,'content/1588662744977-multiple-chat-client-on-server-in-java-using-multi-threading-and-socket.mp4','thumbnails/1588662766128-ch.jpg','posters/1588662762455-ch.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in interdum lorem. Vestibulum malesuada massa scelerisque mattis egestas. Nulla consectetur placerat metus eget tempus. Nunc ac erat et nunc lacinia accumsan sit amet sit amet justo. Donec non vestibulum purus, sed blandit nunc. Maecenas id orci dolor. Aliquam laoreet urna sed lorem pharetra tristique. Etiam a risus vitae enim congue cursus. Morbi sagittis erat urna. In hendrerit at augue in varius. Vestibulum purus mauris, posuere sed erat in, tristique rutrum mi. Etiam elementum varius vestibulum. Nunc id elementum augue. Duis at accumsan nibh, vitae vulputate nunc. Proin pulvinar felis tincidunt, condimentum erat iaculis, tincidunt nisl.\r\n\r\nNulla vitae consectetur enim, sit amet interdum magna. Suspendisse a aliquet nisl, et lobortis odio. Duis varius pretium eros, id feugiat lacus. Ut quis purus ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc placerat dui at justo interdum varius. Phasellus iaculis ex a finibus volutpat. Nullam porta odio et lacinia feugiat. Fusce vel odio eu ante pharetra tincidunt. Proin lobortis tortor ut turpis fermentum, quis feugiat ligula aliquam. Integer eleifend viverra arcu vitae gravida.','Interesting Film','00:04:05',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(22,'cc',3,9,11,31,96,45,'2020-05-13 10:18:04',1,'content/1588662803965-how-to-use-internet-connections-in-android-emulator_avd.mp4','thumbnails/1588662824176-ch.jpg','posters/1588662815288-ch.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in interdum lorem. Vestibulum malesuada massa scelerisque mattis egestas. Nulla consectetur placerat metus eget tempus. Nunc ac erat et nunc lacinia accumsan sit amet sit amet justo. Donec non vestibulum purus, sed blandit nunc. Maecenas id orci dolor. Aliquam laoreet urna sed lorem pharetra tristique. Etiam a risus vitae enim congue cursus. Morbi sagittis erat urna. In hendrerit at augue in varius. Vestibulum purus mauris, posuere sed erat in, tristique rutrum mi. Etiam elementum varius vestibulum. Nunc id elementum augue. Duis at accumsan nibh, vitae vulputate nunc. Proin pulvinar felis tincidunt, condimentum erat iaculis, tincidunt nisl.\r\n\r\nNulla vitae consectetur enim, sit amet interdum magna. Suspendisse a aliquet nisl, et lobortis odio. Duis varius pretium eros, id feugiat lacus. Ut quis purus ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc placerat dui at justo interdum varius. Phasellus iaculis ex a finibus volutpat. Nullam porta odio et lacinia feugiat. Fusce vel odio eu ante pharetra tincidunt. Proin lobortis tortor ut turpis fermentum, quis feugiat ligula aliquam. Integer eleifend viverra arcu vitae gravida.','Interesting Film','00:01:18',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(23,'vv',3,9,11,32,5,48,'2020-05-13 10:18:19',1,'content/1588662850733-intermediate-java-tutorial---38---awesome-instant-messaging-program-with-streams-and-sockets.mp4','thumbnails/1588662869154-ch2.jpg','posters/1588662865598-ch2.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in interdum lorem. Vestibulum malesuada massa scelerisque mattis egestas. Nulla consectetur placerat metus eget tempus. Nunc ac erat et nunc lacinia accumsan sit amet sit amet justo. Donec non vestibulum purus, sed blandit nunc. Maecenas id orci dolor. Aliquam laoreet urna sed lorem pharetra tristique. Etiam a risus vitae enim congue cursus. Morbi sagittis erat urna. In hendrerit at augue in varius. Vestibulum purus mauris, posuere sed erat in, tristique rutrum mi. Etiam elementum varius vestibulum. Nunc id elementum augue. Duis at accumsan nibh, vitae vulputate nunc. Proin pulvinar felis tincidunt, condimentum erat iaculis, tincidunt nisl.\r\n\r\nNulla vitae consectetur enim, sit amet interdum magna. Suspendisse a aliquet nisl, et lobortis odio. Duis varius pretium eros, id feugiat lacus. Ut quis purus ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc placerat dui at justo interdum varius. Phasellus iaculis ex a finibus volutpat. Nullam porta odio et lacinia feugiat. Fusce vel odio eu ante pharetra tincidunt. Proin lobortis tortor ut turpis fermentum, quis feugiat ligula aliquam. Integer eleifend viverra arcu vitae gravida.','Interesting Film','00:08:58',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(24,'bb',3,9,12,29,83,15,'2020-05-13 10:18:22',1,'content/1588662902184-react-native-maps-tutorial--[-installing-and-setting-up-react-native-maps-]-#2.mp4','thumbnails/1588662923504-ch2.jpg','posters/1588662918927-ch2.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in interdum lorem. Vestibulum malesuada massa scelerisque mattis egestas. Nulla consectetur placerat metus eget tempus. Nunc ac erat et nunc lacinia accumsan sit amet sit amet justo. Donec non vestibulum purus, sed blandit nunc. Maecenas id orci dolor. Aliquam laoreet urna sed lorem pharetra tristique. Etiam a risus vitae enim congue cursus. Morbi sagittis erat urna. In hendrerit at augue in varius. Vestibulum purus mauris, posuere sed erat in, tristique rutrum mi. Etiam elementum varius vestibulum. Nunc id elementum augue. Duis at accumsan nibh, vitae vulputate nunc. Proin pulvinar felis tincidunt, condimentum erat iaculis, tincidunt nisl.\r\n\r\nNulla vitae consectetur enim, sit amet interdum magna. Suspendisse a aliquet nisl, et lobortis odio. Duis varius pretium eros, id feugiat lacus. Ut quis purus ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc placerat dui at justo interdum varius. Phasellus iaculis ex a finibus volutpat. Nullam porta odio et lacinia feugiat. Fusce vel odio eu ante pharetra tincidunt. Proin lobortis tortor ut turpis fermentum, quis feugiat ligula aliquam. Integer eleifend viverra arcu vitae gravida.','Interesting Film','00:02:54',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(25,'nn',3,9,12,30,58,17,'2020-05-13 10:18:14',1,'content/1588662948111-react-native-recipes---volume-1-_-storing-and-retrieving-data-locally-_-packtpub.com.mp4','thumbnails/1588662970059-ir.jpg','posters/1588662966742-ir.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in interdum lorem. Vestibulum malesuada massa scelerisque mattis egestas. Nulla consectetur placerat metus eget tempus. Nunc ac erat et nunc lacinia accumsan sit amet sit amet justo. Donec non vestibulum purus, sed blandit nunc. Maecenas id orci dolor. Aliquam laoreet urna sed lorem pharetra tristique. Etiam a risus vitae enim congue cursus. Morbi sagittis erat urna. In hendrerit at augue in varius. Vestibulum purus mauris, posuere sed erat in, tristique rutrum mi. Etiam elementum varius vestibulum. Nunc id elementum augue. Duis at accumsan nibh, vitae vulputate nunc. Proin pulvinar felis tincidunt, condimentum erat iaculis, tincidunt nisl.\r\n\r\nNulla vitae consectetur enim, sit amet interdum magna. Suspendisse a aliquet nisl, et lobortis odio. Duis varius pretium eros, id feugiat lacus. Ut quis purus ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc placerat dui at justo interdum varius. Phasellus iaculis ex a finibus volutpat. Nullam porta odio et lacinia feugiat. Fusce vel odio eu ante pharetra tincidunt. Proin lobortis tortor ut turpis fermentum, quis feugiat ligula aliquam. Integer eleifend viverra arcu vitae gravida.','Interesting Film','00:05:30',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(26,'mm',4,10,13,27,53,41,'2020-05-13 10:18:24',1,'content/1588663008904-react-native-tutorial---state-&-redux-#1---redux-introduction.mp4','thumbnails/1588663024144-ir.jpg','posters/1588663020754-ir.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in interdum lorem. Vestibulum malesuada massa scelerisque mattis egestas. Nulla consectetur placerat metus eget tempus. Nunc ac erat et nunc lacinia accumsan sit amet sit amet justo. Donec non vestibulum purus, sed blandit nunc. Maecenas id orci dolor. Aliquam laoreet urna sed lorem pharetra tristique. Etiam a risus vitae enim congue cursus. Morbi sagittis erat urna. In hendrerit at augue in varius. Vestibulum purus mauris, posuere sed erat in, tristique rutrum mi. Etiam elementum varius vestibulum. Nunc id elementum augue. Duis at accumsan nibh, vitae vulputate nunc. Proin pulvinar felis tincidunt, condimentum erat iaculis, tincidunt nisl.\r\n\r\nNulla vitae consectetur enim, sit amet interdum magna. Suspendisse a aliquet nisl, et lobortis odio. Duis varius pretium eros, id feugiat lacus. Ut quis purus ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc placerat dui at justo interdum varius. Phasellus iaculis ex a finibus volutpat. Nullam porta odio et lacinia feugiat. Fusce vel odio eu ante pharetra tincidunt. Proin lobortis tortor ut turpis fermentum, quis feugiat ligula aliquam. Integer eleifend viverra arcu vitae gravida.','Interesting Film','00:02:19',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(27,'qwe',4,10,13,28,240,48,'2020-05-13 10:18:12',1,'content/1588663055093-react-native-tutorial---state-&-redux-#2---create-an-app.mp4','thumbnails/1588663105561-ir2.jpg','posters/1588663097807-ir2.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in interdum lorem. Vestibulum malesuada massa scelerisque mattis egestas. Nulla consectetur placerat metus eget tempus. Nunc ac erat et nunc lacinia accumsan sit amet sit amet justo. Donec non vestibulum purus, sed blandit nunc. Maecenas id orci dolor. Aliquam laoreet urna sed lorem pharetra tristique. Etiam a risus vitae enim congue cursus. Morbi sagittis erat urna. In hendrerit at augue in varius. Vestibulum purus mauris, posuere sed erat in, tristique rutrum mi. Etiam elementum varius vestibulum. Nunc id elementum augue. Duis at accumsan nibh, vitae vulputate nunc. Proin pulvinar felis tincidunt, condimentum erat iaculis, tincidunt nisl.\r\n\r\nNulla vitae consectetur enim, sit amet interdum magna. Suspendisse a aliquet nisl, et lobortis odio. Duis varius pretium eros, id feugiat lacus. Ut quis purus ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc placerat dui at justo interdum varius. Phasellus iaculis ex a finibus volutpat. Nullam porta odio et lacinia feugiat. Fusce vel odio eu ante pharetra tincidunt. Proin lobortis tortor ut turpis fermentum, quis feugiat ligula aliquam. Integer eleifend viverra arcu vitae gravida.','Interesting Film','00:05:43',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(28,'asd',4,10,14,25,23,96,'2020-05-13 10:18:28',1,'content/1588663140014-#2-root-screen---wix-react-native-navigation-2.mp4','thumbnails/1588663169729-ir2.jpg','posters/1588663166738-ir2.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in interdum lorem. Vestibulum malesuada massa scelerisque mattis egestas. Nulla consectetur placerat metus eget tempus. Nunc ac erat et nunc lacinia accumsan sit amet sit amet justo. Donec non vestibulum purus, sed blandit nunc. Maecenas id orci dolor. Aliquam laoreet urna sed lorem pharetra tristique. Etiam a risus vitae enim congue cursus. Morbi sagittis erat urna. In hendrerit at augue in varius. Vestibulum purus mauris, posuere sed erat in, tristique rutrum mi. Etiam elementum varius vestibulum. Nunc id elementum augue. Duis at accumsan nibh, vitae vulputate nunc. Proin pulvinar felis tincidunt, condimentum erat iaculis, tincidunt nisl.\r\n\r\nNulla vitae consectetur enim, sit amet interdum magna. Suspendisse a aliquet nisl, et lobortis odio. Duis varius pretium eros, id feugiat lacus. Ut quis purus ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc placerat dui at justo interdum varius. Phasellus iaculis ex a finibus volutpat. Nullam porta odio et lacinia feugiat. Fusce vel odio eu ante pharetra tincidunt. Proin lobortis tortor ut turpis fermentum, quis feugiat ligula aliquam. Integer eleifend viverra arcu vitae gravida.','Interesting Film','00:02:27',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(29,'zxc',4,10,14,26,36,25,'2020-05-13 10:18:26',1,'content/1588663198909-3d-modelling-using-autocad_-model-1.mp4','thumbnails/1588663219144-kur.jpg','posters/1588663216297-kur.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in interdum lorem. Vestibulum malesuada massa scelerisque mattis egestas. Nulla consectetur placerat metus eget tempus. Nunc ac erat et nunc lacinia accumsan sit amet sit amet justo. Donec non vestibulum purus, sed blandit nunc. Maecenas id orci dolor. Aliquam laoreet urna sed lorem pharetra tristique. Etiam a risus vitae enim congue cursus. Morbi sagittis erat urna. In hendrerit at augue in varius. Vestibulum purus mauris, posuere sed erat in, tristique rutrum mi. Etiam elementum varius vestibulum. Nunc id elementum augue. Duis at accumsan nibh, vitae vulputate nunc. Proin pulvinar felis tincidunt, condimentum erat iaculis, tincidunt nisl.\r\n\r\nNulla vitae consectetur enim, sit amet interdum magna. Suspendisse a aliquet nisl, et lobortis odio. Duis varius pretium eros, id feugiat lacus. Ut quis purus ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc placerat dui at justo interdum varius. Phasellus iaculis ex a finibus volutpat. Nullam porta odio et lacinia feugiat. Fusce vel odio eu ante pharetra tincidunt. Proin lobortis tortor ut turpis fermentum, quis feugiat ligula aliquam. Integer eleifend viverra arcu vitae gravida.','Interesting Film','00:04:38',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(30,'wer',5,11,15,23,45,84,'2020-05-13 10:18:11',1,'content/1588663251562-3ds-max,-v-ray,-&-rayfire-test.mp4','thumbnails/1588663271953-kur.jpg','posters/1588663266490-kur.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in interdum lorem. Vestibulum malesuada massa scelerisque mattis egestas. Nulla consectetur placerat metus eget tempus. Nunc ac erat et nunc lacinia accumsan sit amet sit amet justo. Donec non vestibulum purus, sed blandit nunc. Maecenas id orci dolor. Aliquam laoreet urna sed lorem pharetra tristique. Etiam a risus vitae enim congue cursus. Morbi sagittis erat urna. In hendrerit at augue in varius. Vestibulum purus mauris, posuere sed erat in, tristique rutrum mi. Etiam elementum varius vestibulum. Nunc id elementum augue. Duis at accumsan nibh, vitae vulputate nunc. Proin pulvinar felis tincidunt, condimentum erat iaculis, tincidunt nisl.\r\n\r\nNulla vitae consectetur enim, sit amet interdum magna. Suspendisse a aliquet nisl, et lobortis odio. Duis varius pretium eros, id feugiat lacus. Ut quis purus ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc placerat dui at justo interdum varius. Phasellus iaculis ex a finibus volutpat. Nullam porta odio et lacinia feugiat. Fusce vel odio eu ante pharetra tincidunt. Proin lobortis tortor ut turpis fermentum, quis feugiat ligula aliquam. Integer eleifend viverra arcu vitae gravida.','Interesting Film','00:00:44',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(31,'sdf',5,11,15,24,5,48,'2020-05-13 10:18:16',1,'content/1588663291823-augmented-reality-for-packaging---shazam-x-bombay-sapphire.mp4','thumbnails/1588663307194-kur2.jpg','posters/1588663304195-kur2.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in interdum lorem. Vestibulum malesuada massa scelerisque mattis egestas. Nulla consectetur placerat metus eget tempus. Nunc ac erat et nunc lacinia accumsan sit amet sit amet justo. Donec non vestibulum purus, sed blandit nunc. Maecenas id orci dolor. Aliquam laoreet urna sed lorem pharetra tristique. Etiam a risus vitae enim congue cursus. Morbi sagittis erat urna. In hendrerit at augue in varius. Vestibulum purus mauris, posuere sed erat in, tristique rutrum mi. Etiam elementum varius vestibulum. Nunc id elementum augue. Duis at accumsan nibh, vitae vulputate nunc. Proin pulvinar felis tincidunt, condimentum erat iaculis, tincidunt nisl.\r\n\r\nNulla vitae consectetur enim, sit amet interdum magna. Suspendisse a aliquet nisl, et lobortis odio. Duis varius pretium eros, id feugiat lacus. Ut quis purus ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc placerat dui at justo interdum varius. Phasellus iaculis ex a finibus volutpat. Nullam porta odio et lacinia feugiat. Fusce vel odio eu ante pharetra tincidunt. Proin lobortis tortor ut turpis fermentum, quis feugiat ligula aliquam. Integer eleifend viverra arcu vitae gravida.','Interesting Film','00:01:25',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(32,'xcv',5,11,16,22,67,15,'2020-05-13 10:19:03',1,'content/1588663330484-cutting-meshes-in-unity.mp4','thumbnails/1588663348702-kur2.jpg','posters/1588663345239-kur2.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in interdum lorem. Vestibulum malesuada massa scelerisque mattis egestas. Nulla consectetur placerat metus eget tempus. Nunc ac erat et nunc lacinia accumsan sit amet sit amet justo. Donec non vestibulum purus, sed blandit nunc. Maecenas id orci dolor. Aliquam laoreet urna sed lorem pharetra tristique. Etiam a risus vitae enim congue cursus. Morbi sagittis erat urna. In hendrerit at augue in varius. Vestibulum purus mauris, posuere sed erat in, tristique rutrum mi. Etiam elementum varius vestibulum. Nunc id elementum augue. Duis at accumsan nibh, vitae vulputate nunc. Proin pulvinar felis tincidunt, condimentum erat iaculis, tincidunt nisl.\r\n\r\nNulla vitae consectetur enim, sit amet interdum magna. Suspendisse a aliquet nisl, et lobortis odio. Duis varius pretium eros, id feugiat lacus. Ut quis purus ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc placerat dui at justo interdum varius. Phasellus iaculis ex a finibus volutpat. Nullam porta odio et lacinia feugiat. Fusce vel odio eu ante pharetra tincidunt. Proin lobortis tortor ut turpis fermentum, quis feugiat ligula aliquam. Integer eleifend viverra arcu vitae gravida.','Interesting Film','00:04:51',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(33,'ert',6,2,17,19,79,26,'2020-05-13 10:19:01',1,'content/1588663383330-easy-email-sender---tutorial-_unity-5.mp4','thumbnails/1588663396782-tur.jpg','posters/1588663393870-tur.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in interdum lorem. Vestibulum malesuada massa scelerisque mattis egestas. Nulla consectetur placerat metus eget tempus. Nunc ac erat et nunc lacinia accumsan sit amet sit amet justo. Donec non vestibulum purus, sed blandit nunc. Maecenas id orci dolor. Aliquam laoreet urna sed lorem pharetra tristique. Etiam a risus vitae enim congue cursus. Morbi sagittis erat urna. In hendrerit at augue in varius. Vestibulum purus mauris, posuere sed erat in, tristique rutrum mi. Etiam elementum varius vestibulum. Nunc id elementum augue. Duis at accumsan nibh, vitae vulputate nunc. Proin pulvinar felis tincidunt, condimentum erat iaculis, tincidunt nisl.\r\n\r\nNulla vitae consectetur enim, sit amet interdum magna. Suspendisse a aliquet nisl, et lobortis odio. Duis varius pretium eros, id feugiat lacus. Ut quis purus ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc placerat dui at justo interdum varius. Phasellus iaculis ex a finibus volutpat. Nullam porta odio et lacinia feugiat. Fusce vel odio eu ante pharetra tincidunt. Proin lobortis tortor ut turpis fermentum, quis feugiat ligula aliquam. Integer eleifend viverra arcu vitae gravida.','Interesting Film','00:02:39',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(34,'dfg',6,2,17,20,4,16,'2020-05-13 10:19:07',1,'content/1588663423555-fesco-02_02(2).mp4','thumbnails/1588663442312-tur.jpg','posters/1588663438533-tur.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in interdum lorem. Vestibulum malesuada massa scelerisque mattis egestas. Nulla consectetur placerat metus eget tempus. Nunc ac erat et nunc lacinia accumsan sit amet sit amet justo. Donec non vestibulum purus, sed blandit nunc. Maecenas id orci dolor. Aliquam laoreet urna sed lorem pharetra tristique. Etiam a risus vitae enim congue cursus. Morbi sagittis erat urna. In hendrerit at augue in varius. Vestibulum purus mauris, posuere sed erat in, tristique rutrum mi. Etiam elementum varius vestibulum. Nunc id elementum augue. Duis at accumsan nibh, vitae vulputate nunc. Proin pulvinar felis tincidunt, condimentum erat iaculis, tincidunt nisl.\r\n\r\nNulla vitae consectetur enim, sit amet interdum magna. Suspendisse a aliquet nisl, et lobortis odio. Duis varius pretium eros, id feugiat lacus. Ut quis purus ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc placerat dui at justo interdum varius. Phasellus iaculis ex a finibus volutpat. Nullam porta odio et lacinia feugiat. Fusce vel odio eu ante pharetra tincidunt. Proin lobortis tortor ut turpis fermentum, quis feugiat ligula aliquam. Integer eleifend viverra arcu vitae gravida.','Interesting Film','00:00:57',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(35,'cvb',6,2,18,17,3,84,'2020-05-13 10:19:05',1,'content/1588663474876-firebase-authentication-tutorial-#1---introduction.mp4','thumbnails/1588663493135-tur2.jpg','posters/1588663486545-tur2.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in interdum lorem. Vestibulum malesuada massa scelerisque mattis egestas. Nulla consectetur placerat metus eget tempus. Nunc ac erat et nunc lacinia accumsan sit amet sit amet justo. Donec non vestibulum purus, sed blandit nunc. Maecenas id orci dolor. Aliquam laoreet urna sed lorem pharetra tristique. Etiam a risus vitae enim congue cursus. Morbi sagittis erat urna. In hendrerit at augue in varius. Vestibulum purus mauris, posuere sed erat in, tristique rutrum mi. Etiam elementum varius vestibulum. Nunc id elementum augue. Duis at accumsan nibh, vitae vulputate nunc. Proin pulvinar felis tincidunt, condimentum erat iaculis, tincidunt nisl.\r\n\r\nNulla vitae consectetur enim, sit amet interdum magna. Suspendisse a aliquet nisl, et lobortis odio. Duis varius pretium eros, id feugiat lacus. Ut quis purus ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc placerat dui at justo interdum varius. Phasellus iaculis ex a finibus volutpat. Nullam porta odio et lacinia feugiat. Fusce vel odio eu ante pharetra tincidunt. Proin lobortis tortor ut turpis fermentum, quis feugiat ligula aliquam. Integer eleifend viverra arcu vitae gravida.','Interesting Film','00:06:12',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(36,'rty',6,2,18,18,5,26,'2020-05-05 02:00:00',1,'content/1588663514822-how-to-get-google-maps-api-key-in-1-minute-(2019).mp4','thumbnails/1588663525567-tur2.jpg','posters/1588663522414-tur2.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in interdum lorem. Vestibulum malesuada massa scelerisque mattis egestas. Nulla consectetur placerat metus eget tempus. Nunc ac erat et nunc lacinia accumsan sit amet sit amet justo. Donec non vestibulum purus, sed blandit nunc. Maecenas id orci dolor. Aliquam laoreet urna sed lorem pharetra tristique. Etiam a risus vitae enim congue cursus. Morbi sagittis erat urna. In hendrerit at augue in varius. Vestibulum purus mauris, posuere sed erat in, tristique rutrum mi. Etiam elementum varius vestibulum. Nunc id elementum augue. Duis at accumsan nibh, vitae vulputate nunc. Proin pulvinar felis tincidunt, condimentum erat iaculis, tincidunt nisl.\r\n\r\nNulla vitae consectetur enim, sit amet interdum magna. Suspendisse a aliquet nisl, et lobortis odio. Duis varius pretium eros, id feugiat lacus. Ut quis purus ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc placerat dui at justo interdum varius. Phasellus iaculis ex a finibus volutpat. Nullam porta odio et lacinia feugiat. Fusce vel odio eu ante pharetra tincidunt. Proin lobortis tortor ut turpis fermentum, quis feugiat ligula aliquam. Integer eleifend viverra arcu vitae gravida.','Interesting Film','00:01:40',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(37,'test',1,4,1,1,80,52,'2020-05-05 22:00:00',1,'content/1588666349589-aaa_video.mp4','thumbnails/1588666382874-chinese-man.jpg','posters/1588666379843-chinese-man.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in interdum lorem. Vestibulum malesuada massa scelerisque mattis egestas. Nulla consectetur placerat metus eget tempus. Nunc ac erat et nunc lacinia accumsan sit amet sit amet justo. Donec non vestibulum purus, sed blandit nunc. Maecenas id orci dolor. Aliquam laoreet urna sed lorem pharetra tristique. Etiam a risus vitae enim congue cursus. Morbi sagittis erat urna. In hendrerit at augue in varius. Vestibulum purus mauris, posuere sed erat in, tristique rutrum mi. Etiam elementum varius vestibulum. Nunc id elementum augue. Duis at accumsan nibh, vitae vulputate nunc. Proin pulvinar felis tincidunt, condimentum erat iaculis, tincidunt nisl.\r\n\r\nNulla vitae consectetur enim, sit amet interdum magna. Suspendisse a aliquet nisl, et lobortis odio. Duis varius pretium eros, id feugiat lacus. Ut quis purus ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc placerat dui at justo interdum varius. Phasellus iaculis ex a finibus volutpat. Nullam porta odio et lacinia feugiat. Fusce vel odio eu ante pharetra tincidunt. Proin lobortis tortor ut turpis fermentum, quis feugiat ligula aliquam. Integer eleifend viverra arcu vitae gravida.','Interesting Film','00:06:33',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(38,'sampleMusic',1,4,1,1,74,43,'2020-05-05 01:00:00',0,'content/1588667032033-faure-dolly-suite-1-berceuse.mp3','thumbnails/1588667072655-ch2.jpg','posters/1588667069012-ch2.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in interdum lorem. Vestibulum malesuada massa scelerisque mattis egestas. Nulla consectetur placerat metus eget tempus. Nunc ac erat et nunc lacinia accumsan sit amet sit amet justo. Donec non vestibulum purus, sed blandit nunc. Maecenas id orci dolor. Aliquam laoreet urna sed lorem pharetra tristique. Etiam a risus vitae enim congue cursus. Morbi sagittis erat urna. In hendrerit at augue in varius. Vestibulum purus mauris, posuere sed erat in, tristique rutrum mi. Etiam elementum varius vestibulum. Nunc id elementum augue. Duis at accumsan nibh, vitae vulputate nunc. Proin pulvinar felis tincidunt, condimentum erat iaculis, tincidunt nisl.\r\n\r\nNulla vitae consectetur enim, sit amet interdum magna. Suspendisse a aliquet nisl, et lobortis odio. Duis varius pretium eros, id feugiat lacus. Ut quis purus ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc placerat dui at justo interdum varius. Phasellus iaculis ex a finibus volutpat. Nullam porta odio et lacinia feugiat. Fusce vel odio eu ante pharetra tincidunt. Proin lobortis tortor ut turpis fermentum, quis feugiat ligula aliquam. Integer eleifend viverra arcu vitae gravida.','Interesting Film','00:02:38',NULL,'1',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(39,'sampleTest',1,4,8,16,81,61,'2020-05-13 10:18:57',0,'content/1588668249520-firebase.mp4','thumbnails/1588668275213-ir2.jpg','posters/1588668270685-ir2.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in interdum lorem. Vestibulum malesuada massa scelerisque mattis egestas. Nulla consectetur placerat metus eget tempus. Nunc ac erat et nunc lacinia accumsan sit amet sit amet justo. Donec non vestibulum purus, sed blandit nunc. Maecenas id orci dolor. Aliquam laoreet urna sed lorem pharetra tristique. Etiam a risus vitae enim congue cursus. Morbi sagittis erat urna. In hendrerit at augue in varius. Vestibulum purus mauris, posuere sed erat in, tristique rutrum mi. Etiam elementum varius vestibulum. Nunc id elementum augue. Duis at accumsan nibh, vitae vulputate nunc. Proin pulvinar felis tincidunt, condimentum erat iaculis, tincidunt nisl.\r\n\r\nNulla vitae consectetur enim, sit amet interdum magna. Suspendisse a aliquet nisl, et lobortis odio. Duis varius pretium eros, id feugiat lacus. Ut quis purus ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc placerat dui at justo interdum varius. Phasellus iaculis ex a finibus volutpat. Nullam porta odio et lacinia feugiat. Fusce vel odio eu ante pharetra tincidunt. Proin lobortis tortor ut turpis fermentum, quis feugiat ligula aliquam. Integer eleifend viverra arcu vitae gravida.','Interesting Film','00:06:12',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(40,'AliFadhil',3,9,19,37,100,86,'2020-05-13 10:18:42',1,'content/1588938691093-22.mp4','thumbnails/1588938706310-screenshot_1588900734.png','posters/1588938702739-screenshot_1588900734.png',NULL,'tttttttttttt','00:06:09',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(41,'ANother AliFadhil',3,9,19,38,97,84,'2020-05-13 10:18:39',1,'content/1588938739973-video3f6af60a-d796-426f-a91f-c32d2c71885cvideo.mp4','thumbnails/1588938753036-screenshot_1588900734.png','posters/1588938749170-screenshot_1588900734.png',NULL,'asdww','00:00:47',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(42,'test_movie',3,9,11,32,1,0,'2020-05-13 10:19:11',1,'content/1589258560675-fe.mp4','thumbnails/1589258607215-233307.jpg','posters/1589258601200-233307.jpg',NULL,NULL,'00:00:16',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(43,'qwqewqweqe',3,9,11,32,1,1,'2020-05-13 10:18:37',1,'content/1589270512704-(2).mp4','thumbnails/1589270543585-1.jpg','posters/1589270540233-1.jpg',NULL,NULL,'00:02:27',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(44,'piopuiop',3,9,11,32,2,0,'2020-05-13 10:19:19',1,'content/1589270584234-(01).mp3','thumbnails/1589270615504-2.jpg','posters/1589270611304-2.jpg',NULL,NULL,'00:02:38',NULL,'1',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(45,'tqweqweq',3,9,11,31,1,0,'2020-05-13 10:19:17',1,'content/1589272270920-(32).mp4','thumbnails/1589272317216-8.jpg','posters/1589272311905-3.jpg',NULL,NULL,'00:04:53',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(46,'NEW audio',3,9,11,32,1,0,'2020-05-13 10:19:22',1,'content/1589279525383-(4).mp3',NULL,NULL,NULL,NULL,'00:00:53',NULL,'1',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(47,'asdasdasdasd',3,9,11,32,1,0,'2020-05-13 10:19:25',0,'content/1589281850032-(5).mp3','thumbnails/music_thumbnail.jpg',NULL,'ssssssssssssssssssssssd','ddddddddddd','00:00:27',NULL,'1',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(48,'qw',3,9,11,31,2,0,'2020-05-13 10:18:35',0,'content/1589283261801-(6).mp3','thumbnails/music_thumbnail.jpg',NULL,'asdasdasdasd','asa','00:01:59',NULL,'1',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(49,'aaaaaaaaaaaa',3,9,11,32,1,0,'2020-05-13 10:18:34',0,'content/1589286229082-(36).mp4','thumbnails/1589286250408-tur.jpg','posters/1589286246788-tur.jpg','vvvvvvvvvvvvvvvvvvvvvvvvvvvv','ssssssssssss','00:01:55',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(50,'ooooooooooo',3,9,11,32,1,0,'2020-05-12 22:22:22',0,'content/1589290609883-(3).mp3','thumbnails/music_thumbnail.jpg',NULL,'oooooooooo','oo','00:00:27',NULL,'1',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(51,'vvvvvvv',3,9,11,32,0,0,'2020-05-12 21:40:20',0,'content/1589290820170-(31).mp4','thumbnails/1589290842262-8.jpg','posters/1589290835928-7.jpg','vvvvvvvv','vv','00:00:58',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(52,'ccxxxxxxxxx',1,4,1,1,0,1,'2020-05-13 21:01:11',0,'content/1589374871364-(32).mp4','thumbnails/1589374930743-9.jpg','posters/1589374926941-9.jpg','ddddddddddddd','dd','00:04:53',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(54,'sfdsfdsf',1,4,1,2,0,0,'2020-06-05 06:08:36',0,'content/1591317514731-sick-media.mp4','thumbnails/1591317541684-untitled.jpg','posters/1591317535879-untitled.jpg','asdfasdfasd','sadfsaf','00:00:22',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(55,'jhkjh',6,2,17,20,0,0,'2020-06-05 11:34:47',0,'content/492605df408eb15304ad0617a470feda','thumbnails/music_thumbnail.jpg',NULL,'nmbnmb','nbnmb','00:00:27',NULL,'1',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(56,'aa',5,11,15,24,0,0,'2020-06-05 11:38:31',0,'content/cf0c57418bdfee34c2395dedb6893ad4','thumbnails/music_thumbnail.jpg',NULL,'bbbbbbbb','bbbbbbbbbbbbbbbbbb','00:00:27',NULL,'1',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(57,'jkkhjk',6,2,17,20,0,0,'2020-06-05 11:47:08',0,'content/undefined','thumbnails/music_thumbnail.jpg',NULL,'m,nm','m,nmnm,','00:00:27',NULL,'1',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),
(58,'jhjhjk',5,11,15,23,0,0,'2020-06-05 13:39:06',0,'content/undefined','thumbnails/music_thumbnail.jpg',NULL,'hjkhjk','hjkhjkhjkh','00:00:27',NULL,'1',NULL,NULL,NULL,NULL,0,NULL,'jkhjk','hjkhjkhjk','jkhjkhjkh'),
(59,'PHP Developer',6,2,17,19,0,0,'2020-06-05 14:04:47',0,'content/undefined','thumbnails/1591352093198-untitled.jpg',NULL,'nnnnnnnn','mmmmmmmm','00:00:22',NULL,'0',NULL,NULL,NULL,NULL,0,NULL,'jhj','lllll','ppppp');

/*Table structure for table `contenttype` */

DROP TABLE IF EXISTS `contenttype`;

CREATE TABLE `contenttype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `contenttype` */

insert  into `contenttype`(`id`,`type`) values 
(1,'Movie'),
(2,'Series');

/*Table structure for table `country` */

DROP TABLE IF EXISTS `country`;

CREATE TABLE `country` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `genre_id` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `ar_name` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

/*Data for the table `country` */

insert  into `country`(`id`,`name`,`genre_id`,`createdAt`,`ar_name`) values 
(1,'England',2,NULL,''),
(2,'China',6,NULL,''),
(4,'Egypt',1,'2020-05-02 00:00:00',''),
(5,'Iraq',1,'2020-05-02 00:00:00',''),
(7,'Yemen',1,'2020-05-02 00:00:00',''),
(8,'Saudi Arabia',1,'2020-05-03 00:00:00',''),
(9,'Iraqi',3,'2020-05-03 00:00:00',''),
(10,'Turkey',4,'2020-05-03 00:00:00',''),
(11,'Kurdish_Country',5,'2020-05-03 00:00:00','');

/*Table structure for table `episodes` */

DROP TABLE IF EXISTS `episodes`;

CREATE TABLE `episodes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_season_id` int(11) NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `episode_number` int(11) NOT NULL,
  `tumbnailURL` varchar(500) DEFAULT NULL,
  `trailerURL` varchar(500) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `duration` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fkSeasonID_idx` (`fk_season_id`),
  CONSTRAINT `fkSeasonID` FOREIGN KEY (`fk_season_id`) REFERENCES `season` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `episodes` */

/*Table structure for table `favorite` */

DROP TABLE IF EXISTS `favorite`;

CREATE TABLE `favorite` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) DEFAULT NULL,
  `contentID` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=utf8;

/*Data for the table `favorite` */

insert  into `favorite`(`id`,`userID`,`contentID`) values 
(131,39,1),
(133,39,7),
(135,39,9),
(138,39,24),
(139,39,20),
(140,39,27),
(142,39,40);

/*Table structure for table `favouritecontent` */

DROP TABLE IF EXISTS `favouritecontent`;

CREATE TABLE `favouritecontent` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  `trailerURL` varchar(500) CHARACTER SET latin1 DEFAULT NULL,
  `contentURL` varchar(500) CHARACTER SET latin1 DEFAULT NULL,
  `thumbnailURL` varchar(500) CHARACTER SET latin1 DEFAULT NULL,
  `posterURL` varchar(500) CHARACTER SET latin1 DEFAULT NULL,
  `duration` varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  `desc_short` varchar(500) CHARACTER SET latin1 DEFAULT NULL,
  `desc_long` varchar(1000) CHARACTER SET latin1 DEFAULT NULL,
  `fk_genre_id` int(11) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `featured` int(11) DEFAULT NULL,
  `seasonID` int(11) DEFAULT NULL,
  `episodeNumber` int(11) DEFAULT NULL,
  `approved` int(10) DEFAULT NULL,
  `type` varchar(30) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8;

/*Data for the table `favouritecontent` */

insert  into `favouritecontent`(`id`,`title`,`trailerURL`,`contentURL`,`thumbnailURL`,`posterURL`,`duration`,`desc_short`,`desc_long`,`fk_genre_id`,`year`,`rating`,`featured`,`seasonID`,`episodeNumber`,`approved`,`type`) values 
(78,'oo',NULL,'content/1588662045514-cutting-meshes-in-unity.mp4','thumbnails/1588662064827-5.jpg',NULL,'00:04:51',NULL,NULL,0,NULL,0,NULL,NULL,NULL,0,'0'),
(79,'rr',NULL,'content/1588661724453-3ds-max,-v-ray,-&-rayfire-test.mp4','thumbnails/1588661760730-2.jpg',NULL,'00:00:44',NULL,NULL,0,NULL,0,NULL,NULL,NULL,0,'0'),
(80,'rr',NULL,'content/1588661724453-3ds-max,-v-ray,-&-rayfire-test.mp4','thumbnails/1588661760730-2.jpg',NULL,'00:00:44',NULL,NULL,0,NULL,0,NULL,NULL,NULL,0,'0'),
(81,'sampleTest',NULL,'content/1588668249520-firebase.mp4','thumbnails/1588668275213-ir2.jpg',NULL,'00:06:12',NULL,NULL,0,NULL,0,NULL,NULL,NULL,0,'0'),
(82,'qq',NULL,'content/1588661469517native.mp4','thumbnails/1588661494627-1.jpg',NULL,'00:06:33',NULL,NULL,0,NULL,0,NULL,NULL,NULL,0,'0'),
(83,'uu',NULL,'content/1588661914329-cutting-meshes-in-unity.mp4','thumbnails/1588661933243-4.jpg',NULL,'00:04:51',NULL,NULL,0,NULL,0,NULL,NULL,NULL,0,'0'),
(84,'qq',NULL,'content/1588661469517native.mp4','thumbnails/1588661494627-1.jpg',NULL,'00:06:33',NULL,NULL,0,NULL,0,NULL,NULL,NULL,0,'0'),
(85,'qq',NULL,'content/1588661469517native.mp4','thumbnails/1588661494627-1.jpg',NULL,'00:06:33',NULL,NULL,0,NULL,0,NULL,NULL,NULL,0,'0'),
(86,'oo',NULL,'content/1588662045514-cutting-meshes-in-unity.mp4','thumbnails/1588662064827-5.jpg',NULL,'00:04:51',NULL,NULL,0,NULL,0,NULL,NULL,NULL,0,'0'),
(87,'oo',NULL,'content/1588662045514-cutting-meshes-in-unity.mp4','thumbnails/1588662064827-5.jpg',NULL,'00:04:51',NULL,NULL,0,NULL,0,NULL,NULL,NULL,0,'0'),
(88,'qq',NULL,'content/1588661469517native.mp4','thumbnails/1588661494627-1.jpg',NULL,'00:06:33',NULL,NULL,0,NULL,0,NULL,NULL,NULL,0,'0'),
(89,'aa',NULL,'content/1588662212253-easy-email-sender---tutorial-_unity-5.mp4','thumbnails/1588662241425-6.jpg',NULL,'00:02:39',NULL,NULL,0,NULL,0,NULL,NULL,NULL,0,'0'),
(90,'qq',NULL,'content/1588661469517native.mp4','thumbnails/1588661494627-1.jpg',NULL,'00:06:33',NULL,NULL,0,NULL,0,NULL,NULL,NULL,0,'0'),
(91,'qq',NULL,'content/1588661469517native.mp4','thumbnails/1588661494627-1.jpg',NULL,'00:06:33',NULL,NULL,0,NULL,0,NULL,NULL,NULL,0,'0'),
(92,'ss',NULL,'content/1588662301918-fadein.mp4','thumbnails/1588662314361-6.jpg',NULL,'00:02:09',NULL,NULL,0,NULL,0,NULL,NULL,NULL,0,'0'),
(93,'cc',NULL,'content/1588662803965-how-to-use-internet-connections-in-android-emulator_avd.mp4','thumbnails/1588662824176-ch.jpg',NULL,'00:01:18',NULL,NULL,0,NULL,0,NULL,NULL,NULL,0,'0'),
(94,'AliFadhil',NULL,'content/1588938691093-22.mp4','thumbnails/1588938706310-screenshot_1588900734.png',NULL,'00:06:09',NULL,NULL,0,NULL,0,NULL,NULL,NULL,0,'0'),
(95,'ert',NULL,'content/1588663383330-easy-email-sender---tutorial-_unity-5.mp4','thumbnails/1588663396782-tur.jpg',NULL,'00:02:39',NULL,NULL,0,NULL,0,NULL,NULL,NULL,0,'0'),
(96,'ert',NULL,'content/1588663383330-easy-email-sender---tutorial-_unity-5.mp4','thumbnails/1588663396782-tur.jpg',NULL,'00:02:39',NULL,NULL,0,NULL,0,NULL,NULL,NULL,0,'0'),
(97,'ert',NULL,'content/1588663383330-easy-email-sender---tutorial-_unity-5.mp4','thumbnails/1588663396782-tur.jpg',NULL,'00:02:39',NULL,NULL,0,NULL,0,NULL,NULL,NULL,0,'0'),
(98,'ert',NULL,'content/1588663383330-easy-email-sender---tutorial-_unity-5.mp4','thumbnails/1588663396782-tur.jpg',NULL,'00:02:39',NULL,NULL,0,NULL,0,NULL,NULL,NULL,0,'0');

/*Table structure for table `genre` */

DROP TABLE IF EXISTS `genre`;

CREATE TABLE `genre` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name1` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `ar_name` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;

/*Data for the table `genre` */

insert  into `genre`(`id`,`name1`,`name`,`ar_name`) values 
(1,'Animated','Arabic',''),
(2,'Horror','English',''),
(3,'Action','Iraqi',''),
(4,'Comedy','Turkey',''),
(5,'Dcumentary','Kurdish',''),
(6,'Poprapppppp','Others','');

/*Table structure for table `latestplayed` */

DROP TABLE IF EXISTS `latestplayed`;

CREATE TABLE `latestplayed` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) DEFAULT NULL,
  `contentID` int(11) DEFAULT NULL,
  `lastPlayedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

/*Data for the table `latestplayed` */

insert  into `latestplayed`(`id`,`userID`,`contentID`,`lastPlayedAt`) values 
(1,39,1,'2020-05-16 13:02:56'),
(2,39,2,'2020-05-16 09:41:16'),
(3,39,3,'2020-05-16 09:52:33'),
(4,39,4,'2020-05-16 09:42:03'),
(5,62,1,'2020-05-16 13:28:42'),
(6,62,12,'2020-05-16 13:51:54'),
(7,94,1,'2020-06-13 19:55:06'),
(8,94,27,'2020-06-13 16:57:18'),
(10,94,40,'2020-06-12 17:01:53'),
(13,94,16,'2020-06-12 17:34:17'),
(14,94,3,'2020-06-13 20:32:41'),
(15,94,25,'2020-06-13 04:07:04'),
(16,94,29,'2020-06-13 04:07:19'),
(17,94,24,'2020-06-13 11:18:22'),
(18,95,22,'2020-06-13 10:24:08'),
(19,94,22,'2020-06-13 11:17:36'),
(20,94,4,'2020-06-13 21:08:31');

/*Table structure for table `playlistdetail` */

DROP TABLE IF EXISTS `playlistdetail`;

CREATE TABLE `playlistdetail` (
  `contentID` int(11) NOT NULL,
  `playlistID` int(11) NOT NULL,
  PRIMARY KEY (`contentID`,`playlistID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `playlistdetail` */

insert  into `playlistdetail`(`contentID`,`playlistID`) values 
(1,1),
(1,2),
(1,4),
(1,9),
(1,11),
(3,1),
(3,3),
(3,8),
(3,11),
(4,1),
(4,7),
(5,1),
(5,2),
(5,7),
(5,8);

/*Table structure for table `playlists` */

DROP TABLE IF EXISTS `playlists`;

CREATE TABLE `playlists` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `contents` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `playlists` */

insert  into `playlists`(`id`,`name`,`created_at`,`contents`) values 
(1,'new hip songs','2020-03-08 00:00:00','[12,null]'),
(2,'tommy','2020-03-08 00:00:00','[12,19]'),
(3,'aaa','2020-04-25 00:00:00','[]');

/*Table structure for table `season` */

DROP TABLE IF EXISTS `season`;

CREATE TABLE `season` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `season` int(11) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `seriesID` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `season` */

insert  into `season`(`id`,`season`,`year`,`created_at`,`seriesID`) values 
(1,1,1992,'2019-11-10 00:00:00',1);

/*Table structure for table `series` */

DROP TABLE IF EXISTS `series`;

CREATE TABLE `series` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `year` varchar(45) DEFAULT NULL,
  `tumbnailURL` varchar(500) DEFAULT NULL,
  `posterURL` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `series` */

insert  into `series`(`ID`,`name`,`created_at`,`year`,`tumbnailURL`,`posterURL`) values 
(1,'Lost','2019-11-10 00:00:00','1992','thumbnails/1573390034839-blockchain-architecture.jpg','posters/1573390100431-whatsapp-image-2019-09-30-at-3.05.29-pm.jpeg');

/*Table structure for table `subscription` */

DROP TABLE IF EXISTS `subscription`;

CREATE TABLE `subscription` (
  `id` int(11) NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `period` varchar(45) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `subscription` */

/*Table structure for table `usercontent` */

DROP TABLE IF EXISTS `usercontent`;

CREATE TABLE `usercontent` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_content_id` int(11) DEFAULT NULL,
  `fk_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `usercontent` */

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(45) NOT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(500) DEFAULT NULL,
  `avatar` varchar(45) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `user_type` varchar(45) DEFAULT NULL,
  `e_sing` tinyint(4) DEFAULT NULL COMMENT 'This Attribute is only for the content providers to note down if they have agreed to e-sing or not.',
  `tmpPwd` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=latin1;

/*Data for the table `users` */

insert  into `users`(`id`,`firstname`,`lastname`,`email`,`password`,`avatar`,`created_at`,`user_type`,`e_sing`,`tmpPwd`) values 
(1,'Lora Dani','Phuddi','danyal20098@gmail.com','$2a$10$a3BP7WsnxPwA/9qExXngve8L22AtiFGKDC5YMmwM1BZcGnW66t2yK','/avatar/1570648581781-upload-image.png','2019-10-09','CP',NULL,NULL),
(2,'Syed','Khizer','s.khizer.abass@gmail.com','$2a$10$8PMETZgBe8xsqk2ICnwlzesCXKHwx4Bh0kSeAjTB5kflFKK3hFI5K','null','2019-10-09','CP',NULL,NULL),
(3,'Danyal','Ahmad','danyal20098@gmail.com','$2a$10$KNd/oRYvwVTVlLaEOzc8eOg/.kIPB7Ks8xnrDeTwsunz5GaYhYxmW','null','2019-10-09','CP',NULL,NULL),
(5,'Danyal','Ahmad','danyal@gmail.com','$2a$10$no.b1xgT.hoGt081kWYl0.6H4fivb8VqMTnKJrF5TFmcBslczsjnW','null','2019-10-10','CP',NULL,NULL),
(6,'Syed Khizer','Abass','nomi@email.com','$2a$10$yp0pxzpWfqakEjYqKa5xSefnqLdHoUUriSps5fFua1i0t7Ws8pk5.','null','2019-10-10','CP',NULL,NULL),
(7,'Sarmad','Shah','Sarmad@gmail.com','$2a$10$NLfHT9j6Qk1Iki.fVARJN.C6fM2EmMA1CKJdTNYomuoYyd11zMnxa','null','2019-10-10','CP',NULL,NULL),
(10,'ahmad','hu','ahmad@gmail.com','$2a$10$PLVtO9tkGMCaTNpTJSig0.Xc/8xglYRBU/4Q.Zn8QuuLMro5Rx8g.','null','2019-10-13','CP',NULL,NULL),
(12,'Danyal','Ahmads','admin@metrend.com','$2a$10$NLfHT9j6Qk1Iki.fVARJN.C6fM2EmMA1CKJdTNYomuoYyd11zMnxa','/avatar/1570648581781-upload-image.png','2019-11-09','CP',NULL,NULL),
(13,'Danyal','Ahmad','deenario@gmail.com','$2a$10$avEITeII97EizpFqLlet4OOB.WCL8YcZcSvsjoYNWtl7En/KptHre','null','2019-12-06','CP',NULL,NULL),
(14,'Mohammed','Maan','Mohammed.maan@sada-alfemas.com','$2a$10$nPCgxz1f3PhAvu4kbuqyH.QszwLxWCpDNANvYWt6Nl2vMcQ/Qp.b6','null','2019-12-08','CP',NULL,NULL),
(18,'Danyal','Ahmad','Danyal123@gmail.com','$2a$10$cAPk5qY9jA0pmKnvwJAo9uvYlGA9ep2Kc5S2JWlM323F6h3CJiQ3G','null','2020-01-22','CP',NULL,NULL),
(32,'tom','brady','tom@gmail.com','$2a$12$PvJzV0IuV/zPC4lNbOgfkez4B/WAg80f3ZpuiYpCezQpdJQ5G5q66','null','2020-03-01','CP',NULL,NULL),
(39,'www','www','www@www.com','$2a$10$.AqMui.STZkj32PWclE6sOt2hIjeGDrzbMk/AyCk75qlpZ5TVOaYq','null','2020-04-17','CP',NULL,NULL),
(50,'Heidar','Hosseini','heidar@diditdev.com','$2a$10$imwlybuziG45pIAdGDxtpuSDecsf4ZIZqhpJNtiOxs2XQGTl8zUuy','null','2020-04-25','CP',NULL,NULL),
(51,'Wang','ying','wangying@gmail.com','$2a$10$zTbSaPlc8s2MkAgR2OGrJuPDw4qNTZ8/w72lQo2M/H7W8T8/IAp6S','null','2020-04-29','CP',NULL,NULL),
(52,'Jin','youcheng','jin@gmail.com','$2a$10$0ruemq1fDC0DgFLwvnVej.wO0nqYzSvhPMhET/HHkKXEWMlz3xj6K','null','2020-05-01','CP',NULL,NULL),
(53,'test','user','jinyoucheng1217@gmail.com','$2a$10$If/5rAbUZ3sZHrUzgalGje43t.kguiMNQq5iuV4AxJifcA0wjfQP2','null','2020-05-03','CP',NULL,'111111'),
(54,'test2','user2','satel931217@163.com','$2a$10$DTIEBFtOZ9uJb2KSNKlAJeJun8A9nSXf8wYbtBarKW/fI7GT08zDy','null','2020-05-03','CP',NULL,'111111'),
(55,'ton','dev','tondeveloper@outlook.com','$2a$10$TgFf5DHra3YrJg0vYnN8wed3x1lsnhs4IYallLeks8sifLulAeOr6','null','2020-05-08','CP',NULL,'tondeveloper'),
(56,'Wilson','petron','wilsonpetron@outlook.com','$2a$10$ksp7nPBdg3xcM5LyGMNqCux2h7xYuj41jHLwEL1DmCiQK/VEJZPzC','null','2020-05-08','CP',NULL,'222222'),
(57,'aaaaaa','bbbbbb','aaaaaa@gmail.com','$2a$10$f5KgGWSnZCfoIBDC000I8.RNlO/w/aXL7dalnG/ZXQtugLj07anLy','null','2020-05-08','CP',NULL,'222222'),
(59,'a','a','a@a.com','$2a$10$bSO1pOeNCJ7M8fG8E82GpeuZtzb4WCYdMk4jYdYToWwaKPRiccHNi','null','2020-05-12','CP',NULL,'aaaaa'),
(60,'new','one','new@one.com','$2a$10$mJ.NxHVffsmR06t0ukVgVe7UIahTb7JDPIMUUCDgxmiydm/agQrRe','null','2020-05-13','CP',NULL,'newone'),
(61,'metrend','metrecccccc','me@me.com','$2a$10$JD8Etbo0ZPUIxXzjLAAQ7eah6nXKC8dWa0cAMWPjnrjlRCclj5JWS','null','2020-05-14','CP',NULL,'qqqqqq'),
(62,'another','asd','another@gmail.com','$2a$10$1xjq.wsKFsJ1SsAjP23WXO/wB2lTfyJiCa3pRROOdrF99uRIMfEAm','null','2020-05-16','CP',NULL,'another'),
(63,'asaada','qwqwqwq','qwe@qwe.com','$2a$10$Ibb4q6F7k3UbOyGuMZZ4SuZS9uvvmaz4cw7BLcMDq.dB1GtNd3.7q','null','2020-05-17','CP',NULL,'qweqwe'),
(64,'fafa','dsds','fafa@gmail.com','$2a$10$dNDhcMaR99w/H5CSbs71L.F1Dtd/9KGWv9eXvAzwCndZl7UD.pLmW','null','2020-05-17','CP',NULL,'fafafa'),
(65,'zxc','zzz','zxc@zxc.com','$2a$10$4FaPa9v77DnHHr5ga94Ql.DtDitkWnj8kAYwBMGF5taf4FustshVq','null','2020-05-17','CP',NULL,'zxczxc'),
(66,'zxc','zxcc','zxcz@zxc.com','$2a$10$erA8RnueKBJuBmUE2TY3AeH8wRmWRoydB6V76G39DF7NEFYEXJasW','null','2020-05-17','CP',NULL,'zxczxc'),
(67,'zxc','zxcc','zxczcc@zxc.com','$2a$10$Bpb2C8mWM2UW9.ntEiTG.OoYnVX606ZPuh7T9162BOAC.Rn5x4W3u','null','2020-05-17','CP',NULL,'zxczxc'),
(68,'fffff','ddddd','ffffff@gmail.com','$2a$10$R.B.CMystmYUK1c0eEw.LeNqe1zbyC1.Q/w0cXqJN.o7fU/LbMLWW','null','2020-05-17','user',NULL,'ffffff'),
(69,'fffff','ddddd','fffffff@gmail.com','$2a$10$cTMEOd2FKnbMvIluFPKXluIC5WP8aWrT4ojNCX/dNhz.IvigQaEHm','null','2020-05-17','user',NULL,'fffffff'),
(70,'fffffd','dddddd','ffffdfff@gmail.com','$2a$10$FAGcWD1vJwTgcmBzM4Crr./7oWmRdum9mGA6SpBcZGDvIT.jkleKu','null','2020-05-17','user',NULL,'fffffffd'),
(71,'wwww','sasd','sdsd@gmail.com','$2a$10$5TxNjiwAykFr4XV0pjMOH.wnMHGqc4psaeUPnBpq/PeVX4nk2Ck1S','null','2020-05-17',NULL,NULL,'sdsdsd'),
(72,'wwww','sasd','sdsds@gmail.com','$2a$10$okDwIwjJVF9dHai5K/mP9e44Xnn6hELXoxUkfSblyw9wUOGHwDPIy','null','2020-05-17',NULL,NULL,'sdsdsd'),
(73,'assas','asas','aass@gmail.com','$2a$10$2lLp.Toxx4bpe7e5tSJYzeIKeeURvdCmyPAG0nfaE.TbEzfoIcfn.','null','2020-05-17',NULL,NULL,'aassaass'),
(74,'assasa','asasasa','aassas@gmail.com','$2a$10$K8teQsFfXkUycksXLG4U9edUXq4kFmpyXgvPxI081WbuGDvk834am','null','2020-05-17',NULL,NULL,'aassaassas'),
(75,'assasa','asasasa','aassaas@gmail.com','$2a$10$GgEFmFg2MiWNruyAF/VY1evKP01dPtfyhFsne/ZBwkIudBECKEc9W','null','2020-05-17',NULL,NULL,'aassaassas'),
(76,'assasad','asasasad','aassaaaass@gmail.com','$2a$10$1gTIJyrEpNWUONEufYYn/eFsIoja5jowTEwhfBAVIO8UgUk0C2EQq','null','2020-05-17',NULL,NULL,'aassaassasas'),
(77,'assasad','asasasad','aassaaaasss@gmail.com','$2a$10$38oUSl/mALkgaU4wruQaLuGTU11hoQQljfMmOu5DwXp6Y8ebu1nqW','null','2020-05-17',NULL,NULL,'aassaassasas'),
(78,'aaa','dd','aaaa@www.com','$2a$10$vHG3yV9JyN9TuXfYdmEBluT9fSo0uAIgyQb.btoRMuS5NtY9WxClm','null','2020-05-17',NULL,NULL,'aaaaaa'),
(79,'aaa','xxx','wwww@www.com','$2a$10$EE84ysqyadR1klAj8xTm/Ox688A7mHfcttFjX1B8IhLvxj.m9pXMO','null','2020-05-17','CP',NULL,'wwwwwww'),
(80,'sfsdfsdf','sdsdf','rrr@rrr.com','$2a$10$7p2oxwjMLNRb5WQbfciEAeR3Wc4CZxF5Euo.LxCcMgkFdqUdtfi2G','null','2020-05-17','AppUser',NULL,'rrrrrr'),
(81,'sfsdfsdf','sdsdf','rrrr@rrr.com','$2a$10$PyNrazbsXMBdXfFVaIn4Ue5xASBxxBpdziyOCExYDyUj1p72TZW5i','null','2020-05-17','AppUser',NULL,'rrrrrr'),
(82,'sfsdfsdfasd','sdsdfasd','rrrar@rrr.com','$2a$10$ImuJAKYixafgZp37VQUZ9e6jWi76k8SJM.lcMeEjv2pN81/ScJmNS','null','2020-05-17','AppUser',NULL,'rrrrrrdasd'),
(83,'sdfsd','sdfsfd','afaf@gmail.com','$2a$10$YET/CGK41Ms5EebNgvjYvuWythI8NQujn9VrXS14JoYjyrhSeAIKW','null','2020-05-17','AppUser',NULL,'afafaf'),
(84,'sdfsdaf','sdfsfdaf','afafaf@gmail.com','$2a$10$RIZK3GA7kT.EJHHKlpEOQ.2dxGnQ0KuaaziJBI0X8DOzv3pQAk37K','null','2020-05-17','AppUser',NULL,'afafafaf'),
(85,'sdfsdafaf','sdfsfdafaf','afafafaf@gmail.com','$2a$10$RXYVuUz6msFhTxaAEE2be.wTjDosgAnTID85eGIvr55Z.eDDXE/sK','null','2020-05-17','AppUser',NULL,'afafafafaf'),
(86,'sdfsdafaf','sdfsfdafaf','afafafafaf@gmail.com','$2a$10$jQKM9EVkw32KcozCeRNHB.T9UElyr9BoRJxA.zvZxPX5pX/Bve93K','null','2020-05-17','AppUser',NULL,'afafafafaf'),
(87,'sdfsdafaf','sdfsfdafaf','afafafafafaf@gmail.com','$2a$10$znnXD.Iymb0O4R2QQiMfeO8l31i3I.CEg/tAN/AAxwl07VcyfA9Y.','null','2020-05-17','AppUser',NULL,'afafafafaf'),
(88,'zc','zsc','sc@gmail.com','$2a$10$yoheBBYtLVNff5i0wPjQMOCwrmiCKC7zyWToZonh/cfLMEMbs3MZC','null','2020-05-17','AppUser',NULL,'aaaaaa'),
(89,'zc','zsc','scs@gmail.com','$2a$10$JQbpMk1ouwEHptE8DNOKbeZLKOAXDdBHsjifT62H7TCLI6gYCMWi2','null','2020-05-17','AppUser',NULL,'aaaaaa'),
(90,'zc','zsc','scss@gmail.com','$2a$10$//BiQ4Qio5x70QafEcQQc.jyqblSjb/ZtP.OI3d10EjSyAJ2XHw32','null','2020-05-17','AppUser',NULL,'aaaaaa'),
(91,'jin','youcheng','jinyoucheng1@gmail.com','$2a$10$OzFou6b.DdPtv7fwNRiKd.pYTXQB6DSIfVQrXsAq8Ky2dj8rXlcHa','null','2020-05-17','AppUser',NULL,'111111'),
(92,'asdasd','asdasd','webuser@gmail.com','$2a$10$7siPKdQEIzk8X/J1KbIHteZyg7bt8/Yvac1BPqaSmAe17S4J8dQ2i','null','2020-05-17','CP',NULL,'webweb'),
(93,'Himanshu','kumar','himanshukumar077@gmail.com','$2a$10$UgQheTymrQ8mpzJ.jUTGxuioC2hoVLsmlcY/sF8EWt/Ov2LT7cEUG','null','2020-06-05','CP',NULL,'123456'),
(94,'AAA','BBB','ww@w.com','$2a$10$WgrDGR744J/7lHtnN0H12e/xA.t5y26G1rmkwWU3WtKWuLmIhWdYW','null','2020-06-12','AppUser',NULL,'wwwwww'),
(95,'asc','wewg','qq@qq.com','$2a$10$VU.7ZALMysUAILkrFJoblehp4v20Q.PqznChgAI5GS6SUsmICfzZm','null','2020-06-13','AppUser',NULL,'qqqqqq');

/*Table structure for table `usersubscription` */

DROP TABLE IF EXISTS `usersubscription`;

CREATE TABLE `usersubscription` (
  `id` int(11) NOT NULL,
  `fk_user_id` int(11) NOT NULL,
  `fk_subscription_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `usersubscription` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
