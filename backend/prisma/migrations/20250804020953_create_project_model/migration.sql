-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('Active', 'Completed', 'Cancelled');

-- CreateTable
CREATE TABLE "public"."Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "goal" INTEGER NOT NULL,
    "raised" INTEGER NOT NULL DEFAULT 0,
    "status" "public"."Status" NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_name_key" ON "public"."Project"("name");
