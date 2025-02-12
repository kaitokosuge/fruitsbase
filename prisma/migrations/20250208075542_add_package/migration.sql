-- CreateTable
CREATE TABLE "QuizPackage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "color" TEXT,
    "image" TEXT,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuizPackage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizPackageStore" (
    "quizId" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,

    CONSTRAINT "QuizPackageStore_pkey" PRIMARY KEY ("quizId","packageId")
);

-- AddForeignKey
ALTER TABLE "QuizPackage" ADD CONSTRAINT "QuizPackage_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizPackageStore" ADD CONSTRAINT "QuizPackageStore_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizPackageStore" ADD CONSTRAINT "QuizPackageStore_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "QuizPackage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
