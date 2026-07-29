import "dotenv/config";
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from '../src/modules/auth/auth.routes.js';
import userRoutes from '../src/modules/user/user.routes.js';
import categoriesRoutes from '../src/modules/categories/categories.routes.js';
import servicesRoutes from '../src/modules/services/services.routes.js';
import bookingRoutes from '../src/modules/booking/booking.routes.js';
import paymentRoutes from '../src/modules/payment/payment.routes.js';
import reviewRoutes from '../src/modules/review/review.routes.js';
import adminRoutes from '../src/modules/admin/admin.routes.js';
import { notFoundHandler, globalErrorHandler } from '../src/middlewares/errorHandler.js';

const app: Application = express();

app.use(cors({ origin: process.env.APP_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoriesRoutes);
app.use('/api', servicesRoutes);
app.use('/api', bookingRoutes);
app.use('/api', paymentRoutes);
app.use('/api', reviewRoutes);
app.use('/api', adminRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;