import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDonationsByProject = async () => {
  return prisma.donation.groupBy({
    by: ["projectId"],
    _sum: {
      amount: true,
    },
    orderBy: {
      _sum: {
        amount: "desc",
      },
    },
  });
};
