# StayBooker - Hệ thống Quản lý Đặt phòng Khách sạn

## Giới thiệu

Hệ thống quản lý đặt phòng khách sạn trực tuyến với hai giao diện:
- **Khách hàng**: Tìm kiếm, xem chi tiết và đặt phòng khách sạn
- **Quản trị viên**: Quản lý khách sạn, phòng, đặt phòng, người dùng và thống kê

## Công nghệ sử dụng

| Thành phần | Công nghệ |
|---|---|
| Frontend | ReactJS (Vite), React Router, Axios, Recharts |
| Backend | Node.js, Express.js |
| Database | MySQL 8.0 |
| Auth | JWT + bcrypt |
| Container | Docker & Docker Compose |

## Cấu trúc dự án

```
├── backend/
│   ├── config/         # Cấu hình database
│   ├── controllers/    # Xử lý logic API
│   ├── database/       # Schema & seed SQL
│   ├── middleware/      # Auth, upload middleware
│   ├── routes/         # Định tuyến API
│   └── server.js       # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/ # Navbar, Footer, SearchBar...
│   │   ├── context/    # AuthContext, ThemeContext
│   │   ├── pages/      # Trang khách hàng + admin
│   │   └── services/   # API service (Axios)
│   └── index.html
└── docker-compose.yml
```

## Cài đặt & Chạy

### Cách 1: Docker (Khuyến nghị)

```bash
docker-compose up --build
```

Truy cập: http://localhost

### Cách 2: Chạy thủ công

**Yêu cầu**: Node.js 18+, MySQL 8.0

1. **Tạo database**:
```bash
mysql -u root -p < backend/database/schema.sql
mysql -u root -p hotel_booking < backend/database/seed.sql
```

Hoặc dùng script:
```bash
cd backend
npm run db:init
```

2. **Backend**:
```bash
cd backend
npm install
npm run dev
```

3. **Frontend**:
```bash
cd frontend
npm install
npm run dev
```

Truy cập: http://localhost:3000

## Tài khoản mặc định

| Vai trò | Email | Mật khẩu |
|---|---|---|
| Admin | admin@hotel.com | admin123 |
| Khách hàng | nguyenvana@email.com | 123456 |
| Khách hàng | tranthib@email.com | 123456 |
| Khách hàng | levanc@email.com | 123456 |

## Tính năng chính

### Khách hàng
- Tìm kiếm khách sạn theo thành phố, ngày, giá, số sao
- Xem chi tiết khách sạn với hình ảnh, tiện ích, đánh giá
- Đặt phòng (có tài khoản hoặc khách vãng lai)
- Quản lý đặt phòng: xem, sửa, hủy
- Đánh giá khách sạn
- Chế độ tối (Dark mode)

### Quản trị viên
- Dashboard thống kê: doanh thu, đặt phòng, công suất
- Quản lý CRUD: khách sạn, phòng, đặt phòng, người dùng
- Biểu đồ trực quan bằng Recharts

## API Endpoints

| Method | Endpoint | Mô tả |
|---|---|---|
| POST | /api/auth/register | Đăng ký |
| POST | /api/auth/login | Đăng nhập |
| GET | /api/hotels | Tìm kiếm khách sạn |
| GET | /api/hotels/:id | Chi tiết khách sạn |
| GET | /api/rooms/hotel/:id | Danh sách phòng |
| POST | /api/bookings | Tạo đặt phòng |
| GET | /api/bookings/my | Đặt phòng của tôi |
| POST | /api/reviews | Viết đánh giá |
| GET | /api/admin/dashboard | Thống kê (Admin) |
| CRUD | /api/admin/hotels | Quản lý KS (Admin) |
| CRUD | /api/admin/rooms | Quản lý phòng (Admin) |
| CRUD | /api/admin/bookings | Quản lý ĐP (Admin) |
| CRUD | /api/admin/users | Quản lý NĐ (Admin) |
