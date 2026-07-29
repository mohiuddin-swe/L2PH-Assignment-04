import { Router } from 'express';
import { listUsers, changeUserStatus, listAllBookings } from './admin.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';

const router = Router();

router.use(authenticate, authorize('ADMIN'));

router.get('/admin/users', listUsers);
router.patch('/admin/users/:id', changeUserStatus);
router.get('/admin/bookings', listAllBookings);

export default router;