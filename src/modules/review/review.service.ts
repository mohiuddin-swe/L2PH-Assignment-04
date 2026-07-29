import { prisma } from '../../lib/prisma.js';

export const createReview = async (
  customerId: string,
  data: { bookingId: string; rating: number; comment?: string }
) => {
  const booking = await prisma.booking.findUnique({ where: { id: data.bookingId } });
  if (!booking) throw new Error('Booking not found');
  if (booking.customerId !== customerId) throw new Error('Not authorized to review this booking');
  if (booking.status !== 'COMPLETED') throw new Error('Can only review after job completion');

  const existingReview = await prisma.review.findUnique({ where: { bookingId: data.bookingId } });
  if (existingReview) throw new Error('Review already submitted for this booking');

  if (data.rating < 1 || data.rating > 5) throw new Error('Rating must be between 1 and 5');

  return prisma.review.create({
    data: {
      bookingId: data.bookingId,
      customerId,
      rating: data.rating,
      comment: data.comment,
    },
  });
};