import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

export const getUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      preferredLanguage: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const updateUserProfile = async (
  userId: number,
  updateData: Prisma.UserUpdateInput
) => {
  // Hash password if it's included in the update data
  if (updateData.password && typeof updateData.password === "string") {
    const salt = await bcrypt.genSalt(10);
    updateData.password = await bcrypt.hash(updateData.password, salt);
  }

  return prisma.user.update({
    where: { id: userId },
    data: updateData,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      preferredLanguage: true,
    },
  });
};
