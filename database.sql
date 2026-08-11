-- ============================================================
-- BIKE BAZAAR PATNA - MYSQL DATABASE SCHEMA & INITIAL DATA
-- Database Name: bike_bazaar_db
-- Host: localhost (or your web hosting MySQL host)
-- PHP Compatibility: PHP 7.4+ / PHP 8.x
-- ============================================================

CREATE DATABASE IF NOT EXISTS `bike_bazaar_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `bike_bazaar_db`;

-- --------------------------------------------------------
-- 1. Table Structure for Admin Users (Owner Control)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(100) DEFAULT 'Rajkumar (Owner)',
  `phone` VARCHAR(15) DEFAULT '7480078779',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert default Admin Owner (Email: rajkumar87036@gmail.com | Password: admin123)
INSERT INTO `admin_users` (`id`, `email`, `password_hash`, `full_name`, `phone`) 
VALUES (1, 'rajkumar87036@gmail.com', 'admin123', 'Rajkumar (Owner)', '7480078779')
ON DUPLICATE KEY UPDATE `email` = `email`;

-- --------------------------------------------------------
-- 2. Table Structure for Bike Inventory Catalog
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `bikes` (
  `id` VARCHAR(50) PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `brand` VARCHAR(50) NOT NULL,
  `model` VARCHAR(100) NOT NULL,
  `year` INT NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  `originalPrice` DECIMAL(10, 2) DEFAULT NULL,
  `km` INT NOT NULL,
  `owner` VARCHAR(50) NOT NULL,
  `fuelType` VARCHAR(50) DEFAULT 'Petrol',
  `cc` VARCHAR(20) DEFAULT '350',
  `score` INT DEFAULT 96,
  `location` VARCHAR(100) DEFAULT 'Patna, Bihar',
  `isFeatured` TINYINT(1) DEFAULT 1,
  `status` VARCHAR(50) DEFAULT 'Available',
  `images` TEXT NOT NULL, -- Stored as JSON string array
  `badges` TEXT NOT NULL, -- Stored as JSON string array
  `specs` TEXT NOT NULL,  -- Stored as JSON string object
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert Default Catalog Data (Including Raj KTM at Top Position #1)
INSERT INTO `bikes` (`id`, `name`, `brand`, `model`, `year`, `price`, `originalPrice`, `km`, `owner`, `fuelType`, `cc`, `score`, `location`, `isFeatured`, `status`, `images`, `badges`, `specs`) VALUES
('bike-ktm-raj', 'Raj KTM Duke 390 Special Edition', 'KTM', 'Duke 390', 2024, 400000.00, 450000.00, 8000, '1st Owner', 'Petrol', '373', 99, 'Patna, Bihar', 1, 'Available', 
'["https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80","https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80"]', 
'["Top Pick", "Verified 1st Owner", "6 M Warranty"]', 
'{"mileage":"30 kmpl","fuelType":"Petrol","brakes":"Dual Channel ABS","transmission":"6-Speed Manual","rto":"BR-01 Patna","insurance":"Valid till 2029"}'),

('bike-1', 'Royal Enfield Classic 350 Dark Stealth', 'Royal Enfield', 'Classic 350', 2022, 148000.00, 165000.00, 14500, '1st Owner', 'Petrol', '349', 96, 'Patna, Bihar', 1, 'Available', 
'["https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80"]', 
'["Certified", "6 M Warranty", "Paperwork Ready"]', 
'{"mileage":"38 kmpl","fuelType":"Petrol","brakes":"Dual ABS","transmission":"5-Speed","rto":"BR-01 Patna","insurance":"Valid 2027"}'),

('bike-2', 'Honda Activa 6G Premium Metallic', 'Honda', 'Activa 6G', 2023, 62000.00, 72000.00, 8200, '1st Owner', 'Petrol', '110', 98, 'Patna, Bihar', 1, 'Available', 
'["https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80"]', 
'["Best Seller", "Lady Driven", "Low KM"]', 
'{"mileage":"50 kmpl","fuelType":"Petrol","brakes":"CBS","transmission":"Automatic","rto":"BR-01 Patna","insurance":"Valid 2028"}')
ON DUPLICATE KEY UPDATE `name` = `name`;

-- --------------------------------------------------------
-- 3. Table Structure for Test Drive Bookings
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `test_drives` (
  `id` VARCHAR(50) PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `bikeName` VARCHAR(150) NOT NULL,
  `date` VARCHAR(50) NOT NULL,
  `time` VARCHAR(50) NOT NULL,
  `status` VARCHAR(50) DEFAULT 'Pending',
  `submittedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert Sample Test Drive
INSERT INTO `test_drives` (`id`, `name`, `phone`, `bikeName`, `date`, `time`, `status`) VALUES
('td-101', 'Rohan Sharma', '9876543210', 'Royal Enfield Classic 350', '2026-08-12', '11:00 AM', 'Pending'),
('td-102', 'Vikram Singh', '7480078779', 'Honda Activa 6G', '2026-08-13', '03:00 PM', 'Confirmed')
ON DUPLICATE KEY UPDATE `name` = `name`;

-- --------------------------------------------------------
-- 4. Table Structure for Sell & Resale Valuation Leads
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `sell_leads` (
  `id` VARCHAR(50) PRIMARY KEY,
  `sellerName` VARCHAR(100) NOT NULL,
  `sellerPhone` VARCHAR(20) NOT NULL,
  `brand` VARCHAR(50) NOT NULL,
  `modelName` VARCHAR(100) NOT NULL,
  `year` INT NOT NULL,
  `km` INT NOT NULL,
  `owner` VARCHAR(50) NOT NULL,
  `estimatedPrice` VARCHAR(100) NOT NULL,
  `status` VARCHAR(50) DEFAULT 'New Lead',
  `submittedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert Sample Sell Lead
INSERT INTO `sell_leads` (`id`, `sellerName`, `sellerPhone`, `brand`, `modelName`, `year`, `km`, `owner`, `estimatedPrice`, `status`) VALUES
('sell-201', 'Amit Verma', '9123456789', 'TVS', 'Apache RTR 160', 2021, 18000, '1st Owner', '₹75,000 - ₹82,000', 'New Lead')
ON DUPLICATE KEY UPDATE `sellerName` = `sellerName`;

-- --------------------------------------------------------
-- 5. Table Structure for Customer Contact Messages & Support
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `contact_inquiries` (
  `id` VARCHAR(50) PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `subject` VARCHAR(150) NOT NULL,
  `message` TEXT NOT NULL,
  `status` VARCHAR(50) DEFAULT 'New Inquiry',
  `submittedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert Sample Contact Inquiry
INSERT INTO `contact_inquiries` (`id`, `name`, `phone`, `subject`, `message`, `status`) VALUES
('msg-301', 'Manish Kumar', '9876543210', 'KTM Superbike Inquiry', 'Hi, I want to visit Patna showroom to inspect Raj KTM.', 'New Inquiry')
ON DUPLICATE KEY UPDATE `name` = `name`;
