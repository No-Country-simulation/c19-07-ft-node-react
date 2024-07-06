/*
  Warnings:

  - Changed the type of `type_user` on the `Users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "type_user" AS ENUM ('ADMIN', 'PROFESSOR', 'STUDENT', 'PARENTS');

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "type_user",
ADD COLUMN     "type_user" "type_user" NOT NULL;

-- CreateTable
CREATE TABLE "Students" (
    "student_id" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("student_id")
);

-- CreateTable
CREATE TABLE "Messages" (
    "message_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("message_id")
);
