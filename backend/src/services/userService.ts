import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const prisma = new PrismaClient();
const saltRounds = 10; // For password hashing
const jwtSecret = process.env.JWT_SECRET;

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

export const loginUser = async (email: string, password: string) => {
  if (!jwtSecret) {
    throw new Error(" JWT secret is not defined");
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error("invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    jwtSecret,
    { expiresIn: "1h" }
  );

  return token;
};
