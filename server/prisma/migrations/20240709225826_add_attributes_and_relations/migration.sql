/*
  Warnings:

  - Added the required column `updatedAt` to the `Parents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Parents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Professors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Professors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Parents" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Professors" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Students" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parents" ADD CONSTRAINT "Parents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Professors" ADD CONSTRAINT "Professors_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
