import { prisma } from '../../lib/prisma.js';

export const getMyAvailability = async (userId: string) => {
  const technicianProfile = await prisma.technicianProfile.findUnique({ where: { userId } });
  if (!technicianProfile) throw new Error('Technician profile not found');

  return prisma.technicianAvailability.findMany({
    where: { technicianProfileId: technicianProfile.id },
    orderBy: { dayOfWeek: 'asc' },
  });
};

export const getAvailabilityByTechnicianId = async (technicianProfileId: string) => {
  return prisma.technicianAvailability.findMany({
    where: { technicianProfileId },
    orderBy: { dayOfWeek: 'asc' },
  });
};

export const addAvailabilitySlot = async (
  userId: string,
  data: { dayOfWeek: number; startTime: string; endTime: string }
) => {
  const technicianProfile = await prisma.technicianProfile.findUnique({ where: { userId } });
  if (!technicianProfile) throw new Error('Technician profile not found');

  return prisma.technicianAvailability.create({
    data: {
      technicianProfileId: technicianProfile.id,
      dayOfWeek: data.dayOfWeek,
      startTime: data.startTime,
      endTime: data.endTime,
    },
  });
};

export const deleteAvailabilitySlot = async (userId: string, slotId: string) => {
  const technicianProfile = await prisma.technicianProfile.findUnique({ where: { userId } });
  if (!technicianProfile) throw new Error('Technician profile not found');

  const slot = await prisma.technicianAvailability.findUnique({ where: { id: slotId } });
  if (!slot) throw new Error('Availability slot not found');
  if (slot.technicianProfileId !== technicianProfile.id) throw new Error('Not authorized to delete this slot');

  return prisma.technicianAvailability.delete({ where: { id: slotId } });
};