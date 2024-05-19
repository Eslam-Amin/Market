-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 19, 2024 at 07:06 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `market`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isDeleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `name`, `email`, `password`, `isDeleted`) VALUES
(20240, 'Eslam Amin', 'eslam@gmail.com', '$2b$10$Hlb0skWLyuqNQHJQ6UbEw.LwS1Vyf2II25yJOAoy0zi1ASVs.nxX6', 0);

-- --------------------------------------------------------

--
-- Table structure for table `branches`
--

CREATE TABLE `branches` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `address` varchar(100) NOT NULL,
  `phone` varchar(25) NOT NULL,
  `isDeleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `branches`
--

INSERT INTO `branches` (`id`, `name`, `address`, `phone`, `isDeleted`) VALUES
(1001, 'Seodi', 'Roxy', '18622', 0),
(1002, 'Carfour', 'Obour', '19600', 1),
(1003, 'Carfour', '5th Settlement', '19620', 0),
(1004, 'Hyber Market', '5th Settlement', '17300', 0),
(1005, 'Hyber One', '5th Settlement', '18300', 0),
(1006, 'Seodi', 'El Tagamoaa', '18620', 0);

-- --------------------------------------------------------

--
-- Table structure for table `cashiers`
--

CREATE TABLE `cashiers` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `branch` int(11) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cashiers`
--

INSERT INTO `cashiers` (`id`, `name`, `email`, `password`, `image`, `branch`, `isDeleted`) VALUES
(1, 'ECa AmiNOo', 'eca@gmail.com', '$2b$10$t3GRyXwb1lPBsl4nFS0CMOk5CR5V5C./CqiA8Bldghyl7K6RGZGpW', NULL, 1006, 0),
(2, 'Yussif Kahilo', 'yussif@gmail.com', '$2b$10$m7Db6aki9HDYNSQrRdNaW.mnDIJeY7vEgZc.iLSW.rvvrLhRmHFD6', NULL, 1001, 0),
(3, 'Kareem Hassan', 'kareem@gmail.com', '$2b$10$PjGurYV28FiRRYJSi9osJO1gTjeKukurkVAihP411yWHsYn5ICGx2', NULL, 1001, 0),
(4, 'Ziad Hassan', 'ziad@gmail.com', '$2b$10$vQUK5QQuGbBOdp0H0lIXauvlicvTJkNuMga1/9qR2LO1kd6hMqsy.', NULL, 1001, 0),
(5, 'Ahmed Farouq', 'ahmed@gmail.com', '$2b$10$4AjM5Ssid5uPbXXiO/Ux.uenNcUhAc3sPN4SoFhP88MpXmMHeJSgS', NULL, 1003, 0),
(6, 'Omar Samir', 'omar@gmail.com', '$2b$10$mbfouPrLAyrjMr0MVFVL8OgOGLUoRhDRcfrUrCp0GL.Tm3f8fcfFC', NULL, 1005, 0),
(7, 'Moustafa Sayed', 'moustafa@gmail.com', '$2b$10$8NEELozJBeYHKT6MRrlOYO8ktu5YguPvH.CycGho9jKxygtMgVrFG', NULL, 1004, 0),
(8, 'Moamen Sayed', 'moamen@gmail.com', '$2b$10$ji/tuSVSVwuHgQUXOWWJheG6VXRHvnNSsPGVMpbeYk88oRUmCAZOK', NULL, 1005, 0),
(10, 'Moamen Sayed', 'mo@gmail.com', '$2b$10$qQksZfZ1Jr37CmpUK3sfbuirCiQsJE/kXGnyeakqT68EJVRcFdBEq', NULL, 1003, 0);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `price` float NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT 0,
  `category` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `image`, `isDeleted`, `category`) VALUES
