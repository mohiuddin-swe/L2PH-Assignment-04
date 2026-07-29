import { Router } from 'express';
import { initiatePayment, verifyPayment, myPayments, getPayment } from './payment.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/payments/create', authenticate, authorize('CUSTOMER'), initiatePayment);
router.get('/payments/confirm', verifyPayment);
router.post('/payments/confirm', verifyPayment);
router.get('/payments', authenticate, myPayments);
router.get('/payments/:id', authenticate, getPayment);

export default router;