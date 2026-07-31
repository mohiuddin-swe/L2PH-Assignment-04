import { Router } from 'express';
import { addService, listServices, editService } from './services.controller.js';
import { authenticate, authorize } from '../../middlewares/auth.middleware.js';
import { validate } from '../../utils/validate.js';
import { createServiceSchema, updateServiceSchema } from './services.validation.js';

const router = Router();

router.get('/services', listServices);
router.post('/services', authenticate, authorize('TECHNICIAN'), validate(createServiceSchema), addService);
router.put('/services/:id', authenticate, authorize('TECHNICIAN'), validate(updateServiceSchema), editService);

export default router;