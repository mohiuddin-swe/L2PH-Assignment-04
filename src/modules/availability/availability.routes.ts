import { Router } from 'express';
import { myAvailability, publicAvailability, addSlot, removeSlot } from './availability.controller.js';
import { authenticate, authorize } from '../../middlewares/auth.middleware.js';
import { validate } from '../../utils/validate.js';
import { addAvailabilitySchema } from './availability.validation.js';

const router = Router();

router.get('/technician/availability', authenticate, authorize('TECHNICIAN'), myAvailability);
router.put('/technician/availability', authenticate, authorize('TECHNICIAN'), validate(addAvailabilitySchema), addSlot);
router.delete('/technician/availability/:id', authenticate, authorize('TECHNICIAN'), removeSlot);
router.get('/technicians/:id/availability', publicAvailability);

export default router;