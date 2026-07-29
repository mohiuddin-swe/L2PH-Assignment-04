import { prisma } from '../../lib/prisma';

export const createBooking = async (
  customerId: string,
  data: { serviceId: string; scheduledAt: string }
) => {
  const service = await prisma.service.findUnique({
    where: { id: data.serviceId },
    include: { technicianProfile: true },
  });
  if (!service) throw new Error('Service not found');

  return prisma.booking.create({
    data: {
      customerId,
      technicianProfileId: service.technicianProfileId,
      serviceId: data.serviceId,
      scheduledAt: new Date(data.scheduledAt),
      status: 'REQUESTED',
    },
  });
};

export const getUserBookings = async (userId: string, role: string) => {
  if (role === 'CUSTOMER') {
    return prisma.booking.findMany({
      where: { customerId: userId },
      include: { service: true, technicianProfile: { include: { user: { select: { name: true } } } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  if (role === 'TECHNICIAN') {
    const technicianProfile = await prisma.technicianProfile.findUnique({ where: { userId } });
    if (!technicianProfile) throw new Error('Technician profile not found');

    return prisma.booking.findMany({
      where: { technicianProfileId: technicianProfile.id },
      include: { service: true, customer: { select: { name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  throw new Error('Invalid role for fetching bookings');
};

export const getBookingById = async (bookingId: string) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      service: true,
      customer: { select: { id: true, name: true, email: true } },
      technicianProfile: { include: { user: { select: { name: true, email: true } } } },
      payment: true,
    },
  });
  if (!booking) throw new Error('Booking not found');
  return booking;
};

const VALID_TRANSITIONS: Record<string, string[]> = {
  REQUESTED: ['ACCEPTED', 'DECLINED'],
  ACCEPTED: ['PAID', 'CANCELLED'],
  PAID: ['IN_PROGRESS', 'CANCELLED'],
  IN_PROGRESS: ['COMPLETED'],
};

export const updateBookingStatus = async (
  bookingId: string,
  technicianUserId: string,
  newStatus: string
) => {
  const technicianProfile = await prisma.technicianProfile.findUnique({ where: { userId: technicianUserId } });
  if (!technicianProfile) throw new Error('Technician profile not found');

  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (!booking) throw new Error('Booking not found');
  if (booking.technicianProfileId !== technicianProfile.id) throw new Error('Not authorized for this booking');

  const allowed = VALID_TRANSITIONS[booking.status] || [];
  if (!allowed.includes(newStatus)) {
    throw new Error(`Cannot change status from ${booking.status} to ${newStatus}`);
  }

  return prisma.booking.update({ where: { id: bookingId }, data: { status: newStatus as any } });
};

export const cancelBooking = async (bookingId: string, customerId: string) => {
  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (!booking) throw new Error('Booking not found');
  if (booking.customerId !== customerId) throw new Error('Not authorized to cancel this booking');

  if (['IN_PROGRESS', 'COMPLETED', 'CANCELLED'].includes(booking.status)) {
    throw new Error(`Cannot cancel a booking that is already ${booking.status}`);
  }

  return prisma.booking.update({ where: { id: bookingId }, data: { status: 'CANCELLED' } });
};