import { Router } from 'express';
import { adminController } from '../controllers/admin.controller';
import { authenticate, isAdmin } from '../middlewares/auth.middleware';
import { upload } from '../utils/upload';

const router = Router();

// Tất cả route admin đều yêu cầu đăng nhập + quyền admin
router.use(authenticate, isAdmin);

// Dashboard
router.get('/dashboard', (req, res, next) => adminController.getDashboardStats(req, res, next));

// Khách sạn
router.post('/hotels', upload.single('image'), (req, res, next) => adminController.createHotel(req, res, next));
router.put('/hotels/:id', upload.single('image'), (req, res, next) => adminController.updateHotel(req, res, next));
router.delete('/hotels/:id', (req, res, next) => adminController.deleteHotel(req, res, next));

// Phòng
router.post('/rooms', upload.single('image'), (req, res, next) => adminController.createRoom(req, res, next));
router.put('/rooms/:id', upload.single('image'), (req, res, next) => adminController.updateRoom(req, res, next));
router.delete('/rooms/:id', (req, res, next) => adminController.deleteRoom(req, res, next));

// Đặt phòng
router.get('/bookings', (req, res, next) => adminController.getAllBookings(req, res, next));
router.put('/bookings/:id', (req, res, next) => adminController.updateBookingStatus(req, res, next));

// Người dùng
router.get('/users', (req, res, next) => adminController.getAllUsers(req, res, next));
router.get('/users/:id', (req, res, next) => adminController.getUserDetail(req, res, next));
router.put('/users/:id/role', (req, res, next) => adminController.updateUserRole(req, res, next));
router.put('/users/:id/toggle-active', (req, res, next) => adminController.toggleUserActive(req, res, next));
router.put('/users/:id/reset-password', (req, res, next) => adminController.resetUserPassword(req, res, next));
router.delete('/users/:id', (req, res, next) => adminController.deleteUser(req, res, next));

export default router;
