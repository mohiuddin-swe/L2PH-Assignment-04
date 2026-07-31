import { z } from 'zod';

export const createBookingSchema = z.object({
  serviceId: z.string().min(1, 'serviceId is required'),
  scheduledAt: z.string().min(1, 'scheduledAt is required'),
});

export const updateBookingStatusSchema = z.object({
  status: z.enum(['ACCEPTED', 'DECLINED', 'IN_PROGRESS', 'COMPLETED'], {
    message: 'Invalid status value',
  }),
});