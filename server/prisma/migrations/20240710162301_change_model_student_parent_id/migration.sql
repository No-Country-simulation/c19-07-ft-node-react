/*
  Warnings:

  - Made the column `parentId` on table `Students` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Students" DROP CONSTRAINT "Students_parentId_fkey";

-- AlterTable
ALTER TABLE "Students" ALTER COLUMN "parentId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Parents"("parent_id") ON DELETE RESTRICT ON UPDATE CASCADE;
