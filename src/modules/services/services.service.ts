import { prisma } from '../../lib/prisma';

export const createService = async (
  technicianUserId: string,
  data: { categoryId: string; title: string; description?: string; price: number }
) => {
  const technicianProfile = await prisma.technicianProfile.findUnique({
    where: { userId: technicianUserId },
  });
  if (!technicianProfile) throw new Error('Technician profile not found');

  const category = await prisma.category.findUnique({ where: { id: data.categoryId } });
  if (!category) throw new Error('Category not found');

  return prisma.service.create({
    data: {
      technicianProfileId: technicianProfile.id,
      categoryId: data.categoryId,
      title: data.title,
      description: data.description,
      price: data.price,
    },
  });
};

export const getAllServices = async (filters: { category?: string; location?: string; minPrice?: number; maxPrice?: number }) => {
  const { category, location, minPrice, maxPrice } = filters;

  return prisma.service.findMany({
    where: {
      ...(category && { category: { name: { equals: category, mode: 'insensitive' } } }),
      ...(location && { technicianProfile: { location: { contains: location, mode: 'insensitive' } } }),
      ...(minPrice !== undefined && { price: { gte: minPrice } }),
      ...(maxPrice !== undefined && { price: { lte: maxPrice } }),
    },
    include: {
      category: true,
      technicianProfile: { include: { user: { select: { id: true, name: true } } } },
    },
  });
};

export const updateService = async (serviceId: string, technicianUserId: string, data: Partial<{ title: string; description: string; price: number; categoryId: string }>) => {
  const technicianProfile = await prisma.technicianProfile.findUnique({ where: { userId: technicianUserId } });
  if (!technicianProfile) throw new Error('Technician profile not found');

  const service = await prisma.service.findUnique({ where: { id: serviceId } });
  if (!service) throw new Error('Service not found');
  if (service.technicianProfileId !== technicianProfile.id) throw new Error('Not authorized to update this service');

  return prisma.service.update({ where: { id: serviceId }, data });
};