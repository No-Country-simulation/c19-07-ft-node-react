/*
  Warnings:

  - You are about to drop the `Educational_level` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Evaluations_results` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Evaluations_results" DROP CONSTRAINT "Evaluations_results_evaluation_id_fkey";

-- DropForeignKey
ALTER TABLE "Evaluations_results" DROP CONSTRAINT "Evaluations_results_student_id_fkey";

-- DropForeignKey
ALTER TABLE "Professor" DROP CONSTRAINT "Professor_educational_level_id_fkey";

-- DropForeignKey
ALTER TABLE "Students" DROP CONSTRAINT "Students_educational_level_id_fkey";

-- DropTable
DROP TABLE "Educational_level";

-- DropTable
DROP TABLE "Evaluations_results";

-- CreateTable
CREATE TABLE "Evaluation_results" (
    "result_id" TEXT NOT NULL,
    "evaluation_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "mark" DOUBLE PRECISION NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "Evaluation_results_pkey" PRIMARY KEY ("result_id")
);

-- CreateTable
CREATE TABLE "Educational_levels" (
    "level_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Educational_levels_pkey" PRIMARY KEY ("level_id")
);

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_educational_level_id_fkey" FOREIGN KEY ("educational_level_id") REFERENCES "Educational_levels"("level_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Professor" ADD CONSTRAINT "Professor_educational_level_id_fkey" FOREIGN KEY ("educational_level_id") REFERENCES "Educational_levels"("level_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluation_results" ADD CONSTRAINT "Evaluation_results_evaluation_id_fkey" FOREIGN KEY ("evaluation_id") REFERENCES "Evaluations"("evaluation_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluation_results" ADD CONSTRAINT "Evaluation_results_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Students"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;
