-- =============================================
-- Seed Data: Hotel Booking Management System
-- =============================================

USE hotel_booking;

-- Admin account (password: admin123)
INSERT INTO users (name, email, password, phone, role) VALUES
('Admin', 'admin@hotel.com', '$2a$10$r.qiUiIbQL0.JG94bMG9OezBzBF4SAhFx6UBCfxFTNrfrdnb3RbkK', '0901234567', 'admin');

-- Customer accounts (password: 123456)
INSERT INTO users (name, email, password, phone, role) VALUES
('Nguyễn Văn An', 'an@gmail.com', '$2a$10$BByN3BzN2/fs0Bl8Zh6asOQwxMcIM.i96G0tabOGh3qBKOU3E0dey', '0912345678', 'customer'),
('Trần Thị Bình', 'binh@gmail.com', '$2a$10$BByN3BzN2/fs0Bl8Zh6asOQwxMcIM.i96G0tabOGh3qBKOU3E0dey', '0923456789', 'customer'),
('Lê Minh Châu', 'chau@gmail.com', '$2a$10$BByN3BzN2/fs0Bl8Zh6asOQwxMcIM.i96G0tabOGh3qBKOU3E0dey', '0934567890', 'customer');

-- Tiện ích
INSERT INTO amenities (name, icon) VALUES
('WiFi miễn phí', 'FaWifi'),
('Hồ bơi', 'FaSwimmingPool'),
('Bãi đỗ xe', 'FaParking'),
('Nhà hàng', 'FaUtensils'),
('Phòng gym', 'FaDumbbell'),
('Spa', 'FaSpa'),
('Dịch vụ phòng 24/7', 'FaConciergebell'),
('Điều hòa', 'FaSnowflake'),
('Bar', 'FaGlassMartini'),
('Trung tâm hội nghị', 'FaBriefcase'),
('Giặt ủi', 'FaTshirt'),
('Đưa đón sân bay', 'FaPlane');

