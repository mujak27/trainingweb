/*
  Warnings:

  - You are about to drop the column `userUserId` on the `Anime` table. All the data in the column will be lost.
  - Added the required column `userFavId` to the `Anime` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Anime" DROP CONSTRAINT "Anime_userUserId_fkey";

-- AlterTable
ALTER TABLE "Anime" DROP COLUMN "userUserId",
ADD COLUMN     "userFavId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Anime" ADD CONSTRAINT "Anime_userFavId_fkey" FOREIGN KEY ("userFavId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
