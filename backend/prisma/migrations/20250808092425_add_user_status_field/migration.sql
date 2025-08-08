/*
  Warnings:

  - The `status` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."UserStatus" AS ENUM ('PENDING', 'ACTIVE', 'SUSPENDED');

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "status",
ADD COLUMN     "status" "public"."UserStatus" NOT NULL DEFAULT 'ACTIVE';
