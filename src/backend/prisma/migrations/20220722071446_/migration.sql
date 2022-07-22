/*
  Warnings:

  - The primary key for the `animeFavorite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[animeFavoriteId]` on the table `animeFavorite` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userAdmin" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "animeFavorite" DROP CONSTRAINT "animeFavorite_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "animeFavorite_animeFavoriteId_key" ON "animeFavorite"("animeFavoriteId");

-- CreateIndex
CREATE INDEX "animeFavorite_animeAnimeId_userUserId_animeFavoriteId_idx" ON "animeFavorite"("animeAnimeId", "userUserId", "animeFavoriteId");
