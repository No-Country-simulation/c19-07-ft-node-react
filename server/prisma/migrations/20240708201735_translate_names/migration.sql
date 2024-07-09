/*
  Warnings:

  - You are about to drop the `Areas_academicas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Cursos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Professor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Academic_records" DROP CONSTRAINT "Academic_records_curso_id_fkey";

-- DropForeignKey
ALTER TABLE "Cursos" DROP CONSTRAINT "Cursos_area_academica_id_fkey";

-- DropForeignKey
ALTER TABLE "Evaluations" DROP CONSTRAINT "Evaluations_curso_id_fkey";

-- DropForeignKey
ALTER TABLE "Professor" DROP CONSTRAINT "Professor_area_academica_id_fkey";

-- DropForeignKey
ALTER TABLE "Professor" DROP CONSTRAINT "Professor_educational_level_id_fkey";

-- DropTable
DROP TABLE "Areas_academicas";

-- DropTable
DROP TABLE "Cursos";

-- DropTable
DROP TABLE "Professor";

-- CreateTable
CREATE TABLE "Professors" (
    "professor_id" TEXT NOT NULL,
    "area_academica_id" TEXT NOT NULL,
    "fecha_contratacion" TEXT NOT NULL,
    "estado_empleado" TEXT NOT NULL,
    "educational_level_id" TEXT NOT NULL,

    CONSTRAINT "Professors_pkey" PRIMARY KEY ("professor_id")
);

-- CreateTable
CREATE TABLE "Academic_areas" (
    "area_academica_id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "nivel_educativo" TEXT NOT NULL,

    CONSTRAINT "Academic_areas_pkey" PRIMARY KEY ("area_academica_id")
);

-- CreateTable
CREATE TABLE "Courses" (
    "cursos_id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "professor_id" TEXT NOT NULL,
    "area_academica_id" TEXT NOT NULL,

    CONSTRAINT "Courses_pkey" PRIMARY KEY ("cursos_id")
);

-- AddForeignKey
ALTER TABLE "Professors" ADD CONSTRAINT "Professors_educational_level_id_fkey" FOREIGN KEY ("educational_level_id") REFERENCES "Educational_levels"("level_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Professors" ADD CONSTRAINT "Professors_area_academica_id_fkey" FOREIGN KEY ("area_academica_id") REFERENCES "Academic_areas"("area_academica_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_area_academica_id_fkey" FOREIGN KEY ("area_academica_id") REFERENCES "Academic_areas"("area_academica_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Academic_records" ADD CONSTRAINT "Academic_records_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "Courses"("cursos_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluations" ADD CONSTRAINT "Evaluations_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "Courses"("cursos_id") ON DELETE RESTRICT ON UPDATE CASCADE;
