/*
  Warnings:

  - You are about to drop the column `userFavId` on the `Anime` table. All the data in the column will be lost.
  - Added the required column `animeGenre` to the `Anime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `animeImageLink` to the `Anime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `animeReleaseDate` to the `Anime` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AnimeGenre" AS ENUM ('Romance', 'Drama', 'Action', 'Comedy', 'Horror', 'Fantasy');

-- DropForeignKey
ALTER TABLE "Anime" DROP CONSTRAINT "Anime_userFavId_fkey";

-- AlterTable
ALTER TABLE "Anime" DROP COLUMN "userFavId",
ADD COLUMN     "animeGenre" "AnimeGenre" NOT NULL,
ADD COLUMN     "animeImageLink" TEXT NOT NULL,
ADD COLUMN     "animeReleaseDate" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "animeFavorite" (
    "animeFavoriteId" TEXT NOT NULL,
    "animeAnimeId" TEXT,
    "userUserId" TEXT NOT NULL,

    CONSTRAINT "animeFavorite_pkey" PRIMARY KEY ("animeFavoriteId")
);

-- AddForeignKey
ALTER TABLE "animeFavorite" ADD CONSTRAINT "animeFavorite_userUserId_fkey" FOREIGN KEY ("userUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animeFavorite" ADD CONSTRAINT "animeFavorite_animeAnimeId_fkey" FOREIGN KEY ("animeAnimeId") REFERENCES "Anime"("animeId") ON DELETE SET NULL ON UPDATE CASCADE;
