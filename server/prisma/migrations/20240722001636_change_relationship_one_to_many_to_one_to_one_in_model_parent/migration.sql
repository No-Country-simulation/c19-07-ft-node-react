/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Parents` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Parents_user_id_key" ON "Parents"("user_id");
