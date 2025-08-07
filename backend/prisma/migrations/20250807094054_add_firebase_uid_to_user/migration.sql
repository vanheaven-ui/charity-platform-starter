/*
  Warnings:

  - A unique constraint covering the columns `[firebaseuid]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "firebaseuid" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_firebaseuid_key" ON "public"."User"("firebaseuid");
