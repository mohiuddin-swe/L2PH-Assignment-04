import { Router } from 'express';
import { addCategory, listCategories } from './categories.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/categories', listCategories);
router.post('/admin/categories', authenticate, authorize('ADMIN'), addCategory);

export default router;