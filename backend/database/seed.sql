-- =============================================
-- Seed Data: Hotel Booking Management System
-- =============================================

USE hotel_booking;

-- Admin account (password: admin123)
INSERT INTO users (name, email, password, phone, role) VALUES
('Admin', 'admin@hotel.com', '$2a$10$r.qiUiIbQL0.JG94bMG9OezBzBF4SAhFx6UBCfxFTNrfrdnb3RbkK', '0901234567', 'admin');

-- Customer accounts (password: 123456)
INSERT INTO users (name, email, password, phone, role) VALUES
(N'Nguyễn Văn An', 'an@gmail.com', '$2a$10$BByN3BzN2/fs0Bl8Zh6asOQwxMcIM.i96G0tabOGh3qBKOU3E0dey', '0912345678', 'customer'),
(N'Trần Thị Bình', 'binh@gmail.com', '$2a$10$BByN3BzN2/fs0Bl8Zh6asOQwxMcIM.i96G0tabOGh3qBKOU3E0dey', '0923456789', 'customer'),
(N'Lê Minh Châu', 'chau@gmail.com', '$2a$10$BByN3BzN2/fs0Bl8Zh6asOQwxMcIM.i96G0tabOGh3qBKOU3E0dey', '0934567890', 'customer');

-- Tiện ích
INSERT INTO amenities (name, icon) VALUES
(N'WiFi miễn phí', 'FaWifi'),
(N'Hồ bơi', 'FaSwimmingPool'),
(N'Bãi đỗ xe', 'FaParking'),
(N'Nhà hàng', 'FaUtensils'),
(N'Phòng gym', 'FaDumbbell'),
(N'Spa', 'FaSpa'),
(N'Dịch vụ phòng 24/7', 'FaConciergebell'),
(N'Điều hòa', 'FaSnowflake'),
(N'Bar', 'FaGlassMartini'),
(N'Trung tâm hội nghị', 'FaBriefcase'),
(N'Giặt ủi', 'FaTshirt'),
(N'Đưa đón sân bay', 'FaPlane');

