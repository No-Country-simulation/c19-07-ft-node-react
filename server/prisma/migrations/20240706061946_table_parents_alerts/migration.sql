/*
  Warnings:

  - A unique constraint covering the columns `[parentId]` on the table `Students` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Students" ADD COLUMN     "parentId" TEXT;

-- CreateTable
CREATE TABLE "Parents" (
    "parent_id" TEXT NOT NULL,
    "relation" TEXT NOT NULL,

    CONSTRAINT "Parents_pkey" PRIMARY KEY ("parent_id")
);

-- CreateTable
CREATE TABLE "Alerts" (
    "parent_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "typeAlert" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,

    CONSTRAINT "Alerts_pkey" PRIMARY KEY ("parent_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Students_parentId_key" ON "Students"("parentId");

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Parents"("parent_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alerts" ADD CONSTRAINT "Alerts_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Parents"("parent_id") ON DELETE RESTRICT ON UPDATE CASCADE;
