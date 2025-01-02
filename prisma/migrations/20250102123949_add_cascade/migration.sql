/*
  Warnings:

  - You are about to drop the column `color` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `svg` on the `Category` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Category_Quiz" DROP CONSTRAINT "Category_Quiz_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Category_Quiz" DROP CONSTRAINT "Category_Quiz_quizId_fkey";

-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_quizId_fkey";

-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_authorId_fkey";

-- DropForeignKey
ALTER TABLE "User_Attempt" DROP CONSTRAINT "User_Attempt_quizId_fkey";

-- DropForeignKey
ALTER TABLE "User_Attempt" DROP CONSTRAINT "User_Attempt_userId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "color",
DROP COLUMN "svg",
ALTER COLUMN "authorId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Category_color" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "sub_color" TEXT,

    CONSTRAINT "Category_color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category_Like" (
    "userId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Category_Like_pkey" PRIMARY KEY ("userId","categoryId")
);

-- CreateTable
CREATE TABLE "User_Correct" (
    "quizId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_Correct_pkey" PRIMARY KEY ("quizId","userId")
);

-- CreateTable
CREATE TABLE "Quiz_Like" (
    "quizId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Quiz_Like_pkey" PRIMARY KEY ("quizId","userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category_color" ADD CONSTRAINT "Category_color_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category_color" ADD CONSTRAINT "Category_color_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category_Like" ADD CONSTRAINT "Category_Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category_Like" ADD CONSTRAINT "Category_Like_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category_Quiz" ADD CONSTRAINT "Category_Quiz_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category_Quiz" ADD CONSTRAINT "Category_Quiz_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Attempt" ADD CONSTRAINT "User_Attempt_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Attempt" ADD CONSTRAINT "User_Attempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Correct" ADD CONSTRAINT "User_Correct_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Correct" ADD CONSTRAINT "User_Correct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz_Like" ADD CONSTRAINT "Quiz_Like_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz_Like" ADD CONSTRAINT "Quiz_Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
