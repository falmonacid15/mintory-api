import { Category } from '@prisma/client';

export const DEFAULT_CATEGORIES: Omit<
  Category,
  'id' | 'createdAt' | 'updatedAt' | 'userId'
>[] = [
  { name: 'Alimentación', icon: '🍔', color: '#FF6384', type: 'EXPENSE' },
  { name: 'Transporte', icon: '🚌', color: '#36A2EB', type: 'EXPENSE' },
  { name: 'Salud', icon: '💊', color: '#FFCE56', type: 'EXPENSE' },
  { name: 'Entretenimiento', icon: '🎮', color: '#4BC0C0', type: 'EXPENSE' },
  { name: 'Compras', icon: '🛍️', color: '#4BC0C0', type: 'EXPENSE' },
  { name: 'Servicios', icon: '⚡', color: '#FF6384', type: 'EXPENSE' },

  { name: 'Salary', icon: '💼', color: '#4BC0C0', type: 'INCOME' },
  { name: 'Freelance', icon: '💻', color: '#FFCE56', type: 'INCOME' },
  { name: 'Inversiones', icon: '📈', color: '#FF6384', type: 'INCOME' },
  { name: 'Otros', icon: '💰', color: '#4BC0C0', type: 'INCOME' },
];
