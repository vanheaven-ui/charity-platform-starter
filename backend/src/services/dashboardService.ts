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

export const getMonthlyDonations = async () => {
  return prisma.$queryRaw`
    SELECT
      strftime('%Y-%m', "createdAt") AS month,
      SUM(amount) AS totalAmount
    FROM "Donation"
    GROUP BY month
    ORDER BY month ASC;
  `;
};
