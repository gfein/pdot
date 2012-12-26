CREATE DATABASE  IF NOT EXISTS `pdot` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `pdot`;
-- MySQL dump 10.13  Distrib 5.5.16, for Win32 (x86)
--
-- Host: localhost    Database: pdot
-- ------------------------------------------------------
-- Server version	5.5.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teams` (
  `TeamId` int(11) NOT NULL AUTO_INCREMENT,
  `City` varchar(50) DEFAULT NULL,
  `Name` varchar(50) DEFAULT NULL,
  `Abbreviation` varchar(3) DEFAULT NULL,
  `Division` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`TeamId`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
INSERT INTO `teams` VALUES (1,'Boston','Celtics','BOS','Atlantic'),(2,'Brooklyn','Nets','BKN','Atlantic'),(3,'New York','Knicks','NYK','Atlantic'),(4,'Philadelphia','76ers','PHI','Atlantic'),(5,'Toronto','Raptors','TOR','Atlantic'),(6,'Golden State','Warriors','GSW','Pacific'),(7,'Los Angeles','Clippers','LAC','Pacific'),(8,'Los Angeles','Lakers','LAL','Pacific'),(9,'Phoenix','Suns','PHX','Pacific'),(10,'Sacramento','Kings','SAC','Pacific'),(11,'Chicago','Bulls','CHI','Central'),(12,'Cleveland','Cavaliers','CLE','Central'),(13,'Detroit','Pistons','DET','Central'),(14,'Indiana','Pacers','IND','Central'),(15,'Milwaukee','Bucks','MIL','Central'),(16,'Dallas','Mavericks','DAL','Southwest'),(17,'Houston','Rockets','HOU','Southwest'),(18,'Memphis','Grizzlies','MEM','Southwest'),(19,'New Orleans','Hornets','NOH','Southwest'),(20,'San Antonio','Spurs','SAC','Southwest'),(21,'Atlanta','Hawks','ATL','Southeast'),(22,'Charlotte','Bobcats','CHA','Southeast'),(23,'Miami','Heat','MIA','Southeast'),(24,'Orlando','Magic','ORL','Southeast'),(25,'Washington','Wizards','WAS','Southeast'),(26,'Denver','Nuggets','DEN','Northwest'),(27,'Minnesota','Timberwolves','MIN','Northwest'),(28,'Oklahoma City','Thunder','OKC','Northwest'),(29,'Portland','Trail Blazers','POR','Northwest'),(30,'Utah','Jazz','UTA','Northwest');
/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2012-12-25 23:00:09
