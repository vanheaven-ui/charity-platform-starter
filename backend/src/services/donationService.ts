import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const createDonation = async (
  donationData: { amount: number; message?: string },
  donorId: number,
  projectId: number
) => {
  // Use a transaction to ensure both donation creation and project update happen together
  return prisma.$transaction(async (tx) => {
    const donation = await tx.donation.create({
      data: {
        amount: donationData.amount,
        message: donationData.message,
        donor: { connect: { id: donorId } },
        project: { connect: { id: projectId } },
      },
    });

    // Update the raised amount on the project
    await tx.project.update({
      where: { id: projectId },
      data: { raised: { increment: donation.amount } },
    });

    return donation;
  });
};

export const getDonations = async (donorId: number) => {
  return prisma.donation.findMany({
    where: { donorId },
    include: { project: true },
  });
};
