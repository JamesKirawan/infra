-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 27, 2022 at 05:56 PM
-- Server version: 10.4.11-MariaDB-log
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce`
--
CREATE DATABASE IF NOT EXISTS `ecommerce` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `ecommerce`;

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `userId` int(10) NOT NULL,
  `productId` int(10) NOT NULL,
  `productQty` int(10) NOT NULL,
  `status` varchar(25) NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date NOT NULL DEFAULT current_timestamp(),
  `transactionId` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`userId`, `productId`, `productQty`, `status`, `createdAt`, `updatedAt`, `transactionId`) VALUES
(6, 12, 1, '', '2022-01-27', '2022-01-27', 5),
(6, 24, 1, '', '2022-01-27', '2022-01-27', 7),
(6, 23, 1, '', '2022-01-27', '2022-01-27', 7),
(6, 24, 1, '', '2022-01-27', '2022-01-27', 8),
(6, 23, 1, '', '2022-01-27', '2022-01-27', 8),
(6, 1, 1, '', '2022-01-27', '2022-01-27', 9),
(6, 3, 1, '', '2022-01-27', '2022-01-27', 9),
(6, 12, 1, '', '2022-01-27', '2022-01-27', 9),
(6, 3, 1, '', '2022-01-27', '2022-01-27', NULL),
(6, 12, 1, '', '2022-01-27', '2022-01-27', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `productId` int(10) NOT NULL,
  `productName` varchar(255) NOT NULL,
  `productSummary` text NOT NULL,
  `productDesc` text NOT NULL,
  `productCategory` varchar(255) NOT NULL,
  `productBrand` varchar(25) NOT NULL,
  `productPrice` int(10) NOT NULL,
  `productStock` int(10) NOT NULL,
  `discountId` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`productId`, `productName`, `productSummary`, `productDesc`, `productCategory`, `productBrand`, `productPrice`, `productStock`, `discountId`) VALUES
(1, 'Testing Monitor', 'Summary', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut est bibendum, vulputate felis quis, porta libero. Curabitur ut mauris sed ligula blandit porttitor eu eget elit. Praesent vulputate vestibulum fermentum. Sed efficitur quam enim, sit amet porttitor justo sollicitudin in. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce luctus eleifend semper. Suspendisse tempus turpis ac augue tincidunt pellentesque. Duis non tristique libero. In vitae nulla lectus. Ut arcu sem, convallis sed semper ac, bibendum id tortor. Aenean convallis pellentesque dolor eu gravida. Nunc commodo urna tempus mauris euismod congue.\r\n\r\nNulla leo odio, accumsan vitae mi at, porta consectetur neque. Sed non sem fermentum, ornare elit in, laoreet massa. Proin et sagittis risus. Suspendisse non porta purus. Vivamus sit amet ultrices urna, sed viverra sapien. Cras sed augue ut ante rutrum suscipit at ac augue. Morbi ultricies, tellus eu congue pellentesque, purus odio tristique lectus, a ultrices quam orci nec erat. Donec quis suscipit dui. Mauris semper, ex at consequat tempor, dolor felis lacinia felis, eu rutrum nisl libero sed lacus. Aliquam dapibus tellus eu augue egestas bibendum. In sed rutrum lacus. Fusce non pellentesque eros. Sed vel vestibulum augue.', 'Elektronik', 'Monitor', 1000000, 1, 2),
(3, 'Asus Zen-Book Pro-Duo', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet turpis ex. Curabitur fermentum interdum odio vitae sollicitudin. Proin nec viverra orci, vitae ullamcorper nisi. Proin vitae porttitor justo. Donec interdum sollicitudin velit, vel semper mi egestas ac. Suspendisse potenti. Proin commodo posuere enim dignissim aliquam. Vivamus ut aliquam lectus. Sed facilisis odio at elit feugiat venenatis. Integer fermentum suscipit tempus. Donec quis leo dui. Vivamus quis leo vitae risus pharetra pellentesque.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum pretium mauris rhoncus ornare. Phasellus sit amet efficitur dui. Phasellus hendrerit leo in pharetra fringilla. Sed ac erat diam. Fusce nec mattis urna. Suspendisse potenti. Cras fringilla, lorem ac iaculis pharetra, libero lorem interdum neque, at tristique augue felis sit amet elit. Donec tempor consectetur lectus in laoreet.\r\n\r\nVestibulum id facilisis massa, quis pharetra diam. Donec id rhoncus est, ut viverra leo. Cras vel fringilla diam. Fusce fringilla, enim a euismod molestie, purus metus faucibus ipsum, quis sodales massa ex ac orci. Donec magna dolor, malesuada eget gravida quis, mattis eget metus. Sed nec porttitor orci, eget maximus nisi. Donec fringilla dapibus erat, eget fermentum nibh interdum ac.\r\n\r\nMorbi laoreet odio eu lacus egestas semper. Fusce vestibulum mattis mi. Ut tincidunt fringilla ullamcorper. Vestibulum rhoncus at elit eget sodales. Quisque rhoncus risus lectus, eget aliquet elit efficitur a. Maecenas sit amet libero posuere, dictum dui rutrum, tincidunt massa. Donec scelerisque convallis nulla nec congue. Aenean semper, lacus et aliquam blandit, enim orci interdum lacus, a malesuada diam felis vitae lorem. Nulla placerat luctus libero. Ut ultricies finibus erat at venenatis. Vestibulum sollicitudin a turpis sed pretium.', 'Laptop', 'ASUS', 50000000, 2, 4),
(12, 'Gaming PC', 'Lorem', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut est bibendum, vulputate felis quis, porta libero. Curabitur ut mauris sed ligula blandit porttitor eu eget elit. Praesent vulputate vestibulum fermentum. Sed efficitur quam enim, sit amet porttitor justo sollicitudin in. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce luctus eleifend semper. Suspendisse tempus turpis ac augue tincidunt pellentesque. Duis non tristique libero. In vitae nulla lectus. Ut arcu sem, convallis sed semper ac, bibendum id tortor. Aenean convallis pellentesque dolor eu gravida. Nunc commodo urna tempus mauris euismod congue.\n\nNulla leo odio, accumsan vitae mi at, porta consectetur neque. Sed non sem fermentum, ornare elit in, laoreet massa. Proin et sagittis risus. Suspendisse non porta purus. Vivamus sit amet ultrices urna, sed viverra sapien. Cras sed augue ut ante rutrum suscipit at ac augue. Morbi ultricies, tellus eu congue pellentesque, purus odio tristique lectus, a ultrices quam orci nec erat. Donec quis suscipit dui. Mauris semper, ex at consequat tempor, dolor felis lacinia felis, eu rutrum nisl libero sed lacus. Aliquam dapibus tellus eu augue egestas bibendum. In sed rutrum lacus. Fusce non pellentesque eros. Sed vel vestibulum augue.', 'Computer', 'ASUS', 2500000, 6, NULL),
(13, 'ASUS RGB Mechanical Gaming Keyboard', 'Gaming Keyboard for PC | Customizable Badge, USB Pass-Through | Media Controls', 'PRO GAMERS PREFERRED - ASUS ROG Strix Flare Mechanical Gaming Keyboard is made of German Cherry MX Blue switches that offer faster response time, enhanced gaming performance & tactile feedback with each keystroke\r\nANTI-GHOSTING - 100% anti-ghosting with super-fast response, onboard memory, on-the fly macro recordings, Windows lock key, under-keyboard cable routing for uninterrupted video games sessions – it’s got it all!\r\nUNIQUELY YOURS - With ASUS Aura Sync, create your own style utilizing the entire color spectrum and a range of dynamic lighting effects, and bring your RGB keyboard to life with vibrant per-key backlight and underglow on the sides\r\nCUSTOMIZE YOUR LOGO - Flare up your RGB keyboard by creating your own personalized logo with the provided black acrylic badge. As soon as you insert it into this wired gamer keyboard, it\'ll light up with Aura\r\nDEDICATED KEYBOARD MEDIA CONTROLS - Control your audio with instant media keys & smooth-scrolling volume wheel on upper left on this PC gaming keyboard. Includes USB PASSTHROUGH for easy connectivity & a DETACHABLE WRIST-REST for extra comfort', 'Keyboard', 'Asus', 2455018, 5, NULL),
(14, 'Acer Aspire E14 Core i5 7', 'Laptop Gaming Desain Acer Aspire E14 Core i5 7200U Nvidia Slim Mulus', 'Core i5 7200U\r\nRam 8gb DDR4\r\nHDD 1000gb\r\nLayar 14inc HD\r\nDual VGA Nvidia Geforce 940MX 2gb\r\nWebcam\r\nDVD\r\nHDMI\r\nBody Slim\r\nMulus', 'Laptop', 'Acer', 5600000, 0, NULL),
(22, 'Apple Watch Series 5', 'On Retina display that never sleeps, so it’s easy to see the time and other important information, without raising or tapping the display. New location features, from a built-in compass to current elevation, help users better navigate their day, while international emergency calling1 allows customers to call emergency services directly from Apple Watch in over 150 countries, even without iPhone nearby. Apple Watch Series 5 is available in a wider range of materials, including aluminium, stainless steel, ceramic and an all-new titanium.', 'On Retina display that never sleeps, so it’s easy to see the time and other important information, without raising or tapping the display. New location features, from a built-in compass to current elevation, help users better navigate their day, while international emergency calling1 allows customers to call emergency services directly from Apple Watch in over 150 countries, even without iPhone nearby. Apple Watch Series 5 is available in a wider range of materials, including aluminium, stainless steel, ceramic and an all-new titanium.', 'Gadget', 'Apple', 4900000, 3, NULL),
(23, 'Apple iPhone 11 (64GB, Black)', 'The Apple iPhone 11 is a great smartphone, which was loaded with a lot of quality features. It comes with a waterproof and dustproof body which is the key attraction of the device. The excellent set of cameras offer excellent images as well as capable of recording crisp videos. However, expandable storage and a fingerprint scanner would have made it a perfect option to go for around this price range.', 'The Apple iPhone 11 is a great smartphone, which was loaded with a lot of quality features. It comes with a waterproof and dustproof body which is the key attraction of the device. The excellent set of cameras offer excellent images as well as capable of recording crisp videos. However, expandable storage and a fingerprint scanner would have made it a perfect option to go for around this price range.', 'Smartphone', 'Apple', 9600000, 9, NULL),
(24, 'OnePlus 7 Pro', 'The OnePlus 7 Pro features a brand new design, with a glass back and front and curved sides. The phone feels very premium but’s it’s also very heavy. The Nebula Blue variant looks slick but it’s quite slippery, which makes single-handed use a real challenge. It has a massive 6.67-inch ‘Fluid AMOLED’ display with a QHD+ resolution, 90Hz refresh rate and support for HDR 10+ content. The display produces vivid colours, deep blacks and has good viewing angles.', 'The OnePlus 7 Pro features a brand new design, with a glass back and front and curved sides. The phone feels very premium but’s it’s also very heavy. The Nebula Blue variant looks slick but it’s quite slippery, which makes single-handed use a real challenge. It has a massive 6.67-inch ‘Fluid AMOLED’ display with a QHD+ resolution, 90Hz refresh rate and support for HDR 10+ content. The display produces vivid colours, deep blacks and has good viewing angles.', 'Smartphone', 'OnePlus', 2100000, 9, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_comment`
--

