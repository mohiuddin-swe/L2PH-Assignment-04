import { Request, Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.middleware.js';
import { createPayment, confirmPayment, getUserPayments, getPaymentById } from './payment.service.js';

export const initiatePayment = async (req: AuthRequest, res: Response) => {
  try {
    const { bookingId } = req.body || {};
    if (!bookingId) {
      return res.status(400).json({ success: false, message: 'bookingId is required' });
    }

    const result = await createPayment(req.user!.userId, { bookingId });
    return res.status(201).json({ success: true, message: 'Payment session created', data: result });
  } catch (error) {
    return res.status(400).json({ success: false, message: (error as Error).message });
  }
};

// SSLCommerz success/fail/cancel callback (GET, query params দিয়ে আসে)
export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { status, tran_id, bookingId } = req.query;

    if (!bookingId || !tran_id) {
      return res.status(400).json({ success: false, message: 'Invalid callback data' });
    }

    const success = status === 'success';
    const payment = await confirmPayment(bookingId as string, tran_id as string, success);

    return res.status(200).json({ success: true, message: `Payment ${status}`, data: payment });
  } catch (error) {
    return res.status(400).json({ success: false, message: (error as Error).message });
  }
};

export const myPayments = async (req: AuthRequest, res: Response) => {
  try {
    const payments = await getUserPayments(req.user!.userId);
    return res.status(200).json({ success: true, data: payments });
  } catch (error) {
    return res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const getPayment = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    if (!id) return res.status(400).json({ success: false, message: 'Payment id is required' });

    const payment = await getPaymentById(id);
    return res.status(200).json({ success: true, data: payment });
  } catch (error) {
    return res.status(404).json({ success: false, message: (error as Error).message });
  }
};