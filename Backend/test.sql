-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3309
-- Generation Time: Jun 08, 2025 at 04:41 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!40101 SET NAMES utf8mb4 */
;
--
-- Database: `test`
--

-- --------------------------------------------------------
--
-- Table structure for table `admissions`
--

CREATE TABLE `admissions` (
  `id` int(11) NOT NULL,
  `student_name` varchar(100) NOT NULL,
  `parent_name` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `aadhaar_number` varchar(12) NOT NULL,
  `location` varchar(100) NOT NULL,
  `institution` varchar(100) NOT NULL,
  `course` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
-- --------------------------------------------------------
--
-- Table structure for table `contactus`
--

CREATE TABLE `contactus` (
  `Id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `message` text NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
--
-- Dumping data for table `contactus`
--

INSERT INTO `contactus` (`Id`, `name`, `email`, `message`, `created_at`)
VALUES (
    5,
    'Testing',
    'Testing@gmail.com',
    'Testing Testing Testing Testing',
    '2025-06-06 19:04:13'
  );
-- --------------------------------------------------------
--
-- Table structure for table `operation_bijoy`
--

CREATE TABLE `operation_bijoy` (
  `id` int(10) UNSIGNED NOT NULL,
  `image_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
--
-- Dumping data for table `operation_bijoy`
--

INSERT INTO `operation_bijoy` (
    `id`,
    `image_path`,
    `date`,
    `title`,
    `comment`,
    `created_at`,
    `updated_at`
  )
VALUES (
    3,
    'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e',
    '2025-09-15',
    'Annual Tournament 2025',
    'Join us for our annual tournament with exciting prizes! Limited seats available!',
    '2025-05-11 12:58:20',
    '2025-05-11 13:01:36'
  ),
  (
    4,
    'https://images.unsplash.com/photo-1594381898411-846e7d193883',
    '2025-07-25',
    'Summer Tournament 2025',
    'Join us for our summer tournament with exciting prizes!',
    '2025-05-11 16:14:13',
    '2025-05-11 16:22:55'
  ),
  (
    11,
    '/public/uploads/1749217937669-Screenshot 2025-06-06 163730.png',
    '2025-06-26',
    'Testing',
    'Testing',
    '2025-06-06 13:52:18',
    '2025-06-06 13:52:18'
  );
-- --------------------------------------------------------
--
-- Table structure for table `signup`
--

CREATE TABLE `signup` (
  `Id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT 0
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
--
-- Dumping data for table `signup`
--

INSERT INTO `signup` (`Id`, `name`, `email`, `password`, `is_admin`)
VALUES (
    9,
    'Abhinav Kumar Jha',
    'akr@gmail.com',
    '$2b$12$rDyLOas21Zr/ICpjFX36HOGDk18hBbqDiyO2Hmd8ffxZ3DkOptqpC',
    0
  ),
  (
    10,
    'Abhinav Kumar Jha',
    'abhinavkumarjha90@gmail.com',
    '$2b$12$XPDkLtjJCnY3GZegcaNQjOeGjhkgsAzNcGRAZOMNZJUH9F8fvLpC.',
    1
  ),
  (
    11,
    'Developer1',
    'Developer@gmail.com',
    '$2a$12$DqMT88hAG25kXQHQ4a37cuU5O1fhGPpP2APJSyZmGmcjnTNAywFO.',
    0
  );
--
-- Indexes for dumped tables
--

--
-- Indexes for table `admissions`
--
ALTER TABLE `admissions`
ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `aadhaar_number` (`aadhaar_number`);
--
-- Indexes for table `contactus`
--
ALTER TABLE `contactus`
ADD PRIMARY KEY (`Id`);
--

-- Indexes for table `operation_bijoy`
--
ALTER TABLE `operation_bijoy`
ADD PRIMARY KEY (`id`),
  ADD KEY `idx_date` (`date`),
  ADD KEY `idx_title` (`title`);
--
-- Indexes for table `signup`
--
ALTER TABLE `signup`
ADD PRIMARY KEY (`Id`);
--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admissions`
--
ALTER TABLE `admissions`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 4;
--
-- AUTO_INCREMENT for table `contactus`
--
ALTER TABLE `contactus`
MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 6;
--
-- AUTO_INCREMENT for table `operation_bijoy`
--
ALTER TABLE `operation_bijoy`
MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 12;
--
-- AUTO_INCREMENT for table `practice`
--
ALTER TABLE `signup`
MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 12;
COMMIT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;