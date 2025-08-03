import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const saltRounds = 10; // For password hashing

export const registerUser = async (userData: Prisma.UserCreateInput) => {
  const { password, ...rest } = userData;

  if (!password) {
    throw new Error("Password is required");
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = await prisma.user.create({
    data: {
      ...rest,
      password: hashedPassword,
    },
  });

  return newUser;
};
