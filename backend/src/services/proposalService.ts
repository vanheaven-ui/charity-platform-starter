// src/services/proposalService.ts
import { PrismaClient, ProposalStatus, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const createProposal = async (
  data: Prisma.PartnerProposalCreateInput
) => {
  return prisma.partnerProposal.create({
    data,
  });
};

export const getProposalsByPartner = async (partnerId: number) => {
  return prisma.partnerProposal.findMany({
    where: { partnerId },
  });
};

export const getAllProposals = async () => {
  return prisma.partnerProposal.findMany({
    include: { partner: true }, // Include partner details
  });
};

export const updateProposalStatus = async (
  proposalId: number,
  status: ProposalStatus
) => {
  return prisma.partnerProposal.update({
    where: { id: proposalId },
    data: { status },
  });
};
