import { Request, Response } from 'express';
import { getAllUsers, updateUserStatus, getAllBookings } from './admin.service.js';

export const listUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    return res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const changeUserStatus = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { status } = req.body || {};

    if (!id || !status) {
      return res.status(400).json({ success: false, message: 'User id and status are required' });
    }
    if (!['ACTIVE', 'BANNED'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Status must be ACTIVE or BANNED' });
    }

    const user = await updateUserStatus(id, status);
    return res.status(200).json({ success: true, message: 'User status updated', data: user });
  } catch (error) {
    return res.status(400).json({ success: false, message: (error as Error).message });
  }
};

export const listAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await getAllBookings();
    return res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    return res.status(500).json({ success: false, message: (error as Error).message });
  }
};