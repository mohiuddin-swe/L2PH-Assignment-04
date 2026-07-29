import { Router } from 'express';
import { addService, listServices, editService } from './services.controller.js';
import { authenticate, authorize } from '../../middlewares/auth.middleware.js';

const router = Router();

router.get('/services', listServices);
router.post('/services', authenticate, authorize('TECHNICIAN'), addService);
router.put('/services/:id', authenticate, authorize('TECHNICIAN'), editService);

export default router;