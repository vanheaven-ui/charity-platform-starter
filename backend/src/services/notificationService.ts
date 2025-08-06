import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const registerDeviceToken = async (userId: number, token: string) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { deviceToken: token },
    });
    return updatedUser;
  } catch (error) {
    console.error("Error in notificationService.registerDeviceToken:", error);
    throw new Error("Failed to register device token");
  }
};