(48, 'banana', 1, '', 0, 'fruit'),
(49, 'apple', 2.5, '', 0, 'fruit'),
(50, 'guava', 2.5, '', 1, 'fruit'),
(51, 'mango', 5, 'product-mango.png', 0, 'fruit'),
(52, 'strawberry', 3, 'asdasd.png', 0, 'fruit'),
(53, 'kiwi', 3, '', 0, 'fruit'),
(54, 'tomato', 3, '', 0, 'fruit'),
(55, 'carrot', 2.5, '', 0, 'vegetable'),
(56, 'onion', 1.5, '', 0, 'vegetable'),
(57, 'potato', 2, '', 0, 'vegetable'),
(58, 'beets', 2, '', 0, 'vegetable'),
(59, 'green peas', 3, '', 0, 'vegetable'),
(60, 'mushroom', 4, '', 0, 'vegetable'),
(61, 'broccoli', 3, '', 0, 'vegetable'),
(62, 'cerely', 1.5, '', 0, 'vegetable'),
(63, 'corn', 1.5, '', 0, 'vegetable'),
(64, 'leeks', 1.5, '', 0, 'vegetable'),
(65, 'pumpkin', 4, '', 0, 'vegetable'),
(66, 'cherries', 4, '', 0, 'fruit'),
(67, 'watermelon', 5, '', 0, 'fruit'),
(68, 'orange', 4, '', 0, 'fruit'),
(69, 'grapes', 3, '', 0, 'fruit'),
(70, 'cantaloupe', 4, '', 0, 'fruit'),
(71, 'avocado', 6, '', 0, 'fruit'),
(72, 'raspberry', 4, '', 0, 'fruit'),
(73, 'pear', 4, '', 0, 'fruit'),
(74, 'pomegranate', 3, '', 0, 'fruit');

-- --------------------------------------------------------

--
-- Table structure for table `receipts`
--

CREATE TABLE `receipts` (
  `id` int(11) NOT NULL,
  `productName` varchar(100) NOT NULL,
  `productCategory` varchar(100) NOT NULL,
  `productPrice` float NOT NULL,
  `productQuantity` int(11) NOT NULL,
  `receiptTotalPrice` float NOT NULL,
  `cashier` int(11) NOT NULL,
  `branch` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `receipts`
--

INSERT INTO `receipts` (`id`, `productName`, `productCategory`, `productPrice`, `productQuantity`, `receiptTotalPrice`, `cashier`, `branch`, `created_at`) VALUES
(1, 'banana', 'fruit', 1, 2, 2, 1, 1006, '2024-05-19 15:45:42'),
(2, 'apple', 'fruit', 2.5, 2, 5, 1, 1006, '2024-05-19 15:45:42'),
(3, 'banana', 'fruit', 1, 2, 2, 1, 1006, '2024-05-19 15:47:51'),
(4, 'apple', 'fruit', 2.5, 2, 5, 1, 1006, '2024-05-19 15:47:51'),
(5, 'banana', 'fruit', 1, 2, 2, 1, 1006, '2024-05-19 15:48:14'),
(6, 'apple', 'fruit', 2.5, 2, 5, 1, 1006, '2024-05-19 15:48:14'),
(7, 'mango', 'fruit', 5, 2, 10, 1, 1006, '2024-05-19 15:49:44'),
(8, 'mango', 'fruit', 5, 2, 10, 1, 1006, '2024-05-19 16:05:08'),
(9, 'mango', 'fruit', 5, 2, 10, 1, 1006, '2024-05-19 16:06:25'),
(10, 'mango', 'fruit', 5, 2, 10, 5, 1003, '2024-05-19 16:51:52'),
(11, 'guava', 'fruit', 2.5, 4, 10, 5, 1003, '2024-05-19 16:51:52');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- Indexes for table `cashiers`
--
ALTER TABLE `cashiers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `branch` (`branch`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `receipts`
--
ALTER TABLE `receipts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `branch` (`branch`),
  ADD KEY `cashier` (`cashier`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20241;

--
-- AUTO_INCREMENT for table `branches`
--
ALTER TABLE `branches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1007;

--
-- AUTO_INCREMENT for table `cashiers`
--
ALTER TABLE `cashiers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `receipts`
--
ALTER TABLE `receipts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cashiers`
--
ALTER TABLE `cashiers`
  ADD CONSTRAINT `branch` FOREIGN KEY (`branch`) REFERENCES `branches` (`id`);

--
-- Constraints for table `receipts`
--
ALTER TABLE `receipts`
  ADD CONSTRAINT `receipts_ibfk_1` FOREIGN KEY (`branch`) REFERENCES `branches` (`id`),
  ADD CONSTRAINT `receipts_ibfk_2` FOREIGN KEY (`cashier`) REFERENCES `cashiers` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
