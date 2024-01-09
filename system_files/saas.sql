-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 05, 2024 at 03:24 PM
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
-- Database: `saas`
--

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `blog_id` bigint(14) NOT NULL,
  `blog_title` varchar(255) NOT NULL,
  `blog_slug` varchar(255) NOT NULL,
  `blog_post` longtext NOT NULL,
  `blog_cover_pic` varchar(255) NOT NULL,
  `blog_cover_pic_type` varchar(100) NOT NULL,
  `meta_keywords` longtext NOT NULL,
  `meta_description` varchar(200) NOT NULL,
  `category_id` bigint(14) NOT NULL,
  `created_by` varchar(20) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` bigint(14) NOT NULL,
  `category_name` varchar(150) NOT NULL,
  `category_slug` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `login_access`
--

CREATE TABLE `login_access` (
  `user_id` int(9) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(32) NOT NULL,
  `role` int(2) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login_access`
--

INSERT INTO `login_access` (`user_id`, `username`, `password`, `role`, `status`) VALUES
(1, 'admin', 'admin', 1, 1),
(2, 'arghya992', 'arghya123', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `mas_role`
--

CREATE TABLE `mas_role` (
  `role_id` int(2) NOT NULL,
  `role_name` varchar(100) NOT NULL,
  `role_status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mas_role`
--

INSERT INTO `mas_role` (`role_id`, `role_name`, `role_status`) VALUES
(1, 'Administrator', 1),
(2, 'User', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `user_id` int(9) NOT NULL,
  `username` varchar(20) NOT NULL,
  `first_name` varchar(200) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email_id` varchar(150) DEFAULT NULL,
  `about` varchar(255) NOT NULL,
  `linkedin_profile` varchar(255) DEFAULT NULL,
  `facebook_profile` varchar(255) DEFAULT NULL,
  `instagram_profile` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_details`
--

INSERT INTO `user_details` (`user_id`, `username`, `first_name`, `last_name`, `email_id`, `about`, `linkedin_profile`, `facebook_profile`, `instagram_profile`, `status`) VALUES
(1, 'admin', 'Admin', 'Dev', 'admin@gmail.com', 'IT developers', '', '', '', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`blog_id`),
  ADD UNIQUE KEY `blog_title` (`blog_title`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `login_access`
--
ALTER TABLE `login_access`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `mas_role`
--
ALTER TABLE `mas_role`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `user_details`
--
ALTER TABLE `user_details`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email_id` (`email_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `login_access`
--
ALTER TABLE `login_access`
  MODIFY `user_id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `mas_role`
--
ALTER TABLE `mas_role`
  MODIFY `role_id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_details`
--
ALTER TABLE `user_details`
  MODIFY `user_id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
