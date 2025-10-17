/*
  Warnings:

  - You are about to drop the column `session_state` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "session_state";

-- CreateTable
CREATE TABLE "AuthState" (
    "id" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthState_pkey" PRIMARY KEY ("id")
);
