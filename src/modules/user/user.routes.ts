import { Router } from 'express';
import { getMyProfile, updateMyProfile, listTechnicians, getTechnician } from './user.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/technicians', listTechnicians);
router.get('/technicians/:id', getTechnician);
router.get('/technician/profile', authenticate, authorize('TECHNICIAN'), getMyProfile);
router.put('/technician/profile', authenticate, authorize('TECHNICIAN'), updateMyProfile);

export default router;