/*
  Warnings:

  - A unique constraint covering the columns `[ar_code]` on the table `articles` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "articles" ALTER COLUMN "ar_code" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "articles_ar_code_key" ON "articles"("ar_code");
