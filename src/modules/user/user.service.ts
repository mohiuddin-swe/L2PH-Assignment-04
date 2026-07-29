import { prisma } from '../../lib/prisma';

export const getTechnicianProfile = async (userId: string) => {
  const profile = await prisma.technicianProfile.findUnique({
    where: { userId },
    include: { user: { select: { id: true, name: true, email: true } } },
  });
  if (!profile) throw new Error('Technician profile not found');
  return profile;
};

export const updateTechnicianProfile = async (
  userId: string,
  data: { skills?: string[]; experience?: number; bio?: string; pricing?: number; location?: string }
) => {
  const profile = await prisma.technicianProfile.findUnique({ where: { userId } });
  if (!profile) throw new Error('Technician profile not found');

  const updated = await prisma.technicianProfile.update({
    where: { userId },
    data,
  });
  return updated;
};

export const getAllTechnicians = async (filters: { location?: string; category?: string }) => {
  const { location, category } = filters;

  const technicians = await prisma.technicianProfile.findMany({
    where: {
      ...(location && { location: { contains: location, mode: 'insensitive' } }),
      ...(category && {
        services: { some: { category: { name: { equals: category, mode: 'insensitive' } } } },
      }),
    },
    include: {
      user: { select: { id: true, name: true, email: true } },
      services: true,
    },
  });

  return technicians;
};

export const getTechnicianById = async (technicianProfileId: string) => {
  const technician = await prisma.technicianProfile.findUnique({
    where: { id: technicianProfileId },
    include: {
      user: { select: { id: true, name: true, email: true } },
      services: { include: { category: true } },
    },
  });
  if (!technician) throw new Error('Technician not found');

  const reviews = await prisma.review.findMany({
    where: { booking: { technicianProfileId } },
    include: { customer: { select: { id: true, name: true } } },
  });

  const avgRating =
    reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

  return { ...technician, reviews, avgRating };
};