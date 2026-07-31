import { Router } from 'express';
import { listUsers, changeUserStatus, listAllBookings } from './admin.controller.js';
import { authenticate, authorize } from '../../middlewares/auth.middleware.js';
import { validate } from '../../utils/validate.js';
import { updateUserStatusSchema } from './admin.validation.js';


const router = Router();

router.get('/admin/users', authenticate, authorize('ADMIN'), listUsers);
router.patch('/admin/users/:id', authenticate, authorize('ADMIN'), validate(updateUserStatusSchema), changeUserStatus);
router.get('/admin/bookings', authenticate, authorize('ADMIN'), listAllBookings);

export default router;