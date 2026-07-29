import express, { Application, Request, Response } from 'express';
import config from './config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/user/user.routes';
import categoriesRoutes from './modules/categories/categories.routes';  
import servicesRoutes from './modules/services/services.routes';

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

app.get('/', (req:Request, res:Response) => {
    res.send('Hello, World!');
});

export default app;