import { Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.middleware.js';
import { createReview } from './review.service.js';

export const addReview = async (req: AuthRequest, res: Response) => {
  try {
    const { bookingId, rating, comment } = req.body || {};
    if (!bookingId || rating === undefined) {
      return res.status(400).json({ success: false, message: 'bookingId and rating are required' });
    }

    const review = await createReview(req.user!.userId, { bookingId, rating, comment });
    return res.status(201).json({ success: true, message: 'Review submitted', data: review });
  } catch (error) {
    return res.status(400).json({ success: false, message: (error as Error).message });
  }
};