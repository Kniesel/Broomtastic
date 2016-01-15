-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 15. Jan 2016 um 12:40
-- Server Version: 5.6.20
-- PHP-Version: 5.5.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `broomtastic_dynweb`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `products`
--

CREATE TABLE IF NOT EXISTS `products` (
`pk_productid` bigint(20) unsigned NOT NULL,
  `productname` varchar(256) NOT NULL,
  `category` varchar(256) NOT NULL,
  `price` int(11) NOT NULL,
  `description` varchar(256) DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=19 ;

--
-- Daten für Tabelle `products`
--

INSERT INTO `products` (`pk_productid`, `productname`, `category`, `price`, `description`) VALUES
(1, 'Snitch', 'Balls', 100, NULL),
(2, 'Quaffle', 'Balls', 50, NULL),
(3, 'Bludger', 'Balls', 70, NULL),
(4, 'Bludger (Set of two)', 'Balls', 135, NULL),
(5, 'How to Quidditch', 'Books', 42, NULL),
(6, 'Flying for dummies', 'Books', 18, NULL),
(7, 'Quidditch in a nutshell', 'Books', 120, NULL),
(8, 'Quidditch for dummies', 'Books', 18, NULL),
(9, 'Quidditch through the ages', 'Books', 20, NULL),
(10, 'Black Gloves', 'Clothing', 420, 'Made of high-quality dragon leather'),
(11, 'Shoes', 'Clothing', 130, NULL),
(12, 'Black Gloves', 'Clothing', 170, NULL),
(13, 'Golden Jacket', 'Clothing', 90, NULL),
(14, 'Red Jacket', 'Clothing', 90, NULL),
(15, 'Broomtastic 5000', 'Brooms', 5000, NULL),
(16, 'Broomtastic Kids', 'Brooms', 900, NULL),
(17, 'Broomtastic Senior', 'Brooms', 900, NULL),
(18, 'Broomtastic Traveller', 'Brooms', 1400, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
 ADD PRIMARY KEY (`pk_productid`), ADD UNIQUE KEY `pk_productid` (`pk_productid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
MODIFY `pk_productid` bigint(20) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=19;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
