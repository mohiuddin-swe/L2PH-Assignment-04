import { z } from 'zod';

export const addAvailabilitySchema = z.object({
  dayOfWeek: z.number().min(0, { message: 'dayOfWeek must be 0-6' }).max(6, { message: 'dayOfWeek must be 0-6' }),
  startTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, { message: 'startTime must be HH:MM format' }),
  endTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, { message: 'endTime must be HH:MM format' }),
});