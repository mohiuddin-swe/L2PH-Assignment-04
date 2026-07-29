import express, { Application, Request, Response } from 'express';
import config from './config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/user/user.routes';
import categoriesRoutes from './modules/categories/categories.routes';  
import servicesRoutes from './modules/services/services.routes';
import bookingRoutes from './modules/booking/booking.routes';
import paymentRoutes from './modules/payment/payment.routes';
import reviewRoutes from './modules/review/review.routes';

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

app.get('/', (req:Request, res:Response) => {
    res.send('Hello, World!');
});

export default app;