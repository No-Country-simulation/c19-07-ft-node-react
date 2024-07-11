/*
  Warnings:

  - Made the column `educational_level_id` on table `Students` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Students" DROP CONSTRAINT "Students_educational_level_id_fkey";

-- DropIndex
DROP INDEX "Students_educational_level_id_key";

-- AlterTable
ALTER TABLE "Students" ALTER COLUMN "educational_level_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_educational_level_id_fkey" FOREIGN KEY ("educational_level_id") REFERENCES "Educational_levels"("level_id") ON DELETE RESTRICT ON UPDATE CASCADE;
