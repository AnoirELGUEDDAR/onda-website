-- MySQL dump 10.13  Distrib 8.4.5, for Linux (x86_64)
--
-- Host: localhost    Database: onda_flights
-- ------------------------------------------------------
-- Server version	8.4.5-0ubuntu0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `airlines`
--

DROP TABLE IF EXISTS `airlines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `airlines` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(3) NOT NULL,
  `name` varchar(255) NOT NULL,
  `country` varchar(100) NOT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `route_types` varchar(255) DEFAULT NULL COMMENT 'Types de routes opérées par la compagnie (séparés par des virgules)',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `airlines`
--

LOCK TABLES `airlines` WRITE;
/*!40000 ALTER TABLE `airlines` DISABLE KEYS */;
INSERT INTO `airlines` VALUES (1,'AT','Royal Air Maroc','Morocco','/images/airlines/royal-air-maroc.png','2025-07-04 15:11:42','2025-07-04 15:11:42',NULL),(2,'3O','Air Arabia Maroc','Morocco','/images/airlines/air-arabia.png','2025-07-04 15:11:42','2025-07-04 15:11:42',NULL),(3,'TB','TUI fly','Morocco','/images/airlines/tuifly.png','2025-07-04 15:11:42','2025-07-04 15:11:42',NULL),(4,'AF','Air France','France','/images/airlines/air-france.png','2025-07-04 15:11:42','2025-07-04 15:11:42',NULL),(19,'EY','Etihad Airways','United Arab Emirates','/images/airlines/etihad-airways.png','2025-07-04 20:42:58','2025-07-04 20:42:58',NULL),(20,'IB','Iberia','Spain','/images/airlines/iberia.png','2025-07-04 20:42:58','2025-07-04 20:42:58',NULL),(21,'FR','Ryanair','Ireland','/images/airlines/ryanair.png','2025-07-04 20:42:58','2025-07-04 20:42:58',NULL),(22,'TK','Turkish Airlines','Turkey','/images/airlines/turkish-airlines.png','2025-07-04 20:42:58','2025-07-04 20:42:58',NULL),(23,'VY','Vueling','Spain','/images/airlines/vueling.png','2025-07-04 20:42:58','2025-07-04 20:42:58',NULL),(24,'QR','Qatar Airways','Qatar','/images/airlines/qatar-airways.png','2025-07-04 20:42:58','2025-07-04 20:42:58',NULL),(25,'BA','British Airways','United Kingdom','/images/airlines/british-airways.png','2025-07-04 20:42:58','2025-07-04 20:42:58',NULL),(26,'EK','Emirates','United Arab Emirates','/images/airlines/emirates.png','2025-07-04 20:42:58','2025-07-04 20:42:58',NULL),(27,'LH','Lufthansa','Germany','/images/airlines/lufthansa.png','2025-07-04 20:42:58','2025-07-04 20:42:58',NULL);
/*!40000 ALTER TABLE `airlines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `airport_services`
--

DROP TABLE IF EXISTS `airport_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `airport_services` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `available` bit(1) NOT NULL,
  `category` enum('RESTAURANT','SHOPPING','LOUNGE','WIFI','PARKING','BAGGAGE','SECURITY','TRANSPORTATION','OTHER') DEFAULT NULL,
  `contact_number` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `icon_url` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `opening_hours` varchar(255) DEFAULT NULL,
  `airport_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `airport_services`
--

