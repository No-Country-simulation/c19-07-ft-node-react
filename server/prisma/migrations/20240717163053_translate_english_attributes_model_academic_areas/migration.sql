/*
  Warnings:

  - The primary key for the `Academic_areas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `area_academica_id` on the `Academic_areas` table. All the data in the column will be lost.
  - You are about to drop the column `descripcion` on the `Academic_areas` table. All the data in the column will be lost.
  - You are about to drop the column `nivel_educativo` on the `Academic_areas` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `Academic_areas` table. All the data in the column will be lost.
  - The required column `academicAreaId` was added to the `Academic_areas` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `description` to the `Academic_areas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `educationalLevel` to the `Academic_areas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Academic_areas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Academic_areas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Courses" DROP CONSTRAINT "Courses_area_academica_id_fkey";

-- DropForeignKey
ALTER TABLE "Professors" DROP CONSTRAINT "Professors_area_academica_id_fkey";

-- AlterTable
ALTER TABLE "Academic_areas" DROP CONSTRAINT "Academic_areas_pkey",
DROP COLUMN "area_academica_id",
DROP COLUMN "descripcion",
DROP COLUMN "nivel_educativo",
DROP COLUMN "nombre",
ADD COLUMN     "academicAreaId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "educationalLevel" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Academic_areas_pkey" PRIMARY KEY ("academicAreaId");

-- AddForeignKey
ALTER TABLE "Professors" ADD CONSTRAINT "Professors_area_academica_id_fkey" FOREIGN KEY ("area_academica_id") REFERENCES "Academic_areas"("academicAreaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_area_academica_id_fkey" FOREIGN KEY ("area_academica_id") REFERENCES "Academic_areas"("academicAreaId") ON DELETE RESTRICT ON UPDATE CASCADE;
