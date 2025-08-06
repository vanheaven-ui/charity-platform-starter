-- CreateEnum
CREATE TYPE "public"."ProposalStatus" AS ENUM ('Pending', 'Approved', 'Rejected');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "deviceToken" TEXT;

-- CreateTable
CREATE TABLE "public"."PartnerProposal" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "public"."ProposalStatus" NOT NULL DEFAULT 'Pending',
    "partnerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PartnerProposal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."PartnerProposal" ADD CONSTRAINT "PartnerProposal_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
