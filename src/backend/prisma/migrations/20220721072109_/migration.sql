/*
  Warnings:

  - Changed the type of `animeGenre` on the `Anime` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `userPassword` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `animeAnimeId` on table `animeFavorite` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "animeFavorite" DROP CONSTRAINT "animeFavorite_animeAnimeId_fkey";

-- DropForeignKey
ALTER TABLE "animeFavorite" DROP CONSTRAINT "animeFavorite_userUserId_fkey";

-- AlterTable
ALTER TABLE "Anime" DROP COLUMN "animeGenre",
ADD COLUMN     "animeGenre" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userPassword" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "animeFavorite" ALTER COLUMN "animeAnimeId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "animeFavorite" ADD CONSTRAINT "animeFavorite_userUserId_fkey" FOREIGN KEY ("userUserId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animeFavorite" ADD CONSTRAINT "animeFavorite_animeAnimeId_fkey" FOREIGN KEY ("animeAnimeId") REFERENCES "Anime"("animeId") ON DELETE CASCADE ON UPDATE CASCADE;
