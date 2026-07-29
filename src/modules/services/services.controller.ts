import { Request, Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.middleware.js';
import { createService, getAllServices, updateService } from './services.service.js';

export const addService = async (req: AuthRequest, res: Response) => {
  try {
    const { categoryId, title, description, price } = req.body || {};
    if (!categoryId || !title || price === undefined) {
      return res.status(400).json({ success: false, message: 'categoryId, title, and price are required' });
    }

    const service = await createService(req.user!.userId, { categoryId, title, description, price });
    return res.status(201).json({ success: true, message: 'Service created', data: service });
  } catch (error) {
    return res.status(400).json({ success: false, message: (error as Error).message });
  }
};

export const listServices = async (req: Request, res: Response) => {
  try {
    const { category, location, minPrice, maxPrice } = req.query;
    const services = await getAllServices({
      category: category as string,
      location: location as string,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });
    return res.status(200).json({ success: true, data: services });
  } catch (error) {
    return res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const editService = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    if (!id) return res.status(400).json({ success: false, message: 'Service id is required' });

    const updated = await updateService(id, req.user!.userId, req.body);
    return res.status(200).json({ success: true, message: 'Service updated', data: updated });
  } catch (error) {
    return res.status(400).json({ success: false, message: (error as Error).message });
  }
};