LOCK TABLES `airport_services` WRITE;
/*!40000 ALTER TABLE `airport_services` DISABLE KEYS */;
/*!40000 ALTER TABLE `airport_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `airports`
--

DROP TABLE IF EXISTS `airports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `airports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(3) NOT NULL,
  `name` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `country` varchar(100) DEFAULT 'Morocco',
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `international` tinyint(1) DEFAULT '0',
  `description_en` text,
  `description_fr` text,
  `description_ar` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `airports`
--

LOCK TABLES `airports` WRITE;
/*!40000 ALTER TABLE `airports` DISABLE KEYS */;
INSERT INTO `airports` VALUES (1,'CMN','Mohammed V International Airport','Casablanca','Morocco',33.3675,-7.59,1,'Mohammed V International Airport is Morocco\'s main international gateway located near Casablanca, serving millions of passengers annually.','L\'aéroport international Mohammed V est la principale porte d\'entrée internationale du Maroc près de Casablanca, accueillant des millions de passagers chaque année.','مطار محمد الخامس الدولي هو البوابة الدولية الرئيسية للمغرب بالقرب من الدار البيضاء، ويخدم ملايين المسافرين سنوياً.','2025-07-04 15:11:42','2025-07-04 15:11:42'),(2,'RAK','Marrakech Menara Airport','Marrakech','Morocco',31.6069,-8.0369,1,'Marrakech Menara Airport is a major international airport serving the popular tourist destination of Marrakech.','L\'aéroport de Marrakech Ménara est un aéroport international majeur desservant la destination touristique populaire de Marrakech.','مطار مراكش المنارة هو مطار دولي رئيسي يخدم وجهة مراكش السياحية الشهيرة.','2025-07-04 15:11:42','2025-07-04 15:11:42'),(3,'AGA','Al Massira Airport','Agadir','Morocco',30.325,-9.4128,1,'Al Massira Airport serves Agadir, a major beach resort destination on Morocco\'s southern Atlantic coast.','L\'aéroport Al Massira dessert Agadir, une destination balnéaire majeure sur la côte atlantique sud du Maroc.','مطار المسيرة يخدم أغادير، وهي وجهة منتجع شاطئي رئيسي على ساحل المحيط الأطلسي الجنوبي للمغرب.','2025-07-04 15:11:42','2025-07-04 15:11:42'),(4,'AHU','Cherif Al Idrissi Airport','Al Hoceima','Morocco',35.1771,-3.8394,1,'Cherif Al Idrissi Airport is a regional airport serving Al Hoceima and the surrounding area in northern Morocco.','L\'aéroport Cherif Al Idrissi est un aéroport régional desservant Al Hoceima et ses environs dans le nord du Maroc.','مطار الشريف الإدريسي هو مطار إقليمي يخدم الحسيمة والمناطق المحيطة بها في شمال المغرب.','2025-07-04 15:11:42','2025-07-04 15:11:42'),(5,'BEM','Beni Mellal Airport','Beni Mellal','Morocco',32.4014,-6.3158,0,'Beni Mellal Airport is a small regional airport serving the Beni Mellal-Khenifra region.','L\'aéroport de Beni Mellal est un petit aéroport régional desservant la région de Béni Mellal-Khénifra.','مطار بني ملال هو مطار إقليمي صغير يخدم منطقة بني ملال-خنيفرة.','2025-07-04 15:11:42','2025-07-04 15:11:42'),(6,'ERH','Moulay Ali Cherif Airport','Errachidia','Morocco',31.9475,-4.3983,0,'Moulay Ali Cherif Airport serves the city of Errachidia and surrounding areas in eastern Morocco.','L\'aéroport Moulay Ali Cherif dessert la ville d\'Errachidia et ses environs dans l\'est du Maroc.','مطار مولاي علي الشريف يخدم مدينة الرشيدية والمناطق المحيطة بها في شرق المغرب.','2025-07-04 15:11:42','2025-07-04 15:11:42'),(7,'ESU','Essaouira Mogador Airport','Essaouira','Morocco',31.3969,-9.6817,1,'Essaouira Mogador Airport connects the coastal city of Essaouira to other Moroccan destinations.','L\'aéroport d\'Essaouira Mogador relie la ville côtière d\'Essaouira à d\'autres destinations marocaines.','مطار الصويرة موكادور يربط مدينة الصويرة الساحلية بوجهات مغربية أخرى.','2025-07-04 15:11:42','2025-07-04 15:11:42'),(8,'FEZ','Fes Sais International Airport','Fes','Morocco',33.9272,-4.9778,1,'Fes Sais International Airport serves Morocco\'s cultural and spiritual capital, Fes.','L\'aéroport international Fès-Saïss dessert la capitale culturelle et spirituelle du Maroc, Fès.','مطار فاس سايس الدولي يخدم العاصمة الثقافية والروحية للمغرب، فاس.','2025-07-04 15:11:42','2025-07-04 15:11:42'),(9,'NDR','Nador International Airport','Nador','Morocco',34.9886,-3.0286,1,'Nador International Airport serves the northeastern Rif region of Morocco.','L\'aéroport international de Nador dessert la région nord-est du Rif au Maroc.','مطار الناظور الدولي يخدم منطقة الريف الشمالية الشرقية من المغرب.','2025-07-04 15:11:42','2025-07-04 15:11:42'),(10,'OZZ','Ouarzazate Airport','Ouarzazate','Morocco',30.9391,-6.9094,1,'Ouarzazate Airport serves as a gateway to the Sahara Desert and Morocco\'s southeastern regions.','L\'aéroport d\'Ouarzazate sert de porte d\'entrée vers le désert du Sahara et les régions sud-est du Maroc.','مطار ورزازات يعمل كبوابة إلى الصحراء الكبرى ومناطق جنوب شرق المغرب.','2025-07-04 15:11:42','2025-07-04 15:11:42'),(11,'OUD','Oujda Angads International Airport','Oujda','Morocco',34.7872,-1.9239,1,'Oujda Angads International Airport serves the eastern Moroccan city of Oujda and nearby areas.','L\'aéroport international d\'Oujda Angads dessert la ville marocaine orientale d\'Oujda et les zones environnantes.','مطار وجدة أنكاد الدولي يخدم مدينة وجدة المغربية الشرقية والمناطق المجاورة.','2025-07-04 15:11:42','2025-07-04 15:11:42'),(12,'RBA','Rabat-Salé Airport','Rabat','Morocco',34.0487,-6.7516,1,'Rabat-Salé Airport serves Morocco\'s capital city Rabat and the twin city of Salé.','L\'aéroport de Rabat-Salé dessert la capitale du Maroc, Rabat, et la ville jumelle de Salé.','مطار الرباط-سلا يخدم العاصمة المغربية الرباط والمدينة التوأم سلا.','2025-07-04 15:11:42','2025-07-04 15:11:42'),(13,'TNG','Tangier Ibn Battouta Airport','Tangier','Morocco',35.7267,-5.9,1,'Tangier Ibn Battouta Airport connects northern Morocco to destinations across Europe and the Middle East.','L\'aéroport Ibn Battouta de Tanger relie le nord du Maroc aux destinations d\'Europe et du Moyen-Orient.','مطار طنجة ابن بطوطة يربط شمال المغرب بوجهات في جميع أنحاء أوروبا والشرق الأوسط.','2025-07-04 15:11:42','2025-07-04 15:11:42'),(14,'TTU','Tetouan Sania Ramel Airport','Tetouan','Morocco',35.5944,-5.3203,1,'Tetouan Sania Ramel Airport serves the northern Moroccan city of Tetouan.','L\'aéroport Sania Ramel de Tétouan dessert la ville marocaine du nord de Tétouan.','مطار تطوان سانية الرمل يخدم مدينة تطوان المغربية الشمالية.','2025-07-04 15:11:42','2025-07-04 15:11:42'),(15,'VIL','Dakhla Airport','Dakhla','Morocco',23.7183,-15.9322,1,'Dakhla Airport serves the coastal city of Dakhla in southern Morocco.','L\'aéroport de Dakhla dessert la ville côtière de Dakhla dans le sud du Maroc.','مطار الداخلة يخدم مدينة الداخلة الساحلية في جنوب المغرب.','2025-07-04 15:11:42','2025-07-04 15:11:42'),(16,'EUN','Hassan I Airport','Laayoune','Morocco',27.1517,-13.2192,1,'Hassan I Airport serves Laayoune, the largest city in the Western Sahara territory.','L\'aéroport Hassan Ier dessert Laâyoune, la plus grande ville du territoire du Sahara occidental.','مطار الحسن الأول يخدم العيون، أكبر مدينة في إقليم الصحراء الغربية.','2025-07-04 15:11:42','2025-07-04 15:11:42'),(17,'TTA','Tan Tan Plage Blanche Airport','Tan Tan','Morocco',28.4481,-11.1617,0,'Tan Tan Plage Blanche Airport serves the southwestern coastal town of Tan Tan.','L\'aéroport Plage Blanche de Tan Tan dessert la ville côtière sud-ouest de Tan Tan.','مطار طان طان بلاج بلانش يخدم مدينة طان طان الساحلية الجنوبية الغربية.','2025-07-04 15:11:42','2025-07-04 15:11:42'),(18,'GLN','Guelmim Airport','Guelmim','Morocco',29.0267,-10.05,0,'Guelmim Airport serves the southern Moroccan city known as the gateway to the desert.','L\'aéroport de Guelmim dessert la ville marocaine du sud connue comme la porte du désert.','مطار كلميم يخدم المدينة المغربية الجنوبية المعروفة باسم بوابة الصحراء.','2025-07-04 15:11:42','2025-07-04 15:11:42'),(19,'OZG','Zagora Airport','Zagora','Morocco',30.32,-5.8667,0,'Zagora Airport provides access to the southeastern desert regions of Morocco.','L\'aéroport de Zagora donne accès aux régions désertiques du sud-est du Maroc.','مطار زاكورة يوفر الوصول إلى مناطق الصحراء الجنوبية الشرقية من المغرب.','2025-07-04 15:11:42','2025-07-04 15:11:42'),(20,'UAR','Bouarfa Airport','Bouarfa','Morocco',32.5144,-1.9831,0,'Bouarfa Airport is a small regional airport serving the eastern Moroccan town of Bouarfa.','L\'aéroport de Bouarfa est un petit aéroport régional desservant la ville marocaine orientale de Bouarfa.','مطار بوعرفة هو مطار إقليمي صغير يخدم مدينة بوعرفة المغربية الشرقية.','2025-07-04 15:11:42','2025-07-04 15:11:42'),(21,'CDG','Paris Charles de Gaulle Airport','Paris','France',49.0097,2.5479,1,'Main international airport serving Paris','Principal aéroport international de Paris','مطار شارل ديغول الدولي، باريس','2025-07-04 17:36:57','2025-07-04 17:36:57'),(22,'ORY','Paris Orly Airport','Paris','France',48.7262,2.3652,1,'Second largest international airport serving Paris','Second aéroport international de Paris','مطار أورلي، باريس','2025-07-04 17:36:57','2025-07-04 17:36:57'),(23,'MAD','Adolfo Suárez Madrid–Barajas Airport','Madrid','Spain',40.4983,-3.5676,1,'Main international airport serving Madrid','Principal aéroport de Madrid','مطار أدولفو سواريز مدريد باراخاس الدولي','2025-07-04 17:36:57','2025-07-04 17:36:57'),(24,'FCO','Leonardo da Vinci–Fiumicino Airport','Rome','Italy',41.8003,12.2389,1,'Main international airport serving Rome','Principal aéroport de Rome','مطار ليوناردو دا فينشي الدولي، روما','2025-07-04 17:36:57','2025-07-04 17:36:57'),(25,'LHR','London Heathrow Airport','London','United Kingdom',51.47,-0.4543,1,'Main international airport serving London','Principal aéroport de Londres','مطار هيثرو، لندن','2025-07-04 17:36:57','2025-07-04 17:36:57'),(26,'IST','Istanbul Airport','Istanbul','Turkey',41.2753,28.7519,1,'Main international airport serving Istanbul','Principal aéroport d\'Istanbul','مطار إسطنبول الدولي','2025-07-04 17:36:57','2025-07-04 17:36:57'),(27,'DXB','Dubai International Airport','Dubai','United Arab Emirates',25.2532,55.3657,1,'Main international airport serving Dubai and hub for Emirates','Principal aéroport de Dubaï et hub d\'Emirates','مطار دبي الدولي','2025-07-04 17:36:57','2025-07-04 17:36:57'),(28,'DOH','Hamad International Airport','Doha','Qatar',25.2609,51.6138,1,'International airport serving Doha and hub for Qatar Airways','Aéroport international de Doha et hub de Qatar Airways','مطار حمد الدولي، الدوحة','2025-07-04 17:36:57','2025-07-04 17:36:57'),(29,'FRA','Frankfurt Airport','Frankfurt','Germany',50.0379,8.5622,1,'Main international airport serving Frankfurt and hub for Lufthansa','Principal aéroport de Francfort et hub de Lufthansa','مطار فرانكفورت الدولي','2025-07-04 17:36:57','2025-07-04 17:36:57'),(30,'AMS','Amsterdam Airport Schiphol','Amsterdam','Netherlands',52.3105,4.7683,1,'Main international airport serving Amsterdam and hub for KLM','Principal aéroport d\'Amsterdam et hub de KLM','مطار سخيبول، أمستردام','2025-07-04 17:36:57','2025-07-04 17:36:57');
/*!40000 ALTER TABLE `airports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flights`
--

DROP TABLE IF EXISTS `flights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flights` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `flight_number` varchar(10) NOT NULL,
  `airline_id` int NOT NULL,
  `departure_airport_id` int NOT NULL,
  `arrival_airport_id` int NOT NULL,
  `departure_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `arrival_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('SCHEDULED','DELAYED','DEPARTED','ARRIVED','CANCELLED') DEFAULT 'SCHEDULED',
  `aircraft_type` varchar(100) DEFAULT NULL,
  `price` decimal(38,2) DEFAULT NULL,
  `seats_available` int DEFAULT NULL,
  `terminal` varchar(10) DEFAULT NULL,
  `gate` varchar(10) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `airline_id` (`airline_id`),
  KEY `idx_flight_departure` (`departure_airport_id`,`departure_time`),
  KEY `idx_flight_arrival` (`arrival_airport_id`,`arrival_time`),
  KEY `idx_flight_date` (`departure_time`),
  CONSTRAINT `flights_ibfk_1` FOREIGN KEY (`airline_id`) REFERENCES `airlines` (`id`),
  CONSTRAINT `flights_ibfk_2` FOREIGN KEY (`departure_airport_id`) REFERENCES `airports` (`id`),
  CONSTRAINT `flights_ibfk_3` FOREIGN KEY (`arrival_airport_id`) REFERENCES `airports` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flights`
--

LOCK TABLES `flights` WRITE;
/*!40000 ALTER TABLE `flights` DISABLE KEYS */;
INSERT INTO `flights` VALUES (1,'AT400',1,1,2,'2025-07-05 06:30:00','2025-07-05 07:20:00','SCHEDULED','Boeing 737-800',850.00,150,'1','A3','2025-07-04 20:46:47','2025-07-04 20:46:47'),(2,'AT402',1,1,2,'2025-07-05 10:45:00','2025-07-05 11:35:00','SCHEDULED','Boeing 737-800',950.00,120,'1','A4','2025-07-04 20:46:47','2025-07-04 20:46:47'),(3,'AT404',1,1,2,'2025-07-05 15:30:00','2025-07-05 16:20:00','SCHEDULED','Boeing 737-800',1050.00,100,'1','A2','2025-07-04 20:46:47','2025-07-04 20:46:47'),(4,'3O275',2,1,2,'2025-07-05 08:45:00','2025-07-05 09:35:00','SCHEDULED','Airbus A320',780.00,180,'2','B1','2025-07-04 20:46:47','2025-07-04 20:46:47'),(5,'3O839',2,1,2,'2025-07-05 11:07:00','2025-07-05 11:57:00','SCHEDULED','Airbus A320',820.00,165,'2','B2','2025-07-04 20:46:47','2025-07-04 20:46:47'),(6,'AT410',1,1,3,'2025-07-05 07:15:00','2025-07-05 08:25:00','SCHEDULED','Boeing 737-800',920.00,140,'1','A5','2025-07-04 20:46:47','2025-07-04 20:46:47'),(7,'3O277',2,1,3,'2025-07-05 13:30:00','2025-07-05 14:40:00','SCHEDULED','Airbus A320',850.00,175,'2','B3','2025-07-04 20:46:47','2025-07-04 20:46:47'),(8,'AT420',1,1,4,'2025-07-05 09:00:00','2025-07-05 09:50:00','SCHEDULED','Boeing 737-700',780.00,120,'1','A1','2025-07-04 20:46:47','2025-07-04 20:46:47'),(9,'3O279',2,1,4,'2025-07-05 16:15:00','2025-07-05 17:05:00','SCHEDULED','Airbus A320',720.00,160,'2','B4','2025-07-04 20:46:47','2025-07-04 20:46:47'),(10,'AT430',1,1,5,'2025-07-05 08:30:00','2025-07-05 09:20:00','SCHEDULED','Boeing 737-800',800.00,145,'1','A2','2025-07-04 20:46:47','2025-07-04 20:46:47'),(11,'3O281',2,1,5,'2025-07-05 14:45:00','2025-07-05 15:35:00','SCHEDULED','Airbus A320',750.00,170,'2','B1','2025-07-04 20:46:47','2025-07-04 20:46:47'),(12,'AF1596',4,10,1,'2025-07-05 09:30:00','2025-07-05 11:45:00','SCHEDULED','Airbus A320',2500.00,160,'2E','E12','2025-07-04 20:46:47','2025-07-04 20:46:47'),(13,'AT781',1,10,1,'2025-07-05 13:15:00','2025-07-05 15:30:00','SCHEDULED','Boeing 787-8',2300.00,240,'2E','E9','2025-07-04 20:46:47','2025-07-04 20:46:47'),(14,'TB502',3,11,2,'2025-07-05 13:20:00','2025-07-05 15:35:00','SCHEDULED','Boeing 737-800',1950.00,180,'3','G7','2025-07-04 20:46:47','2025-07-04 20:46:47'),(15,'AF264',4,10,2,'2025-07-05 19:57:00','2025-07-05 22:34:00','SCHEDULED','Airbus A320',2450.00,165,'2F','F5','2025-07-04 20:46:47','2025-07-04 20:46:47'),(16,'FR5432',21,11,2,'2025-07-05 12:20:00','2025-07-05 14:50:00','SCHEDULED','Boeing 737-800',1750.00,189,'3','G3','2025-07-04 20:46:47','2025-07-04 20:46:47'),(17,'IB3340',20,12,1,'2025-07-05 10:00:00','2025-07-05 11:45:00','SCHEDULED','Airbus A320',2100.00,170,'4','25','2025-07-04 20:46:47','2025-07-04 20:46:47'),(18,'AT970',1,12,1,'2025-07-05 17:30:00','2025-07-05 19:15:00','SCHEDULED','Boeing 737-800',1950.00,160,'4','28','2025-07-04 20:46:47','2025-07-04 20:46:47'),(19,'BA2666',25,13,2,'2025-07-05 12:20:00','2025-07-05 16:00:00','SCHEDULED','Airbus A320',2700.00,160,'5','C12','2025-07-04 20:46:47','2025-07-04 20:46:47'),(20,'FR8765',21,13,2,'2025-07-05 11:15:00','2025-07-05 14:45:00','SCHEDULED','Boeing 737-800',2100.00,189,'2','D8','2025-07-04 20:46:47','2025-07-04 20:46:47'),(21,'LH1338',27,14,1,'2025-07-05 08:45:00','2025-07-05 11:40:00','SCHEDULED','Airbus A320',2450.00,165,'1','A26','2025-07-04 20:46:47','2025-07-04 20:46:47'),(22,'VY7108',23,15,2,'2025-07-05 14:30:00','2025-07-05 16:15:00','SCHEDULED','Airbus A320',1890.00,180,'1','B22','2025-07-04 20:46:47','2025-07-04 20:46:47'),(23,'TK617',22,16,1,'2025-07-05 10:40:00','2025-07-05 13:55:00','SCHEDULED','Boeing 787-9',3200.00,290,'1','C10','2025-07-04 20:46:47','2025-07-04 20:46:47'),(24,'AT780',1,1,10,'2025-07-05 06:30:00','2025-07-05 11:00:00','SCHEDULED','Boeing 787-9',2650.00,260,'1','B3','2025-07-04 20:46:47','2025-07-04 20:46:47'),(25,'AF1597',4,1,10,'2025-07-05 12:45:00','2025-07-05 17:15:00','SCHEDULED','Airbus A320',2400.00,170,'1','7','2025-07-04 20:46:47','2025-07-04 20:46:47'),(26,'FR5082',21,2,13,'2025-07-05 10:35:00','2025-07-05 14:50:00','SCHEDULED','Boeing 737-800',1900.00,180,'1','5','2025-07-04 20:46:47','2025-07-04 20:46:47'),(27,'BA2667',25,2,13,'2025-07-05 15:30:00','2025-07-05 19:45:00','SCHEDULED','Airbus A320',2650.00,168,'1','8','2025-07-04 20:46:47','2025-07-04 20:46:47'),(28,'IB3341',20,1,12,'2025-07-05 14:20:00','2025-07-05 16:10:00','SCHEDULED','Airbus A320',1950.00,174,'1','A15','2025-07-04 20:46:47','2025-07-04 20:46:47'),(29,'EK751',26,17,1,'2025-07-05 07:30:00','2025-07-05 12:45:00','SCHEDULED','Boeing 777-300ER',4500.00,330,'3','A5','2025-07-04 20:46:47','2025-07-04 20:46:47'),(30,'EK752',26,1,17,'2025-07-05 14:30:00','2025-07-05 00:20:00','SCHEDULED','Boeing 777-300ER',4600.00,320,'1','D7','2025-07-04 20:46:47','2025-07-04 20:46:47'),(31,'QR1397',24,18,1,'2025-07-05 06:15:00','2025-07-05 12:20:00','SCHEDULED','Boeing 787-9',4200.00,250,'1','C10','2025-07-04 20:46:47','2025-07-04 20:46:47'),(32,'EY613',19,19,1,'2025-07-05 08:40:00','2025-07-05 14:30:00','SCHEDULED','Boeing 787-9',4300.00,240,'3','D12','2025-07-04 20:46:47','2025-07-04 20:46:47'),(33,'AT422',1,1,4,'2025-07-05 13:30:00','2025-07-05 14:30:00','DELAYED','Boeing 737-700',800.00,105,'1','A2','2025-07-04 20:46:47','2025-07-04 20:46:47'),(34,'3O283',2,1,3,'2025-07-05 07:00:00','2025-07-05 08:15:00','DEPARTED','Airbus A320',730.00,0,'2','B2','2025-07-04 20:46:47','2025-07-04 20:46:47'),(35,'AT406',1,1,2,'2025-07-05 06:00:00','2025-07-05 06:50:00','ARRIVED','Boeing 737-800',880.00,0,'1','A1','2025-07-04 20:46:47','2025-07-04 20:46:47'),(36,'FR5084',21,2,15,'2025-07-05 15:20:00','2025-07-05 18:40:00','CANCELLED','Boeing 737-800',1750.00,0,'1','9','2025-07-04 20:46:47','2025-07-04 20:46:47'),(37,'AT401',1,1,2,'2025-07-06 06:30:00','2025-07-06 07:20:00','SCHEDULED','Boeing 737-800',850.00,150,'1','A3','2025-07-04 21:04:19','2025-07-04 21:04:19'),(38,'3O276',2,1,2,'2025-07-06 12:45:00','2025-07-06 13:35:00','SCHEDULED','Airbus A320',780.00,180,'2','B1','2025-07-04 21:04:19','2025-07-04 21:04:19'),(39,'AT430',1,1,13,'2025-07-06 08:30:00','2025-07-06 09:20:00','SCHEDULED','Boeing 737-800',800.00,145,'1','A2','2025-07-04 21:04:19','2025-07-04 21:04:19'),(40,'3O281',2,1,13,'2025-07-06 14:45:00','2025-07-06 15:35:00','SCHEDULED','Airbus A320',750.00,170,'2','B1','2025-07-04 21:04:19','2025-07-04 21:04:19'),(41,'AT412',1,12,3,'2025-07-06 09:15:00','2025-07-06 10:30:00','SCHEDULED','Boeing 737-700',890.00,135,'1','A4','2025-07-04 21:04:19','2025-07-04 21:04:19'),(42,'3O285',2,12,3,'2025-07-06 16:00:00','2025-07-06 17:15:00','SCHEDULED','Airbus A320',820.00,165,'2','B3','2025-07-04 21:04:19','2025-07-04 21:04:19'),(43,'AT450',1,2,8,'2025-08-15 07:45:00','2025-08-15 08:45:00','SCHEDULED','Boeing 737-700',750.00,140,'1','A7','2025-07-04 21:05:14','2025-07-04 21:05:14'),(44,'3O291',2,2,8,'2025-08-15 13:30:00','2025-08-15 14:30:00','SCHEDULED','Airbus A320',720.00,175,'2','B5','2025-07-04 21:05:14','2025-07-04 21:05:14'),(45,'AT460',1,1,15,'2025-08-15 06:00:00','2025-08-15 08:45:00','SCHEDULED','Boeing 737-800',1200.00,130,'1','A1','2025-07-04 21:05:14','2025-07-04 21:05:14'),(46,'AT462',1,1,15,'2025-08-15 15:20:00','2025-08-15 18:05:00','SCHEDULED','Boeing 737-800',1350.00,120,'1','A2','2025-07-04 21:05:14','2025-07-04 21:05:14'),(47,'AT475',1,13,11,'2025-08-15 08:15:00','2025-08-15 09:30:00','SCHEDULED','Boeing 737-700',770.00,135,'1','A3','2025-07-04 21:05:14','2025-07-04 21:05:14'),(48,'AT440',1,1,7,'2025-09-10 10:30:00','2025-09-10 11:40:00','SCHEDULED','Boeing 737-700',760.00,138,'1','A6','2025-07-04 21:05:41','2025-07-04 21:05:41'),(49,'3O293',2,1,7,'2025-09-10 15:15:00','2025-09-10 16:25:00','SCHEDULED','Airbus A320',700.00,165,'2','B2','2025-07-04 21:05:41','2025-07-04 21:05:41'),(50,'AT445',1,12,9,'2025-09-10 09:00:00','2025-09-10 10:15:00','SCHEDULED','Boeing 737-700',790.00,135,'1','A5','2025-07-04 21:05:41','2025-07-04 21:05:41'),(51,'AF1596',4,21,1,'2025-07-06 09:30:00','2025-07-06 11:45:00','SCHEDULED','Airbus A320',2500.00,160,'2E','E12','2025-07-04 21:05:58','2025-07-04 21:05:58'),(52,'AT781',1,21,1,'2025-07-06 13:15:00','2025-07-06 15:30:00','SCHEDULED','Boeing 787-8',2300.00,240,'2E','E9','2025-07-04 21:05:58','2025-07-04 21:05:58'),(53,'IB3342',20,23,2,'2025-07-06 10:30:00','2025-07-06 12:15:00','SCHEDULED','Airbus A320',1950.00,170,'4','26','2025-07-04 21:05:58','2025-07-04 21:05:58'),(54,'FR8765',21,23,2,'2025-07-06 16:45:00','2025-07-06 18:30:00','SCHEDULED','Boeing 737-800',1700.00,189,'4','28','2025-07-04 21:05:58','2025-07-04 21:05:58'),(55,'BA2670',25,25,1,'2025-07-20 08:20:00','2025-07-20 12:40:00','SCHEDULED','Airbus A321',2550.00,175,'5','C15','2025-07-04 21:06:16','2025-07-04 21:06:16'),(56,'AT960',1,25,1,'2025-07-20 14:50:00','2025-07-20 19:10:00','SCHEDULED','Boeing 787-8',2400.00,220,'5','C20','2025-07-04 21:06:16','2025-07-04 21:06:16'),(57,'TK619',22,26,2,'2025-07-20 07:30:00','2025-07-20 11:15:00','SCHEDULED','Airbus A330-300',2900.00,280,'1','D7','2025-07-04 21:06:16','2025-07-04 21:06:16'),(58,'EK751',26,27,1,'2025-08-05 00:30:00','2025-08-05 06:45:00','SCHEDULED','Boeing 777-300ER',4500.00,330,'3','A5','2025-07-04 21:06:37','2025-07-04 21:06:37'),(59,'LH1339',27,1,29,'2025-08-05 13:20:00','2025-08-05 17:40:00','SCHEDULED','Airbus A320',2350.00,165,'1','B8','2025-07-04 21:06:37','2025-07-04 21:06:37'),(60,'QR1397',24,28,1,'2025-08-14 23:15:00','2025-08-15 06:20:00','SCHEDULED','Boeing 787-9',4200.00,250,'1','C10','2025-07-04 21:06:37','2025-07-04 21:06:37'),(61,'AT920',1,2,30,'2025-08-15 12:40:00','2025-08-15 17:10:00','SCHEDULED','Boeing 737-800',2100.00,155,'1','D5','2025-07-04 21:06:37','2025-07-04 21:06:37'),(62,'FR5089',21,2,30,'2025-08-15 15:15:00','2025-08-15 19:45:00','SCHEDULED','Boeing 737-800',1850.00,189,'1','D8','2025-07-04 21:06:37','2025-07-04 21:06:37'),(63,'IB3350',20,24,1,'2025-09-10 08:15:00','2025-09-10 11:30:00','SCHEDULED','Airbus A320',2250.00,170,'1','E15','2025-07-04 21:06:50','2025-07-04 21:06:50'),(64,'AT990',1,24,1,'2025-09-10 15:30:00','2025-09-10 18:45:00','SCHEDULED','Boeing 737-800',2150.00,155,'1','E18','2025-07-04 21:06:50','2025-07-04 21:06:50'),(65,'AT790',1,1,22,'2025-09-10 06:45:00','2025-09-10 10:30:00','SCHEDULED','Boeing 737-800',2250.00,165,'1','F7','2025-07-04 21:06:50','2025-07-04 21:06:50'),(66,'3O850',2,1,22,'2025-09-10 13:20:00','2025-09-10 17:05:00','SCHEDULED','Airbus A320',2100.00,180,'2','G5','2025-07-04 21:06:50','2025-07-04 21:06:50'),(67,'AT970',1,13,23,'2025-09-20 09:30:00','2025-09-20 11:15:00','SCHEDULED','Boeing 737-800',1950.00,160,'1','B3','2025-07-04 21:06:50','2025-07-04 21:06:50'),(68,'FR5095',21,13,23,'2025-09-20 14:40:00','2025-09-20 16:25:00','SCHEDULED','Boeing 737-800',1750.00,189,'1','B6','2025-07-04 21:06:50','2025-07-04 21:06:50'),(69,'AT422',1,1,8,'2025-07-06 07:30:00','2025-07-06 08:50:00','DELAYED','Boeing 737-700',800.00,105,'1','A2','2025-07-04 21:06:59','2025-07-04 21:06:59'),(70,'AF1598',4,21,1,'2025-07-06 14:20:00','2025-07-06 16:35:00','DELAYED','Airbus A320',2550.00,155,'2E','E14','2025-07-04 21:06:59','2025-07-04 21:06:59'),(71,'3O283',2,1,3,'2025-07-04 15:00:00','2025-07-04 16:10:00','DEPARTED','Airbus A320',730.00,0,'2','B2','2025-07-04 21:06:59','2025-07-04 21:06:59'),(72,'AT940',1,1,25,'2025-07-04 17:30:00','2025-07-04 21:45:00','DEPARTED','Boeing 787-8',2500.00,0,'1','D1','2025-07-04 21:06:59','2025-07-04 21:06:59'),(73,'AT406',1,1,2,'2025-07-04 14:00:00','2025-07-04 14:50:00','ARRIVED','Boeing 737-800',880.00,0,'1','A1','2025-07-04 21:06:59','2025-07-04 21:06:59'),(74,'QR1396',24,28,1,'2025-07-04 13:15:00','2025-07-04 20:20:00','ARRIVED','Boeing 787-9',4150.00,0,'1','C10','2025-07-04 21:06:59','2025-07-04 21:06:59'),(75,'FR5084',21,2,23,'2025-07-05 15:20:00','2025-07-05 17:05:00','CANCELLED','Boeing 737-800',1750.00,0,'1','9','2025-07-04 21:06:59','2025-07-04 21:06:59'),(76,'AT485',1,1,11,'2025-07-05 11:30:00','2025-07-05 12:45:00','CANCELLED','Boeing 737-700',820.00,0,'1','A8','2025-07-04 21:06:59','2025-07-04 21:06:59'),(80,'AT465',1,15,1,'2025-08-05 09:30:00','2025-08-05 12:15:00','SCHEDULED','Boeing 737-800',1250.00,130,'1','A3','2025-07-21 20:47:08','2025-07-21 20:47:08'),(81,'3O310',2,15,1,'2025-08-05 17:45:00','2025-08-05 20:30:00','SCHEDULED','Airbus A320',1150.00,160,'2','B7','2025-07-21 20:47:08','2025-07-21 20:47:08'),(82,'AT480',1,7,12,'2025-08-05 10:20:00','2025-08-05 11:40:00','SCHEDULED','Boeing 737-700',690.00,145,'1','C2','2025-07-21 20:47:08','2025-07-21 20:47:08'),(83,'TK785',22,1,26,'2025-07-15 13:00:00','2025-07-15 18:30:00','SCHEDULED','Airbus A330',3200.00,210,'1','D12','2025-07-21 20:47:13','2025-07-21 20:47:13'),(84,'AT705',1,1,26,'2025-07-15 21:15:00','2025-07-16 02:45:00','SCHEDULED','Boeing 787-9',3050.00,185,'1','E8','2025-07-21 20:47:13','2025-07-21 20:47:13'),(85,'IB347',20,23,13,'2025-07-15 08:45:00','2025-07-15 10:20:00','SCHEDULED','Airbus A320',1800.00,165,'4','31','2025-07-21 20:47:13','2025-07-21 20:47:13'),(86,'AF1780',4,2,21,'2025-08-25 06:30:00','2025-08-25 10:45:00','SCHEDULED','Airbus A320',2400.00,155,'1','A15','2025-07-21 20:47:17','2025-07-21 20:47:17'),(87,'3O920',2,2,21,'2025-08-25 14:20:00','2025-08-25 18:35:00','SCHEDULED','Airbus A321',2200.00,180,'2','B12','2025-07-21 20:47:17','2025-07-21 20:47:17'),(88,'BA298',25,25,3,'2025-08-25 09:40:00','2025-08-25 14:15:00','SCHEDULED','Airbus A321',2650.00,175,'3','D24','2025-07-21 20:47:17','2025-07-21 20:47:17'),(89,'LH1348',27,29,1,'2025-09-05 12:10:00','2025-09-05 15:25:00','SCHEDULED','Airbus A320',2450.00,160,'1','F10','2025-07-21 20:47:21','2025-07-21 20:47:21'),(90,'EK752',26,27,12,'2025-09-05 01:15:00','2025-09-05 07:30:00','SCHEDULED','Boeing 777',4800.00,315,'1','A21','2025-07-21 20:47:21','2025-07-21 20:47:21'),(91,'AT618',1,8,1,'2025-07-20 09:00:00','2025-07-20 10:10:00','DELAYED','Boeing 737-800',740.00,110,'1','B4','2025-07-21 20:47:45','2025-07-21 20:47:45'),(92,'3O335',2,12,9,'2025-09-10 07:30:00','2025-09-10 08:45:00','CANCELLED','Airbus A320',810.00,0,'2','H7','2025-07-21 20:47:45','2025-07-21 20:47:45'),(93,'QR1400',24,28,2,'2025-07-04 17:40:00','2025-07-05 00:50:00','ARRIVED','Boeing 787',3950.00,0,'1','C12','2025-07-21 20:47:45','2025-07-21 20:47:45'),(94,'AF1620',4,1,21,'2025-07-04 18:15:00','2025-07-04 22:30:00','DEPARTED','Airbus A350',2750.00,0,'2','E21','2025-07-21 20:47:45','2025-07-21 20:47:45'),(95,'AT512',1,3,8,'2025-07-24 08:45:00','2025-07-24 10:15:00','SCHEDULED','Boeing 737-700',920.00,140,'1','B2','2025-07-21 20:51:08','2025-07-21 20:51:08'),(96,'3O301',2,3,8,'2025-07-26 15:20:00','2025-07-26 16:50:00','SCHEDULED','Airbus A320',850.00,170,'2','C4','2025-07-21 20:51:08','2025-07-21 20:51:08'),(97,'TB225',3,11,2,'2025-07-27 11:30:00','2025-07-27 13:20:00','SCHEDULED','Boeing 737-800',780.00,155,'1','A5','2025-07-21 20:51:08','2025-07-21 20:51:08');
/*!40000 ALTER TABLE `flights` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` enum('ROLE_USER','ROLE_MODERATOR','ROLE_ADMIN') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `user_id` bigint NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `FKh8ciramu9cc9q3qcqiv4ue8a6` (`role_id`),
  CONSTRAINT `FKh8ciramu9cc9q3qcqiv4ue8a6` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `FKhfh9dx7w3ubf1co1vdev94g3f` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-25  0:01:30
