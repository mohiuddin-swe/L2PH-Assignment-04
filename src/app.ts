import express, { Application, Request, Response } from 'express';
import { notFoundHandler, globalErrorHandler } from './middlewares/errorHandler.js';

import config from './config/index.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './modules/auth/auth.routes.js';
import userRoutes from './modules/user/user.routes.js';
import categoriesRoutes from './modules/categories/categories.routes.js';  
import servicesRoutes from './modules/services/services.routes.js';
import bookingRoutes from './modules/booking/booking.routes.js';
import paymentRoutes from './modules/payment/payment.routes.js';
import reviewRoutes from './modules/review/review.routes.js';
import adminRoutes from './modules/admin/admin.routes.js';
const app : Application = express();


app.use(cors({
    origin: config.app_url,
    credentials: true,
}));

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

app.get('/', (req:Request, res:Response) => {
    res.send('Hello, World!');
});

app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
