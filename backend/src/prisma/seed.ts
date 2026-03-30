import dotenv from 'dotenv';
dotenv.config();
import { PrismaClient } from '@prisma/client';
import { PrismaMssql } from '@prisma/adapter-mssql';
import bcrypt from 'bcryptjs';

const adapter = new PrismaMssql(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // Users
  const hashedAdmin = await bcrypt.hash('admin123', 10);
  const hashedUser = await bcrypt.hash('123456', 10);

  await prisma.user.createMany({
    data: [
      { name: 'Admin', email: 'admin@hotel.com', password: hashedAdmin, phone: '0901234567', role: 'admin' },
      { name: 'Nguyễn Văn An', email: 'an@gmail.com', password: hashedUser, phone: '0912345678', role: 'customer' },
      { name: 'Trần Thị Bình', email: 'binh@gmail.com', password: hashedUser, phone: '0923456789', role: 'customer' },
      { name: 'Lê Minh Châu', email: 'chau@gmail.com', password: hashedUser, phone: '0934567890', role: 'customer' },
    ],
  });

  // Amenities
  const amenitiesData = [
    { name: 'WiFi miễn phí', icon: 'FaWifi' },
    { name: 'Hồ bơi', icon: 'FaSwimmingPool' },
    { name: 'Bãi đỗ xe', icon: 'FaParking' },
    { name: 'Nhà hàng', icon: 'FaUtensils' },
    { name: 'Phòng gym', icon: 'FaDumbbell' },
    { name: 'Spa', icon: 'FaSpa' },
    { name: 'Dịch vụ phòng 24/7', icon: 'FaConciergebell' },
    { name: 'Điều hòa', icon: 'FaSnowflake' },
    { name: 'Bar', icon: 'FaGlassMartini' },
    { name: 'Trung tâm hội nghị', icon: 'FaBriefcase' },
    { name: 'Giặt ủi', icon: 'FaTshirt' },
    { name: 'Đưa đón sân bay', icon: 'FaPlane' },
  ];

  for (const a of amenitiesData) {
    await prisma.amenity.upsert({ where: { id: amenitiesData.indexOf(a) + 1 }, update: {}, create: a });
  }

  // Hotels
  const hotelsData = [
    { name: 'Mường Thanh Grand Hà Nội', description: 'Khách sạn 5 sao nằm tại trung tâm thủ đô Hà Nội, gần Hồ Hoàn Kiếm. Thiết kế sang trọng, hiện đại với đầy đủ tiện nghi cao cấp.', address: 'Số 7 Thiền Quang, Hai Bà Trưng', city: 'Hà Nội', latitude: 21.0178, longitude: 105.8480, rating: 4.5, starRating: 5, imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', phone: '024-3822-3456', email: 'hanoi@muongthanh.com', isFeatured: true },
    { name: 'Vinpearl Luxury Nha Trang', description: 'Resort nghỉ dưỡng hạng sang bên bờ biển Nha Trang. View biển tuyệt đẹp, bãi biển riêng, hồ bơi vô cực.', address: 'Đảo Hòn Tre, Vĩnh Nguyên', city: 'Nha Trang', latitude: 12.2050, longitude: 109.2300, rating: 4.8, starRating: 5, imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800', phone: '0258-359-8888', email: 'nhatrang@vinpearl.com', isFeatured: true },
    { name: 'Rex Hotel Saigon', description: 'Khách sạn lịch sử hạng sang tại trung tâm TP.HCM. Kiến trúc cổ điển pha hiện đại, rooftop bar nổi tiếng.', address: '141 Nguyễn Huệ, Quận 1', city: 'TP. Hồ Chí Minh', latitude: 10.7731, longitude: 106.7030, rating: 4.3, starRating: 5, imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', phone: '028-3829-2185', email: 'info@rexhotelvietnam.com', isFeatured: true },
    { name: 'Novotel Đà Nẵng', description: 'Khách sạn quốc tế 4 sao nằm ngay bãi biển Mỹ Khê. Phòng rộng rãi, view biển tuyệt đẹp.', address: '36 Bạch Đằng, Hải Châu', city: 'Đà Nẵng', latitude: 16.0680, longitude: 108.2240, rating: 4.2, starRating: 4, imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', phone: '0236-392-9999', email: 'danang@novotel.com', isFeatured: true },
    { name: 'Pilgrimage Village Huế', description: 'Resort nghỉ dưỡng phong cách làng quê Việt Nam giữa vùng đồi thông xanh mát.', address: '130 Minh Mạng', city: 'Huế', latitude: 16.4637, longitude: 107.5909, rating: 4.4, starRating: 4, imageUrl: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800', phone: '0234-388-5461', email: 'info@pilgrimagevillage.com', isFeatured: false },
    { name: 'Mia Resort Phú Quốc', description: 'Resort xinh đẹp ven biển Bãi Ông Lang. Bungalow riêng biệt, hồ bơi riêng, nhà hàng hải sản tươi sống.', address: 'Bãi Ông Lang', city: 'Phú Quốc', latitude: 10.3290, longitude: 103.8520, rating: 4.6, starRating: 4, imageUrl: 'https://images.unsplash.com/photo-1573052905904-34ad8c27f0cc?w=800', phone: '0297-399-8888', email: 'info@miaresort.com', isFeatured: true },
    { name: 'Sapa Legend Hotel', description: 'Khách sạn 3 sao giữa lòng thị trấn Sapa. View thung lũng Mường Hoa tuyệt đẹp.', address: '24 Đường Mường Hoa', city: 'Sapa', latitude: 22.3363, longitude: 103.8438, rating: 3.9, starRating: 3, imageUrl: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800', phone: '0214-387-1869', email: 'info@sapalegend.com', isFeatured: false },
    { name: 'Hội An Riverside Resort', description: 'Resort yên bình bên sông Thu Bồn. Kiến trúc truyền thống Hội An, vườn nhiệt đới xanh mát.', address: '175 Cửa Đại', city: 'Hội An', latitude: 15.8801, longitude: 108.3380, rating: 4.1, starRating: 4, imageUrl: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800', phone: '0235-386-4800', email: 'info@hoianriverside.com', isFeatured: false },
  ];

  for (const h of hotelsData) {
    await prisma.hotel.upsert({
      where: { id: hotelsData.indexOf(h) + 1 },
      update: {},
      create: h,
    });
  }

  // Hotel amenities mapping
  const hotelAmenitiesMap: Record<number, number[]> = {
    1: [1, 3, 4, 5, 7, 8, 10, 11],
    2: [1, 2, 3, 4, 5, 6, 7, 8, 9, 12],
    3: [1, 3, 4, 5, 7, 8, 9, 10],
    4: [1, 2, 3, 4, 5, 7, 8],
    5: [1, 2, 4, 6, 8, 11],
    6: [1, 2, 4, 6, 7, 8, 12],
    7: [1, 4, 8, 11],
    8: [1, 2, 4, 6, 8, 11],
  };

  for (const [hotelId, amenityIds] of Object.entries(hotelAmenitiesMap)) {
    for (const amenityId of amenityIds) {
      await prisma.hotelAmenity.upsert({
        where: { hotelId_amenityId: { hotelId: Number(hotelId), amenityId } },
        update: {},
        create: { hotelId: Number(hotelId), amenityId },
      });
    }
  }

  // Hotel images
  const imagesData = [
    { hotelId: 1, imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', caption: 'Mặt tiền khách sạn' },
    { hotelId: 1, imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', caption: 'Phòng Deluxe' },
    { hotelId: 1, imageUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800', caption: 'Sảnh chính' },
    { hotelId: 2, imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800', caption: 'Toàn cảnh resort' },
    { hotelId: 2, imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', caption: 'Bãi biển riêng' },
    { hotelId: 2, imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800', caption: 'Hồ bơi vô cực' },
    { hotelId: 3, imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', caption: 'Mặt tiền Rex Hotel' },
    { hotelId: 3, imageUrl: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800', caption: 'Rooftop Bar' },
    { hotelId: 4, imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', caption: 'View biển Mỹ Khê' },
    { hotelId: 4, imageUrl: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', caption: 'Phòng Superior' },
    { hotelId: 5, imageUrl: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800', caption: 'Không gian xanh' },
    { hotelId: 6, imageUrl: 'https://images.unsplash.com/photo-1573052905904-34ad8c27f0cc?w=800', caption: 'Bungalow bên biển' },
    { hotelId: 7, imageUrl: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800', caption: 'View thung lũng' },
    { hotelId: 8, imageUrl: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800', caption: 'Bên sông Thu Bồn' },
  ];

  await prisma.hotelImage.createMany({ data: imagesData });

  // Rooms
  const roomsData = [
    { hotelId: 1, name: 'Phòng Standard', description: 'Phòng tiêu chuẩn đầy đủ tiện nghi cơ bản, giường đôi lớn.', price: 800000, capacity: 2, totalRooms: 20, imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600' },
    { hotelId: 1, name: 'Phòng Deluxe', description: 'Phòng sang trọng view thành phố, minibar, bồn tắm lớn.', price: 1500000, capacity: 2, totalRooms: 15, imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600' },
    { hotelId: 1, name: 'Phòng Suite', description: 'Suite cao cấp với phòng khách riêng, view Hồ Hoàn Kiếm.', price: 3000000, capacity: 3, totalRooms: 5, imageUrl: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600' },
    { hotelId: 1, name: 'Phòng Family', description: 'Phòng gia đình rộng rãi, 2 giường đôi, bàn làm việc.', price: 2000000, capacity: 4, totalRooms: 10, imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600' },
    { hotelId: 2, name: 'Deluxe Ocean View', description: 'Phòng view biển trực diện, ban công riêng, nội thất gỗ tự nhiên.', price: 3500000, capacity: 2, totalRooms: 30, imageUrl: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=600' },
    { hotelId: 2, name: 'Premium Suite', description: 'Suite hạng sang với phòng khách rộng, jacuzzi, view panorama biển.', price: 6000000, capacity: 2, totalRooms: 10, imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600' },
    { hotelId: 2, name: 'Villa Pool', description: 'Biệt thự riêng với hồ bơi, 2 phòng ngủ, vườn nhiệt đới.', price: 12000000, capacity: 4, totalRooms: 5, imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600' },
    { hotelId: 2, name: 'Beach Bungalow', description: 'Bungalow sát bãi biển riêng, sân hiên rộng, hammock.', price: 4500000, capacity: 2, totalRooms: 8, imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600' },
    { hotelId: 3, name: 'Classic Room', description: 'Phòng phong cách cổ điển, tiện nghi hiện đại, giường king.', price: 2000000, capacity: 2, totalRooms: 25, imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600' },
    { hotelId: 3, name: 'Premium Room', description: 'Phòng cao cấp view Nguyễn Huệ, minibar, phòng tắm đá cẩm thạch.', price: 3500000, capacity: 2, totalRooms: 15, imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600' },
    { hotelId: 3, name: 'Royal Suite', description: 'Suite hoàng gia rộng 80m², phòng khách sang trọng, butler riêng.', price: 8000000, capacity: 3, totalRooms: 3, imageUrl: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600' },
    { hotelId: 4, name: 'Superior Room', description: 'Phòng tiêu chuẩn view thành phố, ban công nhỏ.', price: 1200000, capacity: 2, totalRooms: 30, imageUrl: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600' },
    { hotelId: 4, name: 'Deluxe Sea View', description: 'Phòng view biển Mỹ Khê, nội thất hiện đại.', price: 2000000, capacity: 2, totalRooms: 20, imageUrl: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=600' },
    { hotelId: 4, name: 'Executive Suite', description: 'Suite rộng rãi, phòng khách riêng, view biển panorama.', price: 3500000, capacity: 3, totalRooms: 8, imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600' },
    { hotelId: 5, name: 'Garden Room', description: 'Phòng view vườn, thiết kế mộc mạc ấm cúng.', price: 900000, capacity: 2, totalRooms: 20, imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600' },
    { hotelId: 5, name: 'Pool Villa', description: 'Villa có hồ bơi riêng, sân vườn rộng.', price: 3000000, capacity: 2, totalRooms: 6, imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600' },
    { hotelId: 5, name: 'Honeymoon Suite', description: 'Suite trăng mật lãng mạn, bồn tắm ngoài trời.', price: 2500000, capacity: 2, totalRooms: 4, imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600' },
    { hotelId: 6, name: 'Garden View Room', description: 'Phòng view vườn nhiệt đới, gần hồ bơi chung.', price: 1800000, capacity: 2, totalRooms: 15, imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600' },
    { hotelId: 6, name: 'Beach Front Room', description: 'Phòng mặt biển, ban công rộng nhìn hoàng hôn.', price: 3200000, capacity: 2, totalRooms: 10, imageUrl: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=600' },
    { hotelId: 6, name: 'Pool Villa', description: 'Biệt thự hồ bơi riêng, 1 phòng ngủ, phong cách Indochine.', price: 5500000, capacity: 2, totalRooms: 5, imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600' },
    { hotelId: 7, name: 'Standard Room', description: 'Phòng tiêu chuẩn ấm cúng, view núi.', price: 500000, capacity: 2, totalRooms: 20, imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600' },
    { hotelId: 7, name: 'Superior Room', description: 'Phòng rộng hơn, ban công view thung lũng Mường Hoa.', price: 800000, capacity: 2, totalRooms: 10, imageUrl: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600' },
    { hotelId: 7, name: 'Family Room', description: 'Phòng gia đình 2 giường, sưởi ấm, view đẹp.', price: 1000000, capacity: 4, totalRooms: 8, imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600' },
    { hotelId: 8, name: 'River View Room', description: 'Phòng view sông Thu Bồn, ban công rộng.', price: 1200000, capacity: 2, totalRooms: 15, imageUrl: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=600' },
    { hotelId: 8, name: 'Garden Bungalow', description: 'Bungalow giữa vườn nhiệt đới, sân riêng.', price: 1800000, capacity: 2, totalRooms: 10, imageUrl: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600' },
    { hotelId: 8, name: 'Pool Access Room', description: 'Phòng kết nối hồ bơi, bước ra là bơi ngay.', price: 2200000, capacity: 2, totalRooms: 6, imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600' },
  ];

  await prisma.room.createMany({ data: roomsData });

  // Bookings
  await prisma.booking.createMany({
    data: [
      { userId: 2, roomId: 1, checkIn: new Date('2025-04-01'), checkOut: new Date('2025-04-03'), numRooms: 1, totalPrice: 1600000, status: 'confirmed', guestName: 'Nguyễn Văn An', guestEmail: 'an@gmail.com', guestPhone: '0912345678', paymentMethod: 'credit_card', paymentStatus: 'paid' },
      { userId: 2, roomId: 5, checkIn: new Date('2025-04-10'), checkOut: new Date('2025-04-14'), numRooms: 1, totalPrice: 14000000, status: 'confirmed', guestName: 'Nguyễn Văn An', guestEmail: 'an@gmail.com', guestPhone: '0912345678', paymentMethod: 'bank_transfer', paymentStatus: 'paid' },
      { userId: 3, roomId: 9, checkIn: new Date('2025-04-05'), checkOut: new Date('2025-04-07'), numRooms: 1, totalPrice: 4000000, status: 'pending', guestName: 'Trần Thị Bình', guestEmail: 'binh@gmail.com', guestPhone: '0923456789', paymentMethod: 'credit_card', paymentStatus: 'pending' },
      { userId: 4, roomId: 14, checkIn: new Date('2025-04-15'), checkOut: new Date('2025-04-18'), numRooms: 1, totalPrice: 6000000, status: 'confirmed', guestName: 'Lê Minh Châu', guestEmail: 'chau@gmail.com', guestPhone: '0934567890', paymentMethod: 'cash', paymentStatus: 'paid' },
      { userId: 3, roomId: 20, checkIn: new Date('2025-03-20'), checkOut: new Date('2025-03-22'), numRooms: 1, totalPrice: 1000000, status: 'completed', guestName: 'Trần Thị Bình', guestEmail: 'binh@gmail.com', guestPhone: '0923456789', paymentMethod: 'credit_card', paymentStatus: 'paid' },
      { userId: 2, roomId: 2, checkIn: new Date('2025-05-01'), checkOut: new Date('2025-05-05'), numRooms: 1, totalPrice: 6000000, status: 'pending', guestName: 'Nguyễn Văn An', guestEmail: 'an@gmail.com', guestPhone: '0912345678', paymentMethod: 'bank_transfer', paymentStatus: 'pending' },
    ],
  });

  // Reviews
  await prisma.review.createMany({
    data: [
      { userId: 2, hotelId: 1, rating: 5, comment: 'Khách sạn tuyệt vời! Vị trí đẹp, dịch vụ chu đáo, phòng sạch sẽ.' },
      { userId: 3, hotelId: 1, rating: 4, comment: 'Phòng đẹp, nhân viên thân thiện. Ăn sáng hơi ít lựa chọn.' },
      { userId: 2, hotelId: 2, rating: 5, comment: 'Resort đẳng cấp! Biển đẹp, hồ bơi tuyệt vời, nhất định sẽ quay lại.' },
      { userId: 4, hotelId: 3, rating: 4, comment: 'Khách sạn có lịch sử lâu đời, vị trí trung tâm rất tiện. Rooftop bar rất đẹp.' },
      { userId: 3, hotelId: 4, rating: 4, comment: 'Bãi biển Mỹ Khê quá đẹp! Phòng sạch sẽ, view rất đẹp.' },
      { userId: 4, hotelId: 6, rating: 5, comment: 'Phú Quốc thật tuyệt, resort xinh xắn, bãi biển hoàng hôn đẹp mê.' },
      { userId: 2, hotelId: 7, rating: 3, comment: 'Vị trí tốt nhưng phòng hơi nhỏ. View đẹp bù lại tất cả.' },
      { userId: 3, hotelId: 8, rating: 4, comment: 'Không gian yên tĩnh bên sông, gần phố cổ. Rất phù hợp nghỉ dưỡng.' },
    ],
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
