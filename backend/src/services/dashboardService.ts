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
  // Corrected raw query for PostgreSQL
  return prisma.$queryRaw`
    SELECT
      to_char("createdAt", 'YYYY-MM') AS month,
      CAST(SUM(amount) AS REAL) AS "totalAmount"
    FROM "Donation"
    GROUP BY month
    ORDER BY month ASC;
  `;
};
