import { Router } from 'express';
import { addReview } from './review.controller.js';
import { authenticate, authorize } from '../../middlewares/auth.middleware.js';
import { validate } from '../../utils/validate.js';
import { createReviewSchema } from './review.validation.js';

const router = Router();

router.post('/reviews', authenticate, authorize('CUSTOMER'), validate(createReviewSchema), addReview);

export default router;