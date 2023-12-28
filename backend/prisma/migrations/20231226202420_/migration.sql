-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "psw" TEXT NOT NULL,
    "urole" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "r_id" SERIAL NOT NULL,
    "r_name" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("r_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "roles_r_name_key" ON "roles"("r_name");
