import { Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.middleware';
import {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBookingStatus,
  cancelBooking,
} from './booking.service';

export const addBooking = async (req: AuthRequest, res: Response) => {
  try {
    const { serviceId, scheduledAt } = req.body || {};
    if (!serviceId || !scheduledAt) {
      return res.status(400).json({ success: false, message: 'serviceId and scheduledAt are required' });
    }

    const booking = await createBooking(req.user!.userId, { serviceId, scheduledAt });
    return res.status(201).json({ success: true, message: 'Booking created', data: booking });
  } catch (error) {
    return res.status(400).json({ success: false, message: (error as Error).message });
  }
};

export const myBookings = async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await getUserBookings(req.user!.userId, req.user!.role);
    return res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    return res.status(400).json({ success: false, message: (error as Error).message });
  }
};

export const getBooking = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    if (!id) return res.status(400).json({ success: false, message: 'Booking id is required' });

    const booking = await getBookingById(id);
    return res.status(200).json({ success: true, data: booking });
  } catch (error) {
    return res.status(404).json({ success: false, message: (error as Error).message });
  }
};

export const changeBookingStatus = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    const { status } = req.body || {};
    if (!id || !status) {
      return res.status(400).json({ success: false, message: 'Booking id and status are required' });
    }

    const updated = await updateBookingStatus(id, req.user!.userId, status);
    return res.status(200).json({ success: true, message: 'Booking status updated', data: updated });
  } catch (error) {
    return res.status(400).json({ success: false, message: (error as Error).message });
  }
};

export const cancelMyBooking = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    if (!id) return res.status(400).json({ success: false, message: 'Booking id is required' });

    const cancelled = await cancelBooking(id, req.user!.userId);
    return res.status(200).json({ success: true, message: 'Booking cancelled', data: cancelled });
  } catch (error) {
    return res.status(400).json({ success: false, message: (error as Error).message });
  }
};