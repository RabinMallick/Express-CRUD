-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 08, 2020 at 04:08 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.2.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customer_id` int(30) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `address` varchar(200) NOT NULL,
  `admin_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`customer_id`, `name`, `email`, `address`, `admin_id`) VALUES
(1, 'Rabin Mallick', 'rabinmallick@gmail.com', 'Dhaka', 24),
(4, 'Michael Jackson', 'michael@gmail.com', 'California, USA', 24);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `password`) VALUES
(23, 'John Snow', 'john@gmail.com', '34f4b5c6b5359dbe2e57acaa0e67cd2bb33bd829d2a62bc62aee36a46c456a0d2e730b20f214c85f02864db483cf679128ce7d7d56057d5a29ef7e5b52e932e74e6646c5e841572aedcb934a4594daf08d4576d78fcb95584f8e8cde4403e8ccac4afdec4c90'),
(24, 'Rabin Mallick', 'rabinmallick@gmail.com', '8dd280e57653422e95c8d506a432a779723f5cd95486759f948fc6f852799b34682bf96ae90be495c8b10b0382a8fc40f13a92224652a034551e6dca28e9f1c476351d1b433ca0ef6ab0fc5317d6da60ea54a93fdd7867357a6e057085e82ec440e78fc96366'),
(25, 'Michael Jackson', 'michael@gmail.com', '67ae32a9ddddb37544160bd0008e915ee1d4122ba3229f2a95360d03451ac6c2f3a5c762640042ac9d571c0dff035647e496b169dec602cb54225ad218418eeeb6d457a7bc0d10391e27e4cfb559db9a4d37b523982652cd8e4d07244b1fbfe6d06c86984909');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customer_id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
