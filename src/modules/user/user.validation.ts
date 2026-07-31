import { z } from 'zod';

export const updateProfileSchema = z.object({
  skills: z.array(z.string()).optional(),
  experience: z.number().min(0, 'Experience must be 0 or more').optional(),
  bio: z.string().optional(),
  pricing: z.number().min(0, 'Pricing must be 0 or more').optional(),
  location: z.string().optional(),
});