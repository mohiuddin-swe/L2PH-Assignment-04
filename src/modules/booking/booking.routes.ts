import { Router } from 'express';
import {
  addBooking,
  myBookings,
  getBooking,
  changeBookingStatus,
  cancelMyBooking,
} from './booking.controller.js';
import { authenticate, authorize } from '../../middlewares/auth.middleware.js';
import { validate } from '../../utils/validate.js';
import { createBookingSchema, updateBookingStatusSchema } from './booking.validation.js';

const router = Router();

router.post('/bookings', authenticate, authorize('CUSTOMER'), validate(createBookingSchema), addBooking);
router.patch('/technician/bookings/:id', authenticate, authorize('TECHNICIAN'), validate(updateBookingStatusSchema), changeBookingStatus);
router.get('/bookings', authenticate, myBookings);
router.get('/bookings/:id', authenticate, getBooking);
router.get('/technician/bookings', authenticate, authorize('TECHNICIAN'), myBookings);
router.patch('/bookings/:id/cancel', authenticate, authorize('CUSTOMER'), cancelMyBooking);

export default router;