-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Anime" (
    "animeId" TEXT NOT NULL,
    "animeName" TEXT NOT NULL,
    "userUserId" TEXT NOT NULL,

    CONSTRAINT "Anime_pkey" PRIMARY KEY ("animeId")
);

-- AddForeignKey
ALTER TABLE "Anime" ADD CONSTRAINT "Anime_userUserId_fkey" FOREIGN KEY ("userUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
