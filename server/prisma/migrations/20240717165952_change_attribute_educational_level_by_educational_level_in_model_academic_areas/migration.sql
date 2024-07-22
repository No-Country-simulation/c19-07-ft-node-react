/*
  Warnings:

  - You are about to drop the column `educationalLevel` on the `Academic_areas` table. All the data in the column will be lost.
  - Added the required column `educational_level` to the `Academic_areas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Academic_areas" DROP COLUMN "educationalLevel",
ADD COLUMN     "educational_level" TEXT NOT NULL;