DROP TABLE IF EXISTS `product_comment`;
CREATE TABLE `product_comment` (
  `commentId` int(15) NOT NULL,
  `userId` int(10) NOT NULL,
  `productId` int(10) NOT NULL,
  `commentText` text NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_comment`
--

INSERT INTO `product_comment` (`commentId`, `userId`, `productId`, `commentText`, `createdAt`, `updatedAt`) VALUES
(2, 1, 1, 'First Content!', '2022-01-05 00:12:14', '2022-01-09 12:19:25'),
(5, 2, 1, 'Waiting for your next! my man', '2022-01-06 16:22:15', '2022-01-09 09:04:31'),
(6, 1, 1, 'Thanks Man!', '2022-01-06 16:23:31', '2022-01-06 16:23:31'),
(8, 2, 1, 'Your Welcome', '2022-01-07 21:06:51', '2022-01-07 21:06:51'),
(14, 3, 1, 'Test', '2022-01-09 13:51:20', '2022-01-09 13:51:20'),
(16, 5, 3, 'Test', '2022-01-15 12:23:51', '2022-01-15 12:23:51'),
(17, 5, 13, 'Great!', '2022-01-15 12:24:11', '2022-01-15 12:24:11'),
(18, 6, 3, 'Test', '2022-01-15 12:24:36', '2022-01-15 12:24:36'),
(19, 5, 12, 'Test', '2022-01-16 04:52:20', '2022-01-16 04:52:20'),
(22, 5, 1, 'komen admin warna merah', '2022-01-17 19:14:05', '2022-01-17 19:14:05');

-- --------------------------------------------------------

--
-- Table structure for table `product_discount`
--

DROP TABLE IF EXISTS `product_discount`;
CREATE TABLE `product_discount` (
  `discountId` int(10) NOT NULL,
  `discountName` varchar(25) NOT NULL,
  `discountPercent` int(3) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_discount`
--

INSERT INTO `product_discount` (`discountId`, `discountName`, `discountPercent`, `createdAt`, `updatedAt`) VALUES
(2, 'Diskon Akhir Tahun', 50, '2022-01-09 07:09:23', '2022-01-09 07:09:23'),
(4, 'Diskon Awal Tahun', 60, '2022-01-09 18:36:28', '2022-01-09 18:36:28');

-- --------------------------------------------------------

--
-- Table structure for table `product_gallery`
--

DROP TABLE IF EXISTS `product_gallery`;
CREATE TABLE `product_gallery` (
  `imageId` int(10) NOT NULL,
  `imageType` varchar(25) NOT NULL,
  `imageName` varchar(50) NOT NULL,
  `imagePath` varchar(250) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `used` enum('True','False') NOT NULL,
  `productId` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_gallery`
--

INSERT INTO `product_gallery` (`imageId`, `imageType`, `imageName`, `imagePath`, `createdAt`, `used`, `productId`) VALUES
(1, 'image/jpeg', 'images.jpg', 'uploads/1641214251065-Testing Monitor-images.jpg', '2022-01-03 12:50:51', 'False', 1),
(5, 'image/jpeg', 'download (3).jpg', 'uploads/1641587482180-Testing Monitor-download (3).jpg', '2022-01-07 20:31:22', 'False', 1),
(7, 'image/jpeg', 'produo.jpg', 'uploads/1641722909127-Asus Zen-Book Pro-Duo-produo.jpg', '2022-01-09 10:08:30', 'True', 3),
(8, 'image/jpeg', 'download (1).jpg', 'uploads/1641725685502-Asus Zen-Book Pro-Duo-download (1).jpg', '2022-01-09 10:54:45', 'False', 3),
(26, 'image/jpeg', '1641587310652-Testing Monitor-download (2).jpg', 'uploads/1642090360738-undefined-1641587310652-Testing Monitor-download (2).jpg', '2022-01-13 16:12:40', 'True', 1),
(27, 'image/png', '1642125737123-undefined-inventory.png', 'uploads/1642245253977-undefined-1642125737123-undefined-inventory.png', '2022-01-15 11:14:14', 'False', 12),
(29, 'image/jpeg', '1642125822202-undefined-20f535c616bbe807a1166e5661', 'uploads/1642247117834-undefined-1642125822202-undefined-20f535c616bbe807a1166e5661b396fd.jpg', '2022-01-15 11:45:17', 'True', 12),
(30, 'image/jpeg', '91DbiglR1qL._AC_SL1500_.jpg', 'uploads/1642249163283-ASUS RGB Mechanical Gaming Keyboard - ROG Strix Flare-91DbiglR1qL._AC_SL1500_.jpg', '2022-01-15 12:19:23', 'True', 13),
(31, 'image/jpeg', 'jalankan-aktivitasmu-dengan-aspire-e14-.jpg', 'uploads/1642249644741-Acer Aspire E14 Core i5 7200U Nvidia-jalankan-aktivitasmu-dengan-aspire-e14-.jpg', '2022-01-15 12:27:24', 'True', 14),
(42, 'image/png', '1.png', 'uploads/1642775081742-Apple Watch Series 5-1.png', '2022-01-21 14:24:41', 'True', 22),
(43, 'image/png', '2.png', 'uploads/1642775149246-Apple iPhone 11 (64GB, Black)-2.png', '2022-01-21 14:25:49', 'True', 23),
(44, 'image/png', '9.png', 'uploads/1642775894027-OnePlus 7 Pro-9.png', '2022-01-21 14:38:14', 'True', 24);

-- --------------------------------------------------------

--
-- Table structure for table `product_rating`
--

DROP TABLE IF EXISTS `product_rating`;
CREATE TABLE `product_rating` (
  `productRatingId` int(10) NOT NULL,
  `userId` int(10) NOT NULL,
  `productId` int(10) NOT NULL,
  `productRating` int(1) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_rating`
--

INSERT INTO `product_rating` (`productRatingId`, `userId`, `productId`, `productRating`, `createdAt`, `updatedAt`) VALUES
(7, 2, 1, 4, '2022-01-08 17:25:25', '2022-01-09 09:01:56'),
(8, 3, 1, 5, '2022-01-08 18:03:40', '2022-01-09 13:52:19'),
(9, 6, 3, 4, '2022-01-12 14:32:08', '2022-01-12 15:16:17'),
(10, 6, 12, 5, '2022-01-12 15:03:32', '2022-01-12 15:16:13'),
(11, 6, 1, 5, '2022-01-12 15:16:03', '2022-01-17 16:10:49');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
CREATE TABLE `transaction` (
  `transactionId` int(10) NOT NULL,
  `userId` int(10) NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `paymentMethod` varchar(25) NOT NULL,
  `transactionPoint` int(5) NOT NULL,
  `amountPaid` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`transactionId`, `userId`, `createdAt`, `paymentMethod`, `transactionPoint`, `amountPaid`) VALUES
(5, 6, '2022-01-27', 'Net Banking', 0, 23460000),
(6, 6, '2022-01-27', 'Net Banking', 0, 23460000),
(7, 6, '2022-01-27', 'Net Banking', 0, 11934000),
(8, 6, '2022-01-27', 'Net Banking', 0, 11934000),
(9, 6, '2022-01-27', 'Credit / Debit / ATM Card', 0, 23460000);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userId` int(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phoneNo` varchar(15) NOT NULL,
  `address` varchar(50) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date NOT NULL DEFAULT current_timestamp(),
  `userAvatar` varchar(255) DEFAULT NULL,
  `role` enum('Admin','User') NOT NULL,
  `refresh_token` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userId`, `name`, `email`, `phoneNo`, `address`, `userName`, `password`, `createdAt`, `updatedAt`, `userAvatar`, `role`, `refresh_token`) VALUES
(1, 'Arruhu Nahya', 'Arruhu@mail.com', '08528449919104', 'jl.stasiun, kp.lalang', 'Arruhu0821', '$2b$10$1MKSudulHlTp46CnuwbMgO/XhgCt8GPRaU60uxiGjx9H1VekLJy/G', '2022-01-03', '2022-01-09', 'avatars/Admin.jpg', 'Admin', NULL),
(2, 'Lorem Ipsum', 'lorem@mail.com', '0865659911', 'Hell\'s Road', 'loremCool', '$2b$10$3BTgj01PYkgaW.NPC55WyeKK/Rx/tPLVGllJCBNEh1YETHSoN/ycS', '2022-01-06', '2022-01-09', 'avatars/Avatar-loremCool.png', 'User', NULL),
(3, 'Eric Martin', 'eric@mail.com', '9734100101', 'Unknown', 'ericm', '$2b$10$nSOMj/KcK.vu76DBmqfyNunXRRfal.LdyRtZ3CM6xyUzc2NIWWhd2', '2022-01-08', '2022-01-09', 'avatars/ericm-Mr-Big_1440-e1497560284421-1.jpg', 'User', NULL),
(4, 'Alvin Christ', 'alvinardiansyah2002@gmail.com', '08991720400', 'Test', 'alvinchrist', '$2b$10$Kcd45bzp4sEpDWD5ElXpB.9z/0PFQwp0e9nHn/Oj2D3bDOt625MZ2', '2022-01-09', '2022-01-11', '', 'Admin', NULL),
(5, 'Admin', 'admin@gmail.com', '0000', '-', 'admin', '$2b$10$2s6g4TE5SV/npWUu4tmDXu5jLTkHg5y3PwxvsjjuS5LkObyqsTc5e', '2022-01-11', '2022-01-27', 'avatars/admin-802043_man_512x512.png', 'Admin', NULL),
(6, 'User', 'user@gmail.com', '08991720400', 'Jl. Thamrin no 3c, Medan, Sumatera Utara', 'user', '$2b$10$2s6g4TE5SV/npWUu4tmDXu5jLTkHg5y3PwxvsjjuS5LkObyqsTc5e', '2022-01-11', '2022-01-27', 'avatars/user-802043_man_512x512.png', 'User', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsIm5hbWUiOiJVc2VyIiwiZW1haWwiOiJ1c2VyQGdtYWlsLmNvbSIsInBob25lTm8iOiIwODk5MTcyMDQwMCIsImFkZHJlc3MiOiJKbC4gVGhhbXJpbiBubyAzYywgTWVkYW4sIFN1bWF0ZXJhIFV0YXJhIiwidXNlck5hbWUiOiJ1c2VyIiwidXNlckF2YXRhciI6ImF2YXRhcnMvdXNlci04MDIwNDNfbWFuXzUxMng1MTIucG5nIiwicm9sZSI6IlVzZXIiLCJjcmVhdGVkQXQiOiIyMDIyLTAxLTExIiwidXBkYXRlZEF0IjoiMjAyMi0wMS0yNyIsImlhdCI6MTY0MzMwMjM2NSwiZXhwIjoxNjQzMzg4NzY1fQ.efQ-0K8O80m4loNq4tq_GlvofCgeioBaY6b3rSbSO7c'),
(7, 'Alvin', 'alvin@test.com', '0899', 'a', 'alvin', '$2b$10$2s6g4TE5SV/npWUu4tmDXu5jLTkHg5y3PwxvsjjuS5LkObyqsTc5e', '2022-01-17', '2022-01-17', 'avatars/unknown.png', 'User', NULL),
(8, 'Dharma Aditya', 'test@gmail.com', '08991720', 'Jalan Kertas', 'DharmaAditya', '$2b$10$GM1GeNOTLYCtfF5qj301b.umrb.uGlDDUatdwdAXF9gzw6h.Hl7y.', '2022-01-18', '2022-01-18', 'avatars/unknown.png', 'User', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
CREATE TABLE `wishlist` (
  `userId` int(10) NOT NULL,
  `productId` int(10) NOT NULL,
  `productQty` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `wishlist`
--

INSERT INTO `wishlist` (`userId`, `productId`, `productQty`, `createdAt`, `updatedAt`) VALUES
(2, 1, 5, '2022-01-09 06:39:21', '2022-01-09 06:39:39'),
(6, 1, 0, '2022-01-27 16:53:00', '2022-01-27 16:53:00'),
(6, 3, 0, '2022-01-27 16:53:00', '2022-01-27 16:53:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD KEY `userId` (`userId`),
  ADD KEY `productId` (`productId`),
  ADD KEY `transactionId` (`transactionId`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`productId`),
  ADD KEY `discountId` (`discountId`);

--
-- Indexes for table `product_comment`
--
ALTER TABLE `product_comment`
  ADD PRIMARY KEY (`commentId`),
  ADD KEY `userId` (`userId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `product_discount`
--
ALTER TABLE `product_discount`
  ADD PRIMARY KEY (`discountId`);

--
-- Indexes for table `product_gallery`
--
ALTER TABLE `product_gallery`
  ADD PRIMARY KEY (`imageId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `product_rating`
--
ALTER TABLE `product_rating`
  ADD PRIMARY KEY (`productRatingId`),
  ADD KEY `userId` (`userId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`transactionId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD KEY `userId` (`userId`),
  ADD KEY `productId` (`productId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `productId` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `product_comment`
--
ALTER TABLE `product_comment`
  MODIFY `commentId` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT for table `product_discount`
--
ALTER TABLE `product_discount`
  MODIFY `discountId` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `product_gallery`
--
ALTER TABLE `product_gallery`
  MODIFY `imageId` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `product_rating`
--
ALTER TABLE `product_rating`
  MODIFY `productRatingId` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `transactionId` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userId` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_ibfk_3` FOREIGN KEY (`transactionId`) REFERENCES `transaction` (`transactionId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`discountId`) REFERENCES `product_discount` (`discountId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `product_comment`
--
ALTER TABLE `product_comment`
  ADD CONSTRAINT `product_comment_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_comment_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_gallery`
--
ALTER TABLE `product_gallery`
  ADD CONSTRAINT `product_gallery_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_rating`
--
ALTER TABLE `product_rating`
  ADD CONSTRAINT `product_rating_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_rating_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
