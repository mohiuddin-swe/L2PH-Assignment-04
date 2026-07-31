import { Router } from 'express';
import { getMyProfile, updateMyProfile, listTechnicians, getTechnician } from './user.controller.js';
import { authenticate, authorize } from '../../middlewares/auth.middleware.js';
import { validate } from '../../utils/validate.js';
import { updateProfileSchema } from './user.validation.js';


const router = Router();

router.get('/technicians', listTechnicians);
router.get('/technicians/:id', getTechnician);
router.get('/technician/profile', authenticate, authorize('TECHNICIAN'), getMyProfile);
router.put('/technician/profile', authenticate, authorize('TECHNICIAN'), validate(updateProfileSchema), updateMyProfile);

export default router;