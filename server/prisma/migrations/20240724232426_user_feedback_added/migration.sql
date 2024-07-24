/*
  Warnings:

  - Added the required column `feeback` to the `Students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Students" ADD COLUMN     "feeback" TEXT NOT NULL;
