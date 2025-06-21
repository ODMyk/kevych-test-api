-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "TrainType" AS ENUM ('PASSENGER', 'FREIGHT', 'HIGH_SPEED', 'SUBURBAN', 'INTERCITY');

-- CreateEnum
CREATE TYPE "City" AS ENUM ('KYIV', 'LVIV', 'DNIPRO', 'ODESA', 'KHARKIV', 'ZAPORIZHZHIA', 'POLTAVA', 'CHERKASY', 'VINNYTSIA', 'CHERNIVTSI', 'TERNOPIL', 'UZHHOROD', 'KRYVYI_RIH', 'MARIUPOL', 'SUMY', 'RIVNE', 'KHERSON', 'MYKOLAIV', 'ZHYTOMYR', 'LUHANSK', 'DONETSK');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roles" "UserRole"[] DEFAULT ARRAY['USER']::"UserRole"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL,
    "trainNumber" TEXT NOT NULL,
    "routeName" TEXT NOT NULL,
    "origin" "City" NOT NULL,
    "destination" "City" NOT NULL,
    "departureTime" TIMESTAMP(3) NOT NULL,
    "arrivalTime" TIMESTAMP(3) NOT NULL,
    "additionalStops" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "trainType" "TrainType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "scheduleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_userId_scheduleId_key" ON "Favorite"("userId", "scheduleId");

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
