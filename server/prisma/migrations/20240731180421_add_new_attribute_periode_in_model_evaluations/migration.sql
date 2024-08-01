-- CreateEnum
CREATE TYPE "type_periodo_evaluation" AS ENUM ('PRIMER_PERIODO', 'SEGUNDO_PERIODO', 'TERCER_PERIODO', 'CUARTO_PERIODO');

-- AlterTable
ALTER TABLE "Evaluations" ADD COLUMN     "periodo" "type_periodo_evaluation";
