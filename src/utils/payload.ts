import { User } from '@prisma/client';

export const generatePayload = async (user: User) => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    avatar: user.avatar,
  };
};
