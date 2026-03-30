import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes';
import hotelRoutes from './routes/hotel.routes';
import roomRoutes from './routes/room.routes';
import bookingRoutes from './routes/booking.routes';
import reviewRoutes from './routes/review.routes';
import adminRoutes from './routes/admin.routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handler
app.use(errorHandler);

export default app;
