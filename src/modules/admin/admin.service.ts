import { prisma } from '../../lib/prisma';

export const getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });
};

export const updateUserStatus = async (userId: string, status: 'ACTIVE' | 'BANNED') => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error('User not found');

  return prisma.user.update({
    where: { id: userId },
    data: { status },
    select: { id: true, name: true, email: true, role: true, status: true },
  });
};

export const getAllBookings = async () => {
  return prisma.booking.findMany({
    include: {
      customer: { select: { id: true, name: true, email: true } },
      technicianProfile: { include: { user: { select: { name: true, email: true } } } },
      service: true,
      payment: true,
    },
    orderBy: { createdAt: 'desc' },
  });
};