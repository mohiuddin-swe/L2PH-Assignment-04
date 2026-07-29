import { prisma } from '../../lib/prisma.js';
import { hashPassword, comparePassword } from '../../utils/hash.js';
import { generateToken } from '../../utils/jwt.js';

export const registerUser = async (name: string, email: string, password: string, role: string) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('Email already registered');
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword, role: role as any },
  });

  if (role === 'TECHNICIAN') {
    await prisma.technicianProfile.create({
      data: { userId: user.id, skills: [], experience: 0, pricing: 0 },
    });
  }

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid credentials');
  if (user.status === 'BANNED') throw new Error('Your account has been banned');

  const isValid = await comparePassword(password, user.password);
  if (!isValid) throw new Error('Invalid credentials');

  const token = generateToken({ userId: user.id, role: user.role });
  const { password: _, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, token };
};

export const getUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { technicianProfile: true },
  });
  if (!user) throw new Error('User not found');

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};