-- Khách sạn
INSERT INTO hotels (name, description, address, city, latitude, longitude, rating, star_rating, image_url, phone, email, is_featured) VALUES
('Mường Thanh Grand Hà Nội', 'Khách sạn 5 sao nằm tại trung tâm thủ đô Hà Nội, gần Hồ Hoàn Kiếm. Thiết kế sang trọng, hiện đại với đầy đủ tiện nghi cao cấp. Phù hợp cho cả du lịch và công tác.', 'Số 7 Thiền Quang, Hai Bà Trưng', 'Hà Nội', 21.0178, 105.8480, 4.5, 5, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', '024-3822-3456', 'hanoi@muongthanh.com', 1),

('Vinpearl Luxury Nha Trang', 'Resort nghỉ dưỡng hạng sang bên bờ biển Nha Trang. View biển tuyệt đẹp, bãi biển riêng, hồ bơi vô cực. Trải nghiệm nghỉ dưỡng đẳng cấp quốc tế.', 'Đảo Hòn Tre, Vĩnh Nguyên', 'Nha Trang', 12.2050, 109.2300, 4.8, 5, 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800', '0258-359-8888', 'nhatrang@vinpearl.com', 1),

('Rex Hotel Saigon', 'Khách sạn lịch sử hạng sang tại trung tâm TP.HCM. Kiến trúc cổ điển pha hiện đại, rooftop bar nổi tiếng nhìn ra Nhà hát Thành phố.', '141 Nguyễn Huệ, Quận 1', 'TP. Hồ Chí Minh', 10.7731, 106.7030, 4.3, 5, 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', '028-3829-2185', 'info@rexhotelvietnam.com', 1),

('Novotel Đà Nẵng', 'Khách sạn quốc tế 4 sao nằm ngay bãi biển Mỹ Khê. Phòng rộng rãi, view biển tuyệt đẹp. Gần cầu Rồng và các điểm du lịch nổi tiếng.', '36 Bạch Đằng, Hải Châu', 'Đà Nẵng', 16.0680, 108.2240, 4.2, 4, 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', '0236-392-9999', 'danang@novotel.com', 1),

('Pilgrimage Village Huế', 'Resort nghỉ dưỡng phong cách làng quê Việt Nam giữa vùng đồi thông xanh mát. Không gian yên tĩnh, thân thiện môi trường.', '130 Minh Mạng', 'Huế', 16.4637, 107.5909, 4.4, 4, 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800', '0234-388-5461', 'info@pilgrimagevillage.com', 0),

('Mia Resort Phú Quốc', 'Resort xinh đẹp ven biển Bãi Ông Lang. Bungalow riêng biệt, hồ bơi riêng, nhà hàng hải sản tươi sống. Nơi nghỉ dưỡng lý tưởng.', 'Bãi Ông Lang', 'Phú Quốc', 10.3290, 103.8520, 4.6, 4, 'https://images.unsplash.com/photo-1573052905904-34ad8c27f0cc?w=800', '0297-399-8888', 'info@miaresort.com', 1),

('Sapa Legend Hotel', 'Khách sạn 3 sao giữa lòng thị trấn Sapa. View thung lũng Mường Hoa tuyệt đẹp. Phù hợp du lịch khám phá vùng Tây Bắc.', '24 Đường Mường Hoa', 'Sapa', 22.3363, 103.8438, 3.9, 3, 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800', '0214-387-1869', 'info@sapalegend.com', 0),

('Hội An Riverside Resort', 'Resort yên bình bên sông Thu Bồn. Kiến trúc truyền thống Hội An, vườn nhiệt đới xanh mát. Cách phố cổ chỉ 10 phút đi bộ.', '175 Cửa Đại', 'Hội An', 15.8801, 108.3380, 4.1, 4, 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800', '0235-386-4800', 'info@hoianriverside.com', 0);

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
(1, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 'Mặt tiền khách sạn'),
(1, 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', 'Phòng Deluxe'),
(1, 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800', 'Sảnh chính'),
(2, 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800', 'Toàn cảnh resort'),
(2, 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', 'Bãi biển riêng'),
(2, 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800', 'Hồ bơi vô cực'),
(3, 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', 'Mặt tiền Rex Hotel'),
(3, 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800', 'Rooftop Bar'),
(4, 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', 'View biển Mỹ Khê'),
(4, 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', 'Phòng Superior'),
(5, 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800', 'Không gian xanh'),
(6, 'https://images.unsplash.com/photo-1573052905904-34ad8c27f0cc?w=800', 'Bungalow bên biển'),
(7, 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800', 'View thung lũng'),
(8, 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800', 'Bên sông Thu Bồn');

-- Phòng khách sạn
-- Mường Thanh Grand Hà Nội
INSERT INTO rooms (hotel_id, name, description, price, capacity, total_rooms, image_url) VALUES
(1, 'Phòng Standard', 'Phòng tiêu chuẩn đầy đủ tiện nghi cơ bản, giường đôi lớn.', 800000, 2, 20, 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600'),
(1, 'Phòng Deluxe', 'Phòng sang trọng view thành phố, minibar, bồn tắm lớn.', 1500000, 2, 15, 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600'),
(1, 'Phòng Suite', 'Suite cao cấp với phòng khách riêng, view Hồ Hoàn Kiếm.', 3000000, 3, 5, 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600'),
(1, 'Phòng Family', 'Phòng gia đình rộng rãi, 2 giường đôi, bàn làm việc.', 2000000, 4, 10, 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600');

-- Vinpearl Luxury Nha Trang
INSERT INTO rooms (hotel_id, name, description, price, capacity, total_rooms, image_url) VALUES
(2, 'Deluxe Ocean View', 'Phòng view biển trực diện, ban công riêng, nội thất gỗ tự nhiên.', 3500000, 2, 30, 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=600'),
(2, 'Premium Suite', 'Suite hạng sang với phòng khách rộng, jacuzzi, view panorama biển.', 6000000, 2, 10, 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600'),
(2, 'Villa Pool', 'Biệt thự riêng với hồ bơi, 2 phòng ngủ, vườn nhiệt đới.', 12000000, 4, 5, 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600'),
(2, 'Beach Bungalow', 'Bungalow sát bãi biển riêng, sân hiên rộng, hammock.', 4500000, 2, 8, 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600');

-- Rex Hotel Saigon
INSERT INTO rooms (hotel_id, name, description, price, capacity, total_rooms, image_url) VALUES
(3, 'Classic Room', 'Phòng phong cách cổ điển, tiện nghi hiện đại, giường king.', 2000000, 2, 25, 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600'),
(3, 'Premium Room', 'Phòng cao cấp view Nguyễn Huệ, minibar, phòng tắm đá cẩm thạch.', 3500000, 2, 15, 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600'),
(3, 'Royal Suite', 'Suite hoàng gia rộng 80m², phòng khách sang trọng, butler riêng.', 8000000, 3, 3, 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600');

-- Novotel Đà Nẵng
INSERT INTO rooms (hotel_id, name, description, price, capacity, total_rooms, image_url) VALUES
(4, 'Superior Room', 'Phòng tiêu chuẩn view thành phố, ban công nhỏ.', 1200000, 2, 30, 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600'),
(4, 'Deluxe Sea View', 'Phòng view biển Mỹ Khê, nội thất hiện đại.', 2000000, 2, 20, 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=600'),
(4, 'Executive Suite', 'Suite rộng rãi, phòng khách riêng, view biển panorama.', 3500000, 3, 8, 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600');

-- Pilgrimage Village Huế
INSERT INTO rooms (hotel_id, name, description, price, capacity, total_rooms, image_url) VALUES
(5, 'Garden Room', 'Phòng view vườn, thiết kế mộc mạc ấm cúng.', 900000, 2, 20, 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600'),
(5, 'Pool Villa', 'Villa có hồ bơi riêng, sân vườn rộng.', 3000000, 2, 6, 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600'),
(5, 'Honeymoon Suite', 'Suite trăng mật lãng mạn, bồn tắm ngoài trời.', 2500000, 2, 4, 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600');

-- Mia Resort Phú Quốc
INSERT INTO rooms (hotel_id, name, description, price, capacity, total_rooms, image_url) VALUES
(6, 'Garden View Room', 'Phòng view vườn nhiệt đới, gần hồ bơi chung.', 1800000, 2, 15, 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600'),
(6, 'Beach Front Room', 'Phòng mặt biển, ban công rộng nhìn hoàng hôn.', 3200000, 2, 10, 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=600'),
(6, 'Pool Villa', 'Biệt thự hồ bơi riêng, 1 phòng ngủ, phong cách Indochine.', 5500000, 2, 5, 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600');

-- Sapa Legend
INSERT INTO rooms (hotel_id, name, description, price, capacity, total_rooms, image_url) VALUES
(7, 'Standard Room', 'Phòng tiêu chuẩn ấm cúng, view núi.', 500000, 2, 20, 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600'),
(7, 'Superior Room', 'Phòng rộng hơn, ban công view thung lũng Mường Hoa.', 800000, 2, 10, 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600'),
(7, 'Family Room', 'Phòng gia đình 2 giường, sưởi ấm, view đẹp.', 1000000, 4, 8, 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600');

-- Hội An Riverside
INSERT INTO rooms (hotel_id, name, description, price, capacity, total_rooms, image_url) VALUES
(8, 'River View Room', 'Phòng view sông Thu Bồn, ban công rộng.', 1200000, 2, 15, 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=600'),
(8, 'Garden Bungalow', 'Bungalow giữa vườn nhiệt đới, sân riêng.', 1800000, 2, 10, 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600'),
(8, 'Pool Access Room', 'Phòng kết nối hồ bơi, bước ra là bơi ngay.', 2200000, 2, 6, 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600');

-- Đặt phòng mẫu
INSERT INTO bookings (user_id, room_id, check_in, check_out, num_rooms, total_price, status, guest_name, guest_email, guest_phone, payment_method, payment_status) VALUES
(2, 1, '2025-04-01', '2025-04-03', 1, 1600000, 'confirmed', 'Nguyễn Văn An', 'an@gmail.com', '0912345678', 'credit_card', 'paid'),
(2, 5, '2025-04-10', '2025-04-14', 1, 14000000, 'confirmed', 'Nguyễn Văn An', 'an@gmail.com', '0912345678', 'bank_transfer', 'paid'),
(3, 9, '2025-04-05', '2025-04-07', 1, 4000000, 'pending', 'Trần Thị Bình', 'binh@gmail.com', '0923456789', 'credit_card', 'pending'),
(4, 14, '2025-04-15', '2025-04-18', 1, 6000000, 'confirmed', 'Lê Minh Châu', 'chau@gmail.com', '0934567890', 'cash', 'paid'),
(3, 20, '2025-03-20', '2025-03-22', 1, 1000000, 'completed', 'Trần Thị Bình', 'binh@gmail.com', '0923456789', 'credit_card', 'paid'),
(2, 2, '2025-05-01', '2025-05-05', 1, 6000000, 'pending', 'Nguyễn Văn An', 'an@gmail.com', '0912345678', 'bank_transfer', 'pending');

-- Đánh giá mẫu
INSERT INTO reviews (user_id, hotel_id, rating, comment) VALUES
(2, 1, 5, 'Khách sạn tuyệt vời! Vị trí đẹp, dịch vụ chu đáo, phòng sạch sẽ.'),
(3, 1, 4, 'Phòng đẹp, nhân viên thân thiện. Ăn sáng hơi ít lựa chọn.'),
(2, 2, 5, 'Resort đẳng cấp! Biển đẹp, hồ bơi tuyệt vời, nhất định sẽ quay lại.'),
(4, 3, 4, 'Khách sạn có lịch sử lâu đời, vị trí trung tâm rất tiện. Rooftop bar rất đẹp.'),
(3, 4, 4, 'Bãi biển Mỹ Khê quá đẹp! Phòng sạch sẽ, view rất đẹp.'),
(4, 6, 5, 'Phú Quốc thật tuyệt, resort xinh xắn, bãi biển hoàng hôn đẹp mê.'),
(2, 7, 3, 'Vị trí tốt nhưng phòng hơi nhỏ. View đẹp bù lại tất cả.'),
(3, 8, 4, 'Không gian yên tĩnh bên sông, gần phố cổ. Rất phù hợp nghỉ dưỡng.');
