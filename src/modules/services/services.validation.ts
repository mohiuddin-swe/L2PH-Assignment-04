import { z } from 'zod';

export const createServiceSchema = z.object({
  categoryId: z.string().min(1, 'categoryId is required'),
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().optional(),
  price: z.number().positive('Price must be greater than 0'),
});

export const updateServiceSchema = z.object({
  categoryId: z.string().optional(),
  title: z.string().min(2).optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
});