-- Khách sạn
INSERT INTO hotels (name, description, address, city, latitude, longitude, rating, star_rating, image_url, phone, email, is_featured) VALUES
(N'Mường Thanh Grand Hà Nội', N'Khách sạn 5 sao nằm tại trung tâm thủ đô Hà Nội, gần Hồ Hoàn Kiếm. Thiết kế sang trọng, hiện đại với đầy đủ tiện nghi cao cấp. Phù hợp cho cả du lịch và công tác.', N'Số 7 Thiền Quang, Hai Bà Trưng', N'Hà Nội', 21.0178, 105.8480, 4.5, 5, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', '024-3822-3456', 'hanoi@muongthanh.com', 1),

(N'Vinpearl Luxury Nha Trang', N'Resort nghỉ dưỡng hạng sang bên bờ biển Nha Trang. View biển tuyệt đẹp, bãi biển riêng, hồ bơi vô cực. Trải nghiệm nghỉ dưỡng đẳng cấp quốc tế.', N'Đảo Hòn Tre, Vĩnh Nguyên', N'Nha Trang', 12.2050, 109.2300, 4.8, 5, 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800', '0258-359-8888', 'nhatrang@vinpearl.com', 1),

(N'Rex Hotel Saigon', N'Khách sạn lịch sử hạng sang tại trung tâm TP.HCM. Kiến trúc cổ điển pha hiện đại, rooftop bar nổi tiếng nhìn ra Nhà hát Thành phố.', N'141 Nguyễn Huệ, Quận 1', N'TP. Hồ Chí Minh', 10.7731, 106.7030, 4.3, 5, 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', '028-3829-2185', 'info@rexhotelvietnam.com', 1),

(N'Novotel Đà Nẵng', N'Khách sạn quốc tế 4 sao nằm ngay bãi biển Mỹ Khê. Phòng rộng rãi, view biển tuyệt đẹp. Gần cầu Rồng và các điểm du lịch nổi tiếng.', N'36 Bạch Đằng, Hải Châu', N'Đà Nẵng', 16.0680, 108.2240, 4.2, 4, 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', '0236-392-9999', 'danang@novotel.com', 1),

(N'Pilgrimage Village Huế', N'Resort nghỉ dưỡng phong cách làng quê Việt Nam giữa vùng đồi thông xanh mát. Không gian yên tĩnh, thân thiện môi trường.', N'130 Minh Mạng', N'Huế', 16.4637, 107.5909, 4.4, 4, 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800', '0234-388-5461', 'info@pilgrimagevillage.com', 0),

(N'Mia Resort Phú Quốc', N'Resort xinh đẹp ven biển Bãi Ông Lang. Bungalow riêng biệt, hồ bơi riêng, nhà hàng hải sản tươi sống. Nơi nghỉ dưỡng lý tưởng.', N'Bãi Ông Lang', N'Phú Quốc', 10.3290, 103.8520, 4.6, 4, 'https://images.unsplash.com/photo-1573052905904-34ad8c27f0cc?w=800', '0297-399-8888', 'info@miaresort.com', 1),

(N'Sapa Legend Hotel', N'Khách sạn 3 sao giữa lòng thị trấn Sapa. View thung lũng Mường Hoa tuyệt đẹp. Phù hợp du lịch khám phá vùng Tây Bắc.', N'24 Đường Mường Hoa', N'Sapa', 22.3363, 103.8438, 3.9, 3, 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800', '0214-387-1869', 'info@sapalegend.com', 0),

(N'Hội An Riverside Resort', N'Resort yên bình bên sông Thu Bồn. Kiến trúc truyền thống Hội An, vườn nhiệt đới xanh mát. Cách phố cổ chỉ 10 phút đi bộ.', N'175 Cửa Đại', N'Hội An', 15.8801, 108.3380, 4.1, 4, 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800', '0235-386-4800', 'info@hoianriverside.com', 0);

-- Gán tiện ích cho khách sạn
-- Mường Thanh Grand Hà Nội
INSERT INTO hotel_amenities (hotel_id, amenity_id) VALUES (1,1),(1,3),(1,4),(1,5),(1,7),(1,8),(1,10),(1,11);
-- Vinpearl Luxury Nha Trang
INSERT INTO hotel_amenities (hotel_id, amenity_id) VALUES (2,1),(2,2),(2,3),(2,4),(2,5),(2,6),(2,7),(2,8),(2,9),(2,12);
-- Rex Hotel Saigon
INSERT INTO hotel_amenities (hotel_id, amenity_id) VALUES (3,1),(3,3),(3,4),(3,5),(3,7),(3,8),(3,9),(3,10);
-- Novotel Đà Nẵng
INSERT INTO hotel_amenities (hotel_id, amenity_id) VALUES (4,1),(4,2),(4,3),(4,4),(4,5),(4,7),(4,8);
-- Pilgrimage Village Huế
INSERT INTO hotel_amenities (hotel_id, amenity_id) VALUES (5,1),(5,2),(5,4),(5,6),(5,8),(5,11);
-- Mia Resort Phú Quốc
INSERT INTO hotel_amenities (hotel_id, amenity_id) VALUES (6,1),(6,2),(6,4),(6,6),(6,7),(6,8),(6,12);
-- Sapa Legend
INSERT INTO hotel_amenities (hotel_id, amenity_id) VALUES (7,1),(7,4),(7,8),(7,11);
-- Hội An Riverside
INSERT INTO hotel_amenities (hotel_id, amenity_id) VALUES (8,1),(8,2),(8,4),(8,6),(8,8),(8,11);

-- Hình ảnh khách sạn
INSERT INTO hotel_images (hotel_id, image_url, caption) VALUES
(1, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', N'Mặt tiền khách sạn'),
(1, 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', N'Phòng Deluxe'),
(1, 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800', N'Sảnh chính'),
(2, 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800', N'Toàn cảnh resort'),
(2, 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', N'Bãi biển riêng'),
(2, 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800', N'Hồ bơi vô cực'),
(3, 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', N'Mặt tiền Rex Hotel'),
(3, 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800', N'Rooftop Bar'),
(4, 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', N'View biển Mỹ Khê'),
(4, 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', N'Phòng Superior'),
(5, 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800', N'Không gian xanh'),
(6, 'https://images.unsplash.com/photo-1573052905904-34ad8c27f0cc?w=800', N'Bungalow bên biển'),
(7, 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800', N'View thung lũng'),
(8, 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800', N'Bên sông Thu Bồn');

-- Phòng khách sạn
-- Mường Thanh Grand Hà Nội
INSERT INTO rooms (hotel_id, name, description, price, capacity, total_rooms, image_url) VALUES
(1, N'Phòng Standard', N'Phòng tiêu chuẩn đầy đủ tiện nghi cơ bản, giường đôi lớn.', 800000, 2, 20, 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600'),
(1, N'Phòng Deluxe', N'Phòng sang trọng view thành phố, minibar, bồn tắm lớn.', 1500000, 2, 15, 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600'),
(1, N'Phòng Suite', N'Suite cao cấp với phòng khách riêng, view Hồ Hoàn Kiếm.', 3000000, 3, 5, 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600'),
(1, N'Phòng Family', N'Phòng gia đình rộng rãi, 2 giường đôi, bàn làm việc.', 2000000, 4, 10, 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600');

-- Vinpearl Luxury Nha Trang
INSERT INTO rooms (hotel_id, name, description, price, capacity, total_rooms, image_url) VALUES
(2, N'Deluxe Ocean View', N'Phòng view biển trực diện, ban công riêng, nội thất gỗ tự nhiên.', 3500000, 2, 30, 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=600'),
(2, N'Premium Suite', N'Suite hạng sang với phòng khách rộng, jacuzzi, view panorama biển.', 6000000, 2, 10, 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600'),
(2, N'Villa Pool', N'Biệt thự riêng với hồ bơi, 2 phòng ngủ, vườn nhiệt đới.', 12000000, 4, 5, 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600'),
(2, N'Beach Bungalow', N'Bungalow sát bãi biển riêng, sân hiên rộng, hammock.', 4500000, 2, 8, 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600');

-- Rex Hotel Saigon
INSERT INTO rooms (hotel_id, name, description, price, capacity, total_rooms, image_url) VALUES
(3, N'Classic Room', N'Phòng phong cách cổ điển, tiện nghi hiện đại, giường king.', 2000000, 2, 25, 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600'),
(3, N'Premium Room', N'Phòng cao cấp view Nguyễn Huệ, minibar, phòng tắm đá cẩm thạch.', 3500000, 2, 15, 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600'),
(3, N'Royal Suite', N'Suite hoàng gia rộng 80m², phòng khách sang trọng, butler riêng.', 8000000, 3, 3, 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600');

-- Novotel Đà Nẵng
INSERT INTO rooms (hotel_id, name, description, price, capacity, total_rooms, image_url) VALUES
(4, N'Superior Room', N'Phòng tiêu chuẩn view thành phố, ban công nhỏ.', 1200000, 2, 30, 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600'),
(4, N'Deluxe Sea View', N'Phòng view biển Mỹ Khê, nội thất hiện đại.', 2000000, 2, 20, 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=600'),
(4, N'Executive Suite', N'Suite rộng rãi, phòng khách riêng, view biển panorama.', 3500000, 3, 8, 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600');

-- Pilgrimage Village Huế
INSERT INTO rooms (hotel_id, name, description, price, capacity, total_rooms, image_url) VALUES
(5, N'Garden Room', N'Phòng view vườn, thiết kế mộc mạc ấm cúng.', 900000, 2, 20, 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600'),
(5, N'Pool Villa', N'Villa có hồ bơi riêng, sân vườn rộng.', 3000000, 2, 6, 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600'),
(5, N'Honeymoon Suite', N'Suite trăng mật lãng mạn, bồn tắm ngoài trời.', 2500000, 2, 4, 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600');

-- Mia Resort Phú Quốc
INSERT INTO rooms (hotel_id, name, description, price, capacity, total_rooms, image_url) VALUES
(6, N'Garden View Room', N'Phòng view vườn nhiệt đới, gần hồ bơi chung.', 1800000, 2, 15, 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600'),
(6, N'Beach Front Room', N'Phòng mặt biển, ban công rộng nhìn hoàng hôn.', 3200000, 2, 10, 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=600'),
(6, N'Pool Villa', N'Biệt thự hồ bơi riêng, 1 phòng ngủ, phong cách Indochine.', 5500000, 2, 5, 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600');

-- Sapa Legend
INSERT INTO rooms (hotel_id, name, description, price, capacity, total_rooms, image_url) VALUES
(7, N'Standard Room', N'Phòng tiêu chuẩn ấm cúng, view núi.', 500000, 2, 20, 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600'),
(7, N'Superior Room', N'Phòng rộng hơn, ban công view thung lũng Mường Hoa.', 800000, 2, 10, 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600'),
(7, N'Family Room', N'Phòng gia đình 2 giường, sưởi ấm, view đẹp.', 1000000, 4, 8, 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600');

-- Hội An Riverside
INSERT INTO rooms (hotel_id, name, description, price, capacity, total_rooms, image_url) VALUES
(8, N'River View Room', N'Phòng view sông Thu Bồn, ban công rộng.', 1200000, 2, 15, 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=600'),
(8, N'Garden Bungalow', N'Bungalow giữa vườn nhiệt đới, sân riêng.', 1800000, 2, 10, 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600'),
(8, N'Pool Access Room', N'Phòng kết nối hồ bơi, bước ra là bơi ngay.', 2200000, 2, 6, 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600');

-- Đặt phòng mẫu
INSERT INTO bookings (user_id, room_id, check_in, check_out, num_rooms, total_price, status, guest_name, guest_email, guest_phone, payment_method, payment_status) VALUES
(2, 1, '2025-04-01', '2025-04-03', 1, 1600000, 'confirmed', N'Nguyễn Văn An', 'an@gmail.com', '0912345678', 'credit_card', 'paid'),
(2, 5, '2025-04-10', '2025-04-14', 1, 14000000, 'confirmed', N'Nguyễn Văn An', 'an@gmail.com', '0912345678', 'bank_transfer', 'paid'),
(3, 9, '2025-04-05', '2025-04-07', 1, 4000000, 'pending', N'Trần Thị Bình', 'binh@gmail.com', '0923456789', 'credit_card', 'pending'),
(4, 14, '2025-04-15', '2025-04-18', 1, 6000000, 'confirmed', N'Lê Minh Châu', 'chau@gmail.com', '0934567890', 'cash', 'paid'),
(3, 20, '2025-03-20', '2025-03-22', 1, 1000000, 'completed', N'Trần Thị Bình', 'binh@gmail.com', '0923456789', 'credit_card', 'paid'),
(2, 2, '2025-05-01', '2025-05-05', 1, 6000000, 'pending', N'Nguyễn Văn An', 'an@gmail.com', '0912345678', 'bank_transfer', 'pending');

-- Đánh giá mẫu
INSERT INTO reviews (user_id, hotel_id, rating, comment) VALUES
(2, 1, 5, N'Khách sạn tuyệt vời! Vị trí đẹp, dịch vụ chu đáo, phòng sạch sẽ.'),
(3, 1, 4, N'Phòng đẹp, nhân viên thân thiện. Ăn sáng hơi ít lựa chọn.'),
(2, 2, 5, N'Resort đẳng cấp! Biển đẹp, hồ bơi tuyệt vời, nhất định sẽ quay lại.'),
(4, 3, 4, N'Khách sạn có lịch sử lâu đời, vị trí trung tâm rất tiện. Rooftop bar rất đẹp.'),
(3, 4, 4, N'Bãi biển Mỹ Khê quá đẹp! Phòng sạch sẽ, view rất đẹp.'),
(4, 6, 5, N'Phú Quốc thật tuyệt, resort xinh xắn, bãi biển hoàng hôn đẹp mê.'),
(2, 7, 3, N'Vị trí tốt nhưng phòng hơi nhỏ. View đẹp bù lại tất cả.'),
(3, 8, 4, N'Không gian yên tĩnh bên sông, gần phố cổ. Rất phù hợp nghỉ dưỡng.');


---------------------------------------------------------------------------------------------

-- =============================================
-- Bổ sung thêm dữ liệu Phòng khách sạn (Rooms)
-- =============================================

-- 1. Mường Thanh Grand Hà Nội
INSERT INTO rooms (hotel_id, name, description, price, capacity, total_rooms, image_url) VALUES
(1, N'Phòng Executive', N'Phòng tầng cao, view toàn cảnh thủ đô, miễn phí sử dụng Executive Lounge.', 2500000, 2, 10, 'https://images.unsplash.com/photo-1598928506311-c55dd1b31bb1?w=600'),
(1, N'Presidential Suite', N'Phòng tổng thống siêu sang trọng, diện tích 120m2, có phòng họp và vệ sĩ riêng.', 15000000, 4, 1, 'https://images.unsplash.com/photo-1631049035182-249067d7618e?w=600'),
(1, N'Connecting Room', N'Hai phòng tiêu chuẩn thông nhau, phù hợp cho gia đình có trẻ nhỏ cần không gian gần gũi.', 1800000, 4, 5, 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600');

-- 2. Vinpearl Luxury Nha Trang
INSERT INTO rooms (hotel_id, name, description, price, capacity, total_rooms, image_url) VALUES
(2, N'Ocean Front Villa 3 Bedrooms', N'Biệt thự 3 phòng ngủ sát biển, hồ bơi vô cực lớn, BBQ ngoài trời.', 25000000, 6, 3, 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600'),
(2, N'Family Suite Ocean View', N'Suite gia đình 2 phòng ngủ, ban công kính ngắm hoàng hôn vịnh Nha Trang.', 8500000, 4, 8, 'https://images.unsplash.com/photo-1586611292717-f828b167408c?w=600'),
(2, N'Grand Deluxe Garden', N'Phòng lớn view vườn nhiệt đới xanh mát, thiết kế mở giao hòa với thiên nhiên.', 3000000, 2, 20, 'https://images.unsplash.com/photo-1535827841776-24afc1e255ac?w=600');

-- 3. Rex Hotel Saigon
INSERT INTO rooms (hotel_id, name, description, price, capacity, total_rooms, image_url) VALUES
(3, N'Governor Suite', N'Suite đặc biệt mang đậm dấu ấn lịch sử Sài Gòn, nội thất gỗ quý, ban công lớn.', 12000000, 2, 2, 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600'),
(3, N'Executive Double', N'Phòng đôi cao cấp, giường King size, khu vực làm việc chuyên biệt cho doanh nhân.', 4000000, 2, 12, 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600'),
(3, N'Family Classic Room', N'Phòng gia đình phong cách Đông Dương cổ điển, 1 giường đôi và 1 giường đơn.', 3200000, 3, 8, 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600');

-- 4. Novotel Đà Nẵng
INSERT INTO rooms (hotel_id, name, description, price, capacity, total_rooms, image_url) VALUES
(4, N'Corner Suite Ocean View', N'Suite góc 2 mặt kính view trọn vẹn bãi biển Mỹ Khê và bán đảo Sơn Trà.', 4500000, 2, 5, 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600'),
(4, N'Apartment 2 Bedrooms', N'Căn hộ 2 phòng ngủ tiện nghi như ở nhà, bếp mở, máy giặt, phù hợp ở dài ngày.', 5500000, 4, 10, 'https://images.unsplash.com/photo-1502672260266-1c1de2d93688?w=600'),
(4, N'Standard Twin Room', N'Phòng 2 giường đơn, view thành phố và cầu sông Hàn lãng mạn về đêm.', 1300000, 2, 15, 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600');

-- 5. Pilgrimage Village Huế
INSERT INTO rooms (hotel_id, name, description, price, capacity, total_rooms, image_url) VALUES
(5, N'Traditional Vietnamese Pool House', N'Nhà rường truyền thống Huế có hồ bơi riêng, kiến trúc mộc mạc, đậm chất thơ.', 4500000, 2, 3, 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600'),
(5, N'Family Bungalow', N'Bungalow gia đình rộng rãi, 2 tầng, bao quanh bởi vườn bưởi và hoa.', 2800000, 4, 8, 'https://images.unsplash.com/photo-1542314831-c6a4d14d8c85?w=600'),
(5, N'Lotus Lake View Room', N'Phòng view hướng ra hồ sen tĩnh lặng, thích hợp cho retreat và thiền định.', 1100000, 2, 12, 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=600');

-- 6. Mia Resort Phú Quốc
INSERT INTO rooms (hotel_id, name, description, price, capacity, total_rooms, image_url) VALUES
(6, N'Ocean View Condo', N'Căn hộ trên tầng cao, view ngắm trọn hoàng hôn Phú Quốc, bếp nhỏ gọn.', 4000000, 2, 10, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600'),
(6, N'Spa Villa', N'Villa cao cấp tích hợp phòng xông hơi và massage riêng tư ngay trong phòng.', 7000000, 2, 2, 'https://images.unsplash.com/photo-1544980224-ec53995f57cc?w=600'),
(6, N'Family Garden Suite', N'Suite gia đình nằm giữa vườn nhiệt đới, sân hiên rộng để nướng BBQ.', 4500000, 4, 6, 'https://images.unsplash.com/photo-1587985864506-c85da2ba9db9?w=600');

-- 7. Sapa Legend
INSERT INTO rooms (hotel_id, name, description, price, capacity, total_rooms, image_url) VALUES
(7, N'Executive Valley View', N'Phòng cao cấp ngắm trọn thung lũng sương mù, bồn tắm gỗ sồi ngâm lá thuốc người Dao.', 1500000, 2, 5, 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600'),
(7, N'Dormitory Room', N'Phòng tập thể giường tầng cao cấp, rèm che riêng tư, tủ khóa an toàn cho dân phượt.', 250000, 1, 30, 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600'),
(7, N'Honeymoon Mountain Room', N'Phòng trăng mật decor hoa hồng, cửa sổ kính sát trần ngắm đỉnh Fansipan.', 1800000, 2, 3, 'https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?w=600');

-- 8. Hội An Riverside
INSERT INTO rooms (hotel_id, name, description, price, capacity, total_rooms, image_url) VALUES
(8, N'Heritage Suite', N'Suite phong cách phố cổ, lồng đèn lụa, đồ gỗ chạm khắc thủ công, ban công hướng sông.', 3500000, 2, 4, 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600'),
(8, N'Family River View', N'Phòng gia đình rộng rãi, 2 giường Queen, view toàn cảnh ghe thuyền trên sông Thu Bồn.', 2500000, 4, 8, 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600'),
(8, N'Deluxe Rice Field View', N'Phòng view hướng đồng lúa xanh mướt, không gian cực kỳ yên ả, thanh bình.', 1400000, 2, 12, 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=600');


-- =============================================
-- Bổ sung thêm Khách sạn mới (Hotels)
-- =============================================

SET IDENTITY_INSERT hotels ON;

INSERT INTO hotels (id, name, description, address, city, latitude, longitude, rating, star_rating, image_url, phone, email, is_featured) VALUES
(9, N'Vinpearl Resort & Spa Hạ Long', N'Khu nghỉ dưỡng 5 sao biệt lập hoàn toàn trên Đảo Rêu với tầm nhìn 360 độ ra Vịnh Hạ Long thơ mộng. Kiến trúc bán cổ điển tráng lệ như một tòa lâu đài trên biển.', N'Đảo Rêu, Bãi Cháy', N'Hạ Long', 20.9495, 107.0520, 4.7, 5, 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?w=800', '0203-3556-888', 'halong@vinpearl.com', 1),

(10, N'Dalat Palace Heritage Hotel', N'Khách sạn di sản mang đậm kiến trúc Pháp cổ kính sang trọng tại trung tâm Đà Lạt. Tọa lạc trong khuôn viên vườn hoa rộng lớn nhìn thẳng ra Hồ Xuân Hương.', N'2 Đường Trần Phú, Phường 3', N'Đà Lạt', 11.9370, 108.4420, 4.6, 5, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', '0263-3825-444', 'palace@dalatresorts.com', 1),

(11, N'Fleur de Lys Hospitality Quy Nhơn', N'Khách sạn 4 sao chuẩn quốc tế nằm ngay trên đại lộ ven biển Quy Nhơn. Phòng ốc thiết kế hiện đại, tinh tế với hầu hết các phòng đều có tầm nhìn hướng biển tuyệt đẹp.', N'16 Nguyễn Huệ', N'Quy Nhơn', 13.7712, 109.2343, 4.3, 4, 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', '0256-3666-888', 'info@fleurdelys.com.vn', 0),

(12, N'The Imperial Hotel Vũng Tàu', N'Khách sạn 5 sao duy nhất tại Bãi Sau Vũng Tàu mang phong cách hoàng gia Anh cổ điển. Sở hữu bãi biển riêng sang trọng và hồ bơi vô cực sát biển.', N'159 Thùy Vân, Thắng Tam', N'Vũng Tàu', 10.3392, 107.1025, 4.5, 5, 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', '0254-3628-888', 'info@imperialhotel.vn', 1);

SET IDENTITY_INSERT hotels OFF;


-- =============================================
-- Gán tiện ích cho các khách sạn mới (hotel_amenities)
-- =============================================

-- Vinpearl Resort & Spa Hạ Long (WiFi, Hồ bơi, Bãi đỗ, Nhà hàng, Gym, Spa, Dịch vụ 24/7, Điều hòa, Bar, Đưa đón sân bay)
INSERT INTO hotel_amenities (hotel_id, amenity_id) VALUES (9,1),(9,2),(9,3),(9,4),(9,5),(9,6),(9,7),(9,8),(9,9),(9,12);

-- Dalat Palace Heritage Hotel (WiFi, Bãi đỗ, Nhà hàng, Gym, Spa, Dịch vụ 24/7, Bar, Trung tâm hội nghị, Giặt ủi)
INSERT INTO hotel_amenities (hotel_id, amenity_id) VALUES (10,1),(10,3),(10,4),(10,5),(10,6),(10,7),(10,9),(10,10),(10,11);

-- Fleur de Lys Quy Nhơn (WiFi, Hồ bơi, Bãi đỗ, Nhà hàng, Gym, Điều hòa, Bar, Trung tâm hội nghị)
INSERT INTO hotel_amenities (hotel_id, amenity_id) VALUES (11,1),(11,2),(11,3),(11,4),(11,5),(11,8),(11,9),(11,10);

-- The Imperial Hotel Vũng Tàu (Tất cả tiện ích)
INSERT INTO hotel_amenities (hotel_id, amenity_id) VALUES (12,1),(12,2),(12,3),(12,4),(12,5),(12,6),(12,7),(12,8),(12,9),(12,10),(12,11),(12,12);


-- =============================================
-- Bổ sung Hình ảnh cho khách sạn mới (hotel_images)
-- =============================================

INSERT INTO hotel_images (hotel_id, image_url, caption) VALUES
(9, 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?w=800', N'Toàn cảnh lâu đài Vinpearl Hạ Long'),
(9, 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', N'Phòng Deluxe Hướng Biển'),
(10, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', N'Mặt tiền kiến trúc Pháp cổ Dalat Palace'),
(10, 'https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?w=800', N'Không gian phòng ngủ hoàng gia'),
(11, 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', N'Hồ bơi hướng biển Quy Nhơn'),
(12, 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', N'Bãi biển và Hồ bơi vô cực Imperial'),
(12, 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800', N'Phòng Suite phong cách Hoàng Gia');


-- =============================================
-- Bổ sung dữ liệu Phòng cho khách sạn mới (Rooms)
-- =============================================

-- 9. Vinpearl Resort & Spa Hạ Long
INSERT INTO rooms (hotel_id, name, description, price, capacity, total_rooms, image_url) VALUES
(9, N'Deluxe King Bay View', N'Phòng tiêu chuẩn giường King lớn, ban công rộng hướng trực diện ra kỳ quan Vịnh Hạ Long.', 2800000, 2, 40, 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600'),
(9, N'Deluxe Twin Tower View', N'Phòng 2 giường đơn êm ái, hướng nhìn về phía thành phố và công viên Sun World lung linh.', 2600000, 2, 35, 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600'),
(9, N'Executive Suite Bay View', N'Phòng Suite thượng hạng diện tích lớn, phòng khách biệt lập, quầy bar nhỏ cao cấp.', 5500000, 3, 12, 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600'),
(9, N'Family Suite 2 Bedrooms', N'Căn hộ gia đình 2 phòng ngủ riêng biệt nối liền bằng phòng sinh hoạt chung ấm cúng.', 7500000, 4, 8, 'https://images.unsplash.com/photo-1502672260266-1c1de2d93688?w=600');

-- 10. Dalat Palace Heritage Hotel
INSERT INTO rooms (hotel_id, name, description, price, capacity, total_rooms, image_url) VALUES
(10, N'Superior Room Lake View', N'Phòng tiêu chuẩn cổ điển với sàn gỗ quý, lò sưởi giả, cửa sổ nhìn ra Hồ Xuân Hương.', 2200000, 2, 20, 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600'),
(10, N'Luxury Room Garden View', N'Phòng hạng sang decor nội thất Pháp cổ thế kỷ 20, view vườn hoa hồng lãng mạn.', 3000000, 2, 15, 'https://images.unsplash.com/photo-1598928506311-c55dd1b31bb1?w=600'),
(10, N'Royal Suite Presidential', N'Căn Suite hoàng gia từng đón tiếp nhiều nguyên thủ quốc gia, có phòng ăn riêng sang trọng.', 14000000, 4, 2, 'https://images.unsplash.com/photo-1631049035182-249067d7618e?w=600');

-- 11. Fleur de Lys Hospitality Quy Nhơn
INSERT INTO rooms (hotel_id, name, description, price, capacity, total_rooms, image_url) VALUES
(11, N'Deluxe Ocean View', N'Phòng rộng rãi phong cách hiện đại tối giản với hệ thống kính tràn viền ngắm biển Quy Nhơn.', 1600000, 2, 45, 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=600'),
(11, N'Executive Suite Marine', N'Phòng Suite tầng cao nhất của khách sạn, bồn tắm nằm sát kính nhìn thẳng ra biển rộng.', 3800000, 2, 10, 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600'),
(11, N'Family Deluxe Triple', N'Phòng thiết kế cho nhóm bạn hoặc gia đình gồm 1 giường đôi và 1 giường đơn tiện lợi.', 2400000, 3, 15, 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600');

-- 12. The Imperial Hotel Vũng Tàu
INSERT INTO rooms (hotel_id, name, description, price, capacity, total_rooms, image_url) VALUES
(12, N'Deluxe King Victorian', N'Phòng phong cách lâu đài Victoria cổ kính, giường bọc nệm nhung, thảm dệt tay quý phái.', 2500000, 2, 30, 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600'),
(12, N'Grand Triple Sea View', N'Phòng gia đình hạng sang view trọn vẹn Bãi Sau, 2 giường lớn thoải mái.', 3900000, 3, 15, 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600'),
(12, N'Imperial Suite Beach Front', N'Căn Suite đẳng cấp bậc nhất nằm sát biển, lối đi riêng ra bãi cát, tích hợp hồ bơi jacuzzi.', 9000000, 4, 4, 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600');



-- =============================================
-- Bổ sung Khách sạn cùng 1 thành phố (Đà Nẵng)
-- =============================================

SET IDENTITY_INSERT hotels ON;

INSERT INTO hotels (id, name, description, address, city, latitude, longitude, rating, star_rating, image_url, phone, email, is_featured) VALUES
(13, N'InterContinental Danang Sun Peninsula', N'Khu nghỉ dưỡng sang trọng bậc nhất Châu Á nằm tựa lưng vào bán đảo Sơn Trà. Thiết kế độc bản bởi Bill Bensley, bãi biển riêng tuyệt đẹp.', N'Bãi Bắc, Bán Đảo Sơn Trà', N'Đà Nẵng', 16.1235, 108.3038, 4.9, 5, 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', '0236-393-8888', 'danang@intercontinental.com', 1),

(14, N'Mường Thanh Luxury Đà Nẵng', N'Khách sạn 5 sao mang đậm bản sắc Việt, nằm ngay mặt biển Mỹ Khê. Cung cấp không gian nghỉ dưỡng đẳng cấp với mức giá hợp lý.', N'270 Võ Nguyên Giáp, Ngũ Hành Sơn', N'Đà Nẵng', 16.0590, 108.2430, 4.4, 5, 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', '0236-395-6789', 'luxury@danang.muongthanh.vn', 0),

(15, N'Sala Danang Beach Hotel', N'Khách sạn 4 sao trẻ trung, hiện đại. Nổi bật với hồ bơi vô cực trên tầng thượng view nhìn thẳng ra biển Mỹ Khê và thành phố.', N'36 Lâm Hoành, Sơn Trà', N'Đà Nẵng', 16.0560, 108.2460, 4.6, 4, 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', '0236-365-8555', 'info@saladanangbeach.com', 1),

(16, N'Seahorse Hostel & Bar by HAVI', N'Hostel phong cách nhiệt đới cực chill ngay trung tâm thành phố. Phù hợp cho giới trẻ, backpacker yêu thích sự năng động, giao lưu.', N'7 Nguyễn Thái Học, Hải Châu', N'Đà Nẵng', 16.0640, 108.2250, 4.2, 2, 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800', '0236-312-3456', 'hello@seahorsehostel.vn', 0);

SET IDENTITY_INSERT hotels OFF;


-- =============================================
-- Gán tiện ích (hotel_amenities)
-- =============================================

-- InterContinental (Tất cả tiện ích hạng sang)
INSERT INTO hotel_amenities (hotel_id, amenity_id) VALUES (13,1),(13,2),(13,3),(13,4),(13,5),(13,6),(13,7),(13,8),(13,9),(13,10),(13,11),(13,12);
-- Mường Thanh Luxury (Đầy đủ tiện ích 5 sao cơ bản)
INSERT INTO hotel_amenities (hotel_id, amenity_id) VALUES (14,1),(14,2),(14,3),(14,4),(14,5),(14,6),(14,7),(14,8),(14,10),(14,11);
-- Sala Danang (WiFi, Hồ bơi, Nhà hàng, Gym, Điều hòa, Bar, Giặt ủi)
INSERT INTO hotel_amenities (hotel_id, amenity_id) VALUES (15,1),(15,2),(15,4),(15,5),(15,8),(15,9),(15,11);
-- Seahorse Hostel (WiFi, Điều hòa, Bar, Bãi đỗ xe)
INSERT INTO hotel_amenities (hotel_id, amenity_id) VALUES (16,1),(16,3),(16,8),(16,9);


-- =============================================
-- Bổ sung Hình ảnh (hotel_images)
-- =============================================

INSERT INTO hotel_images (hotel_id, image_url, caption) VALUES
(13, 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', N'Bán đảo Sơn Trà tuyệt đẹp'),
(13, 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', N'Nội thất độc bản Bill Bensley'),
(14, 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', N'Mặt tiền Mường Thanh Luxury'),
(15, 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800', N'Hồ bơi vô cực ngắm trọn biển Mỹ Khê'),
(16, 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800', N'Không gian Dormitory giường tầng cực chill');


-- =============================================
-- Bổ sung Phòng (Rooms) với nhiều phân khúc giá
-- =============================================

-- 13. InterContinental Danang (Phân khúc Siêu cao cấp)
INSERT INTO rooms (hotel_id, name, description, price, capacity, total_rooms, image_url) VALUES
(13, N'Resort Classic Ocean View', N'Phòng thiết kế Đông Dương, ban công siêu rộng vươn ra biển, có bàn ăn ngoài trời.', 10500000, 2, 30, 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=600'),
(13, N'Son Tra Terrace Suite', N'Suite cao cấp ngắm Vịnh Bãi Bắc, quản gia cá nhân (Butler service) phục vụ 24/7.', 18000000, 2, 10, 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600'),
(13, N'Heaven Penthouse', N'Nằm ở tầng cao nhất (Heaven Level) của resort, hồ bơi riêng biệt lơ lửng giữa trời.', 35000000, 4, 2, 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600');

-- 14. Mường Thanh Luxury (Phân khúc 5 sao tầm trung)
INSERT INTO rooms (hotel_id, name, description, price, capacity, total_rooms, image_url) VALUES
(14, N'Deluxe Twin City View', N'Phòng 2 giường đơn êm ái, ngắm cầu Rồng lung linh về đêm.', 1800000, 2, 50, 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600'),
(14, N'Executive Ocean View', N'Phòng góc tầng cao nhìn trực diện biển Mỹ Khê, có bồn tắm ngắm cảnh.', 2800000, 2, 20, 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600'),
(14, N'Presidential Suite', N'Phòng nguyên thủ rộng 150m2, thiết kế xa hoa với phòng họp và phòng ăn riêng.', 12000000, 4, 1, 'https://images.unsplash.com/photo-1631049035182-249067d7618e?w=600');

-- 15. Sala Danang Beach (Phân khúc 4 sao trẻ trung)
INSERT INTO rooms (hotel_id, name, description, price, capacity, total_rooms, image_url) VALUES
(15, N'Superior Partial Sea View', N'Phòng thiết kế tối giản, tông màu gỗ sáng, ban công nhỏ nhìn góc xiên ra biển.', 1200000, 2, 40, 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600'),
(15, N'Sala Suite Ocean Front', N'Suite với kính tràn viền 180 độ, thức giấc là thấy mặt trời mọc trên biển.', 2500000, 2, 15, 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600'),
(15, N'Family Two-Bedroom', N'Phòng nối (connecting rooms) rộng rãi, cực kỳ tiện lợi cho gia đình 4 người.', 2200000, 4, 10, 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600');

-- 16. Seahorse Hostel (Phân khúc bình dân/Dormitory)
INSERT INTO rooms (hotel_id, name, description, price, capacity, total_rooms, image_url) VALUES
(16, N'Bunk Bed in Mixed Dorm', N'Giường đơn trong phòng tập thể nam nữ, có rèm che, đèn đọc sách và tủ locker.', 150000, 1, 40, 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600'),
(16, N'Female Only Dorm', N'Phòng tập thể chỉ dành cho nữ, an ninh cao, thiết kế dễ thương, máy sấy tóc riêng.', 180000, 1, 20, 'https://images.unsplash.com/photo-1502672260266-1c1de2d93688?w=600'),
(16, N'Private Double Room', N'Phòng đôi riêng tư với nhà vệ sinh khép kín cho cặp đôi thích không khí hostel.', 550000, 2, 8, 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600');


-- =============================================
-- Bổ sung Khách sạn cùng 1 thành phố (Nha Trang)
-- =============================================

SET IDENTITY_INSERT hotels ON;

INSERT INTO hotels (id, name, description, address, city, latitude, longitude, rating, star_rating, image_url, phone, email, is_featured) VALUES
(17, N'Amiana Resort Nha Trang', N'Khu nghỉ dưỡng 5 sao sang trọng nằm nép mình bên ốc đảo yên bình. Nổi tiếng với hồ bơi nước mặn tự nhiên lớn nhất Việt Nam và dịch vụ tắm bùn khoáng nóng tư nhân.', N'Phạm Văn Đồng, Vĩnh Hòa', N'Nha Trang', 12.2858, 109.2006, 4.8, 5, 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800', '0258-355-3333', 'reservations@amianaresort.com', 1),

(18, N'Novotel Nha Trang', N'Khách sạn 4 sao chuẩn quốc tế tọa lạc ngay trên con đường vàng Trần Phú. Tất cả các phòng đều có ban công hướng biển, cách bãi tắm chỉ vài bước chân.', N'50 Trần Phú, Lộc Thọ', N'Nha Trang', 12.2415, 109.1966, 4.4, 4, 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', '0258-625-6900', 'H6033-RE@accor.com', 1),

(19, N'Aaron Hotel', N'Khách sạn 3 sao với thiết kế Boutique trẻ trung, hiện đại. Có hồ bơi nhỏ trên sân thượng và rất gần các khu chợ đêm, nhà hàng hải sản.', N'6 Trần Quang Khải, Lộc Thọ', N'Nha Trang', 12.2355, 109.1955, 4.1, 3, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', '0258-352-8899', 'info@aaronhotel.com', 0),

(20, N'Tabalo Hostel Nha Trang', N'Hostel mang phong cách tàu thủy độc đáo với các giường Cabin khép kín. Không gian sạch sẽ, thân thiện, giá cả cực kỳ tối ưu cho dân du lịch tự túc.', N'34/2/7 Nguyễn Thiện Thuật', N'Nha Trang', 12.2380, 109.1930, 4.3, 2, 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800', '0258-352-5252', 'booking@tabalohostel.com', 0);

SET IDENTITY_INSERT hotels OFF;


-- =============================================
-- Gán tiện ích (hotel_amenities) cho Nha Trang
-- =============================================

-- Amiana Resort (WiFi, Hồ bơi, Bãi đỗ, Nhà hàng, Gym, Spa, Dịch vụ 24/7, Điều hòa, Bar, Đưa đón SB)
INSERT INTO hotel_amenities (hotel_id, amenity_id) VALUES (17,1),(17,2),(17,3),(17,4),(17,5),(17,6),(17,7),(17,8),(17,9),(17,12);
-- Novotel Nha Trang (WiFi, Hồ bơi, Nhà hàng, Gym, Spa, Điều hòa, Bar, Hội nghị)
INSERT INTO hotel_amenities (hotel_id, amenity_id) VALUES (18,1),(18,2),(18,4),(18,5),(18,6),(18,8),(18,9),(18,10);
-- Aaron Hotel (WiFi, Hồ bơi, Nhà hàng, Điều hòa, Dịch vụ 24/7)
INSERT INTO hotel_amenities (hotel_id, amenity_id) VALUES (19,1),(19,2),(19,4),(19,7),(19,8);
-- Tabalo Hostel (WiFi, Điều hòa, Giặt ủi)
INSERT INTO hotel_amenities (hotel_id, amenity_id) VALUES (20,1),(20,8),(20,11);


-- =============================================
-- Bổ sung Hình ảnh (hotel_images) cho Nha Trang
-- =============================================

INSERT INTO hotel_images (hotel_id, image_url, caption) VALUES
(17, 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800', N'Hồ bơi nước mặn hướng Vịnh Nha Trang'),
(17, 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', N'Bãi biển riêng tư tĩnh lặng'),
(18, 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', N'View biển dọc đường Trần Phú'),
(19, 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', N'Phòng ngủ Boutique trẻ trung'),
(20, 'https://images.unsplash.com/photo-1502672260266-1c1de2d93688?w=800', N'Cabin giường tầng độc đáo');


-- =============================================
-- Bổ sung Phòng (Rooms) với dải giá từ Thấp đến Cao
-- =============================================

-- 17. Amiana Resort Nha Trang (Cao cấp / Nghỉ dưỡng)
INSERT INTO rooms (hotel_id, name, description, price, capacity, total_rooms, image_url) VALUES
(17, N'Deluxe Room Garden View', N'Phòng Deluxe rộng rãi, thiết kế vật liệu tự nhiên với mái tranh, tường đá, bồn tắm ngoài trời độc đáo.', 3200000, 2, 30, 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600'),
(17, N'Ocean Pool Villa 1 Bedroom', N'Biệt thự hướng biển có hồ bơi riêng, sân hiên tắm nắng, hoàn toàn riêng tư cho cặp đôi.', 7500000, 2, 10, 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=600'),
(17, N'Family Ocean Villa 3 Bedrooms', N'Biệt thự lớn cho đại gia đình, gồm phòng khách, bếp và 3 phòng ngủ hướng thẳng ra vịnh biển.', 15000000, 6, 5, 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600');

-- 18. Novotel Nha Trang (Trung - Cao cấp / Khách sạn phố biển)
INSERT INTO rooms (hotel_id, name, description, price, capacity, total_rooms, image_url) VALUES
(18, N'Standard Room Ocean View', N'Phòng tiêu chuẩn 1 giường Queen, ban công kính ngắm toàn cảnh nhịp sống nhộn nhịp của đường Trần Phú.', 1900000, 2, 40, 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600'),
(18, N'Superior Twin Ocean View', N'Phòng 2 giường đơn, thiết kế hiện đại, tiện nghi tiêu chuẩn 4 sao quốc tế.', 2100000, 2, 30, 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600'),
(18, N'Executive Suite', N'Suite tầng cao với đặc quyền ra vào Executive Lounge, bồn tắm nằm sát cửa sổ panorama.', 4500000, 2, 8, 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600');

-- 19. Aaron Hotel (Tầm trung / Tiện lợi)
INSERT INTO rooms (hotel_id, name, description, price, capacity, total_rooms, image_url) VALUES
(19, N'Superior City View', N'Phòng ngủ nhỏ gọn, nội thất gỗ ấm cúng, cửa sổ hướng ra quang cảnh thành phố tấp nập.', 800000, 2, 25, 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600'),
(19, N'Deluxe Partial Sea View', N'Phòng góc có cửa sổ kính lớn, có thể nhìn thấy một phần bãi biển Nha Trang.', 1100000, 2, 15, 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600'),
(19, N'Family Room', N'Phòng có 2 giường đôi lớn, tiết kiệm chi phí tối đa cho gia đình 4 người.', 1500000, 4, 10, 'https://images.unsplash.com/photo-1586611292717-f828b167408c?w=600');

-- 20. Tabalo Hostel Nha Trang (Bình dân / Phượt tự túc)
INSERT INTO rooms (hotel_id, name, description, price, capacity, total_rooms, image_url) VALUES
(20, N'Mixed Cabin Dorm', N'Giường khoang tàu khép kín (Cabin) trong phòng tập thể nam nữ, thẻ từ an ninh riêng, máy lạnh trung tâm.', 130000, 1, 50, 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600'),
(20, N'Female Cabin Dorm', N'Khoang giường nằm khu vực nữ riêng biệt, an toàn, có bàn trang điểm và tủ khóa từ lớn.', 150000, 1, 30, 'https://images.unsplash.com/photo-1502672260266-1c1de2d93688?w=600'),
(20, N'Cabin Double Private', N'Phòng cabin đôi riêng biệt với không gian vừa vặn cho 2 người, sử dụng nhà vệ sinh chung bên ngoài.', 350000, 2, 10, 'https://images.unsplash.com/photo-1598928506311-c55dd1b31bb1?w=600');




