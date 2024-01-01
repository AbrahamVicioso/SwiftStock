/*
  Warnings:

  - Made the column `ar_name` on table `articles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ar_brand` on table `articles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ar_color` on table `articles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ar_year` on table `articles` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "articles" ADD COLUMN     "ar_image" TEXT,
ALTER COLUMN "ar_name" SET NOT NULL,
ALTER COLUMN "ar_brand" SET NOT NULL,
ALTER COLUMN "ar_color" SET NOT NULL,
ALTER COLUMN "ar_year" SET NOT NULL;
