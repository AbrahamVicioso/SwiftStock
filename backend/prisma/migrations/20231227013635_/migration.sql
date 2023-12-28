-- CreateTable
CREATE TABLE "articles" (
    "ar_id" SERIAL NOT NULL,
    "ar_name" TEXT,
    "ar_code" INTEGER,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("ar_id")
);

-- CreateTable
CREATE TABLE "wharehouses" (
    "w_id" SERIAL NOT NULL,
    "w_name" TEXT NOT NULL,

    CONSTRAINT "wharehouses_pkey" PRIMARY KEY ("w_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "wharehouses_w_name_key" ON "wharehouses"("w_name");
