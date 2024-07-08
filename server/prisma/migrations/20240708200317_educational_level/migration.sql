/*
  Warnings:

  - You are about to drop the column `nivel_educativo_id` on the `Professor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[educational_level_id]` on the table `Students` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `educational_level_id` to the `Professor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Professor" DROP COLUMN "nivel_educativo_id",
ADD COLUMN     "educational_level_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Students" ADD COLUMN     "educational_level_id" TEXT;

-- CreateTable
CREATE TABLE "Evaluations" (
    "evaluation_id" TEXT NOT NULL,
    "curso_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Evaluations_pkey" PRIMARY KEY ("evaluation_id")
);

-- CreateTable
CREATE TABLE "Evaluations_results" (
    "result_id" TEXT NOT NULL,
    "evaluation_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "mark" DOUBLE PRECISION NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "Evaluations_results_pkey" PRIMARY KEY ("result_id")
);

-- CreateTable
CREATE TABLE "Educational_level" (
    "level_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Educational_level_pkey" PRIMARY KEY ("level_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Students_educational_level_id_key" ON "Students"("educational_level_id");

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_educational_level_id_fkey" FOREIGN KEY ("educational_level_id") REFERENCES "Educational_level"("level_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Professor" ADD CONSTRAINT "Professor_educational_level_id_fkey" FOREIGN KEY ("educational_level_id") REFERENCES "Educational_level"("level_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluations" ADD CONSTRAINT "Evaluations_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "Cursos"("cursos_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluations_results" ADD CONSTRAINT "Evaluations_results_evaluation_id_fkey" FOREIGN KEY ("evaluation_id") REFERENCES "Evaluations"("evaluation_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluations_results" ADD CONSTRAINT "Evaluations_results_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Students"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;
