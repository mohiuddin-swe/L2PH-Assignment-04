import { Request, Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.middleware';
import {
  getTechnicianProfile,
  updateTechnicianProfile,
  getAllTechnicians,
  getTechnicianById,
} from './user.service';

export const getMyProfile = async (req: AuthRequest, res: Response) => {
  try {
    const profile = await getTechnicianProfile(req.user!.userId);
    return res.status(200).json({ success: true, data: profile });
  } catch (error) {
    return res.status(404).json({ success: false, message: (error as Error).message });
  }
};

export const updateMyProfile = async (req: AuthRequest, res: Response) => {
  try {
    const updated = await updateTechnicianProfile(req.user!.userId, req.body);
    return res.status(200).json({ success: true, message: 'Profile updated', data: updated });
  } catch (error) {
    return res.status(400).json({ success: false, message: (error as Error).message });
  }
};

export const listTechnicians = async (req: Request, res: Response) => {
  try {
    const { location, category } = req.query;
    const technicians = await getAllTechnicians({
      location: location as string,
      category: category as string,
    });
    return res.status(200).json({ success: true, data: technicians });
  } catch (error) {
    return res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export const getTechnician = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!id) {
      return res.status(400).json({ success: false, message: 'Technician id is required' });
    }

    const technician = await getTechnicianById(id);
    return res.status(200).json({ success: true, data: technician });
  } catch (error) {
    return res.status(404).json({ success: false, message: (error as Error).message });
  }
};