import { Router } from 'express';
import { addReview } from './review.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/reviews', authenticate, authorize('CUSTOMER'), addReview);

export default router;