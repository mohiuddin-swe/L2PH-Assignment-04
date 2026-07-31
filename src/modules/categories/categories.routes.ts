import { Router } from 'express';
import { addCategory, listCategories } from './categories.controller.js';
import { authenticate, authorize } from '../../middlewares/auth.middleware.js';
import { validate } from '../../utils/validate.js';
import { createCategorySchema } from './categories.validation.js';

const router = Router();

router.get('/categories', listCategories);
router.post('/admin/categories', authenticate, authorize('ADMIN'), validate(createCategorySchema), addCategory);

export default router;