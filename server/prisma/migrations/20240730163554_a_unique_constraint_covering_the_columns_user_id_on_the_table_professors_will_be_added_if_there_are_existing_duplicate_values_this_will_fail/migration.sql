/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Professors` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Professors_user_id_key" ON "Professors"("user_id");
