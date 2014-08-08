-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le: Ven 08 Août 2014 à 15:02
-- Version du serveur: 5.6.12-log
-- Version de PHP: 5.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `storytime`
--
CREATE DATABASE IF NOT EXISTS `storytime` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `storytime`;

-- --------------------------------------------------------

--
-- Structure de la table `characters`
--

CREATE TABLE IF NOT EXISTS `characters` (
  `character_id` int(11) NOT NULL AUTO_INCREMENT,
  `element_id` int(11) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `surname` varchar(50) DEFAULT NULL,
  `description` text,
  `mental` text,
  PRIMARY KEY (`character_id`),
  KEY `element_id` (`element_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `characters`
--

INSERT INTO `characters` (`character_id`, `element_id`, `name`, `surname`, `description`, `mental`) VALUES
(1, 5, 'Corbeau', 'Maître', 'un piaf', 'naïf'),
(2, 6, 'Renard', 'Maître', 'un animal', 'filou');

-- --------------------------------------------------------

--
-- Structure de la table `elements`
--

CREATE TABLE IF NOT EXISTS `elements` (
  `element_id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modification_date` datetime DEFAULT NULL,
  PRIMARY KEY (`element_id`),
  KEY `project_id` (`project_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Contenu de la table `elements`
--

INSERT INTO `elements` (`element_id`, `project_id`, `creation_date`, `modification_date`) VALUES
(1, 2, NULL, NULL),
(2, 2, NULL, NULL),
(3, 2, NULL, NULL),
(4, 2, NULL, NULL),
(5, 2, NULL, NULL),
(6, 2, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `elements_tags`
--

CREATE TABLE IF NOT EXISTS `elements_tags` (
  `tag_id` int(11) NOT NULL,
  `element_id` int(11) NOT NULL,
  PRIMARY KEY (`tag_id`,`element_id`),
  KEY `element_id` (`element_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `events`
--

CREATE TABLE IF NOT EXISTS `events` (
  `event_id` int(11) NOT NULL AUTO_INCREMENT,
  `element_id` int(11) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `description` text,
  `event_date` datetime DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  KEY `element_id` (`element_id`),
  KEY `parent_id` (`parent_id`),
  KEY `location_id` (`location_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `events`
--

INSERT INTO `events` (`event_id`, `element_id`, `name`, `description`, `event_date`, `location_id`, `parent_id`) VALUES
(1, 1, 'Début du conte', 'Il était une fois,...', NULL, NULL, NULL),
(2, 2, 'Présentation personnages', 'maître corbeau, sur un arbre perché', '2014-08-08 00:00:00', NULL, 1);

-- --------------------------------------------------------

--
-- Structure de la table `events_characters`
--

CREATE TABLE IF NOT EXISTS `events_characters` (
  `event_id` int(11) NOT NULL,
  `character_id` int(11) NOT NULL,
  PRIMARY KEY (`event_id`,`character_id`),
  KEY `character_id` (`character_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `locations`
--

CREATE TABLE IF NOT EXISTS `locations` (
  `location_id` int(11) NOT NULL AUTO_INCREMENT,
  `element_id` int(11) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `description` text,
  `parent_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`location_id`),
  KEY `element_id` (`element_id`),
  KEY `parent_id` (`parent_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `locations`
--

INSERT INTO `locations` (`location_id`, `element_id`, `name`, `description`, `parent_id`) VALUES
(1, 3, 'Un arbre', 'A big kick-ass tree', NULL),
(2, 4, 'Une branche', 'Faible branche fragile', 1);

-- --------------------------------------------------------

--
-- Structure de la table `projects`
--

CREATE TABLE IF NOT EXISTS `projects` (
  `project_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `summary` text,
  `creation_date` date DEFAULT NULL,
  `statut_id` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`project_id`),
  KEY `statut_id` (`statut_id`),
  KEY `parent_id` (`parent_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `projects`
--

INSERT INTO `projects` (`project_id`, `name`, `summary`, `creation_date`, `statut_id`, `parent_id`) VALUES
(1, 'Les fables de la fontaine', 'Toutes les fables !', '2014-07-01', 2, NULL),
(2, 'Le corbùé et le renard', 'Résumé !! :) hh', '2014-07-01', 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `statuts`
--

CREATE TABLE IF NOT EXISTS `statuts` (
  `statut_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`statut_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Contenu de la table `statuts`
--

INSERT INTO `statuts` (`statut_id`, `name`) VALUES
(1, 'ongoing'),
(2, 'paused'),
(3, 'finished');

-- --------------------------------------------------------

--
-- Structure de la table `tags`
--

CREATE TABLE IF NOT EXISTS `tags` (
  `tag_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `characters`
--
ALTER TABLE `characters`
  ADD CONSTRAINT `characters_ibfk_1` FOREIGN KEY (`element_id`) REFERENCES `elements` (`element_id`);

--
-- Contraintes pour la table `elements`
--
ALTER TABLE `elements`
  ADD CONSTRAINT `elements_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`);

--
-- Contraintes pour la table `elements_tags`
--
ALTER TABLE `elements_tags`
  ADD CONSTRAINT `elements_tags_ibfk_1` FOREIGN KEY (`element_id`) REFERENCES `elements` (`element_id`),
  ADD CONSTRAINT `elements_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`tag_id`);

--
-- Contraintes pour la table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`element_id`) REFERENCES `elements` (`element_id`),
  ADD CONSTRAINT `events_ibfk_2` FOREIGN KEY (`parent_id`) REFERENCES `events` (`event_id`),
  ADD CONSTRAINT `events_ibfk_3` FOREIGN KEY (`location_id`) REFERENCES `locations` (`location_id`);

--
-- Contraintes pour la table `events_characters`
--
ALTER TABLE `events_characters`
  ADD CONSTRAINT `events_characters_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`),
  ADD CONSTRAINT `events_characters_ibfk_2` FOREIGN KEY (`character_id`) REFERENCES `characters` (`character_id`);

--
-- Contraintes pour la table `locations`
--
ALTER TABLE `locations`
  ADD CONSTRAINT `locations_ibfk_1` FOREIGN KEY (`element_id`) REFERENCES `elements` (`element_id`),
  ADD CONSTRAINT `locations_ibfk_2` FOREIGN KEY (`parent_id`) REFERENCES `locations` (`location_id`);

--
-- Contraintes pour la table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`statut_id`) REFERENCES `statuts` (`statut_id`),
  ADD CONSTRAINT `projects_ibfk_2` FOREIGN KEY (`parent_id`) REFERENCES `projects` (`project_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
