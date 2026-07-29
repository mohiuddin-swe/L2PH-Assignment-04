import { Request, Response } from 'express';
import { createCategory, getAllCategories } from './categories.service';

export const addCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Category name is required' });

    const category = await createCategory(name);
    return res.status(201).json({ success: true, message: 'Category created', data: category });
  } catch (error) {
    return res.status(400).json({ success: false, message: (error as Error).message });
  }
};

export const listCategories = async (req: Request, res: Response) => {
  try {
    const categories = await getAllCategories();
    return res.status(200).json({ success: true, data: categories });
  } catch (error) {
    return res.status(500).json({ success: false, message: (error as Error).message });
  }
};