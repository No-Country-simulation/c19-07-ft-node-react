-- AlterTable
ALTER TABLE "Parents" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Professors" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Students" ADD COLUMN     "deletedAt" TIMESTAMP(3);
