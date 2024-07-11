/*
  Warnings:

  - Changed the type of `state` on the `Users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "type_state" AS ENUM ('ACTIVE', 'SUSPENDED', 'INACTIVE');

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "state",
ADD COLUMN     "state" "type_state" NOT NULL;
