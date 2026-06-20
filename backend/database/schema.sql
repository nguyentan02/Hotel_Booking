-- =============================================
-- Database Schema: Hotel Booking Management System
-- Hệ thống Quản lý Đặt phòng Khách sạn
-- SQL Server
-- =============================================

IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'hotel_booking')
  CREATE DATABASE hotel_booking;
GO

USE hotel_booking;
GO

-- Bảng người dùng
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'users')
CREATE TABLE users (
  id INT IDENTITY(1,1) PRIMARY KEY,
  name NVARCHAR(100) NOT NULL,
  email NVARCHAR(100) NOT NULL UNIQUE,
  password NVARCHAR(255) NOT NULL,
  phone NVARCHAR(20),
  role NVARCHAR(20) DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  is_active BIT DEFAULT 1 NOT NULL,
  avatar_url NVARCHAR(500),
  created_at DATETIME2 DEFAULT GETDATE(),
  updated_at DATETIME2 DEFAULT GETDATE()
);
GO

-- Trigger cập nhật updated_at cho users
CREATE OR ALTER TRIGGER trg_users_updated_at ON users
AFTER UPDATE AS
BEGIN
  SET NOCOUNT ON;
  UPDATE users SET updated_at = GETDATE()
  FROM users INNER JOIN inserted ON users.id = inserted.id;
END;
GO

-- Bảng khách sạn
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'hotels')
CREATE TABLE hotels (
  id INT IDENTITY(1,1) PRIMARY KEY,
  name NVARCHAR(200) NOT NULL,
  description NVARCHAR(MAX),
  address NVARCHAR(500) NOT NULL,
  city NVARCHAR(100) NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  rating DECIMAL(2, 1) DEFAULT 0,
  star_rating INT DEFAULT 3,
  image_url NVARCHAR(500),
  phone NVARCHAR(20),
  email NVARCHAR(100),
  is_featured BIT DEFAULT 0,
  created_at DATETIME2 DEFAULT GETDATE(),
  updated_at DATETIME2 DEFAULT GETDATE()
);
GO

CREATE OR ALTER TRIGGER trg_hotels_updated_at ON hotels
AFTER UPDATE AS
BEGIN
  SET NOCOUNT ON;
  UPDATE hotels SET updated_at = GETDATE()
  FROM hotels INNER JOIN inserted ON hotels.id = inserted.id;
END;
GO

-- Bảng hình ảnh khách sạn
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'hotel_images')
CREATE TABLE hotel_images (
  id INT IDENTITY(1,1) PRIMARY KEY,
  hotel_id INT NOT NULL,
  image_url NVARCHAR(500) NOT NULL,
  caption NVARCHAR(200),
  FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
);
GO

-- Bảng tiện ích
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'amenities')
CREATE TABLE amenities (
  id INT IDENTITY(1,1) PRIMARY KEY,
  name NVARCHAR(100) NOT NULL,
  icon NVARCHAR(50)
);
GO

-- Bảng tiện ích khách sạn (many-to-many)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'hotel_amenities')
CREATE TABLE hotel_amenities (
  hotel_id INT NOT NULL,
  amenity_id INT NOT NULL,
  PRIMARY KEY (hotel_id, amenity_id),
  FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
  FOREIGN KEY (amenity_id) REFERENCES amenities(id) ON DELETE CASCADE
);
GO

-- Bảng phòng (mỗi record = 1 loại phòng tại khách sạn)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'rooms')
CREATE TABLE rooms (
  id INT IDENTITY(1,1) PRIMARY KEY,
  hotel_id INT NOT NULL,
  name NVARCHAR(100) NOT NULL,
  description NVARCHAR(MAX),
  price DECIMAL(12, 2) NOT NULL,
  capacity INT NOT NULL DEFAULT 2,
  total_rooms INT NOT NULL DEFAULT 1,
  image_url NVARCHAR(500),
  status NVARCHAR(20) DEFAULT 'available' CHECK (status IN ('available', 'unavailable')),
  created_at DATETIME2 DEFAULT GETDATE(),
  updated_at DATETIME2 DEFAULT GETDATE(),
  FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
);
GO

CREATE OR ALTER TRIGGER trg_rooms_updated_at ON rooms
AFTER UPDATE AS
BEGIN
  SET NOCOUNT ON;
  UPDATE rooms SET updated_at = GETDATE()
  FROM rooms INNER JOIN inserted ON rooms.id = inserted.id;
END;
GO

-- Bảng đặt phòng
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'bookings')
CREATE TABLE bookings (
  id INT IDENTITY(1,1) PRIMARY KEY,
  user_id INT,
  room_id INT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  num_rooms INT NOT NULL DEFAULT 1,
  total_price DECIMAL(12, 2) NOT NULL,
  status NVARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  guest_name NVARCHAR(100) NOT NULL,
  guest_email NVARCHAR(100) NOT NULL,
  guest_phone NVARCHAR(20),
  payment_method NVARCHAR(20) DEFAULT 'credit_card' CHECK (payment_method IN ('credit_card', 'bank_transfer', 'cash')),
  payment_status NVARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  special_requests NVARCHAR(MAX),
  created_at DATETIME2 DEFAULT GETDATE(),
  updated_at DATETIME2 DEFAULT GETDATE(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);
GO

CREATE OR ALTER TRIGGER trg_bookings_updated_at ON bookings
AFTER UPDATE AS
BEGIN
  SET NOCOUNT ON;
  UPDATE bookings SET updated_at = GETDATE()
  FROM bookings INNER JOIN inserted ON bookings.id = inserted.id;
END;
GO

-- Bảng đánh giá
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'reviews')
CREATE TABLE reviews (
  id INT IDENTITY(1,1) PRIMARY KEY,
  user_id INT NOT NULL,
  hotel_id INT NOT NULL,
  rating INT NOT NULL,
  comment NVARCHAR(MAX),
  created_at DATETIME2 DEFAULT GETDATE(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (hotel_id) REFERENCES hotels(id),
  CONSTRAINT chk_rating CHECK (rating >= 1 AND rating <= 5)
);
GO

-- Index
CREATE INDEX idx_hotels_city ON hotels(city);
CREATE INDEX idx_rooms_hotel ON rooms(hotel_id);
CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_bookings_room ON bookings(room_id);
CREATE INDEX idx_bookings_dates ON bookings(check_in, check_out);
CREATE INDEX idx_reviews_hotel ON reviews(hotel_id);
GO
