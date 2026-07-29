import { Request, Response } from 'express';
import { registerUser, loginUser, getUserById } from './auth.service.js';
import { AuthRequest } from '../../middlewares/auth.middleware.js';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    if (!['CUSTOMER', 'TECHNICIAN'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role' });
    }

    const user = await registerUser(name, email, password, role);
    return res.status(201).json({ success: true, message: 'User registered successfully', data: user });
  } catch (error) {
    return res.status(400).json({ success: false, message: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const result = await loginUser(email, password);
    return res.status(200).json({ success: true, message: 'Login successful', data: result });
  } catch (error) {
    return res.status(401).json({ success: false, message: (error as Error).message });
  }
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = await getUserById(req.user!.userId);
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    return res.status(404).json({ success: false, message: (error as Error).message });
  }
};