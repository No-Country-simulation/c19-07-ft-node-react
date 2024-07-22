/*
  Warnings:

  - You are about to drop the column `state` on the `Messages` table. All the data in the column will be lost.
  - The required column `roomId` was added to the `Messages` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `userReceiveId` to the `Messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userSendID` to the `Messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Evaluations" ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Messages" DROP COLUMN "state",
ADD COLUMN     "roomId" TEXT NOT NULL,
ADD COLUMN     "userReceiveId" TEXT NOT NULL,
ADD COLUMN     "userSendID" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_CoursesToStudents" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CoursesToStudents_AB_unique" ON "_CoursesToStudents"("A", "B");

-- CreateIndex
CREATE INDEX "_CoursesToStudents_B_index" ON "_CoursesToStudents"("B");

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_userSendID_fkey" FOREIGN KEY ("userSendID") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_userReceiveId_fkey" FOREIGN KEY ("userReceiveId") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoursesToStudents" ADD CONSTRAINT "_CoursesToStudents_A_fkey" FOREIGN KEY ("A") REFERENCES "Courses"("cursos_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoursesToStudents" ADD CONSTRAINT "_CoursesToStudents_B_fkey" FOREIGN KEY ("B") REFERENCES "Students"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;
