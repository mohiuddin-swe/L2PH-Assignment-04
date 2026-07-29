import { Router } from 'express';
import { addReview } from './review.controller.js';
import { authenticate, authorize } from '../../middlewares/auth.middleware.js';

const router = Router();

router.post('/reviews', authenticate, authorize('CUSTOMER'), addReview);

export default router;