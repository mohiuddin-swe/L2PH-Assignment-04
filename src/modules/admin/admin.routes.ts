import { Router } from 'express';
import { listUsers, changeUserStatus, listAllBookings } from './admin.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/admin/users', authenticate, authorize('ADMIN'), listUsers);
router.patch('/admin/users/:id', authenticate, authorize('ADMIN'), changeUserStatus);
router.get('/admin/bookings', authenticate, authorize('ADMIN'), listAllBookings);

export default router;