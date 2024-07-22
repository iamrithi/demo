-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'MANAGER', 'STAFF', 'USER');

-- CreateEnum
CREATE TYPE "Service" AS ENUM ('Army', 'Air_Force', 'Navy');

-- CreateEnum
CREATE TYPE "Grievance_Status" AS ENUM ('PENDING', 'INPROGRESS', 'RESOLVED');

-- CreateEnum
CREATE TYPE "Rank" AS ENUM ('Sep', 'LNk', 'Nk', 'Hav', 'Nb_Sub', 'Sub', 'Sub_Maj', 'Lt2', 'Lt', 'Capt', 'Maj', 'Lt_Col', 'Col', 'Brig', 'Maj_Gen', 'Lt_Gen', 'Gen', 'Fd_Marshal');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "image" TEXT,
    "name" TEXT NOT NULL,
    "phone_no" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "pincode" TEXT,
    "mobile_device_token" TEXT,
    "service" "Service" DEFAULT 'Army',
    "role" "UserRole"[],
    "rank" "Rank" DEFAULT 'Sep',
    "isApproved" BOOLEAN DEFAULT false,
    "is_phone_no_verified" BOOLEAN DEFAULT false,
    "isFirstLogin" BOOLEAN DEFAULT true,
    "canteen_id" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OtpToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expiration" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OtpToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Canteen" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unique_id" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "address" TEXT,
    "phone_no" TEXT NOT NULL,
    "manager_id" TEXT,

    CONSTRAINT "Canteen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FaqType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "FaqType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faq" (
    "id" TEXT NOT NULL,
    "type_id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "Faq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrievanceType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "GrievanceType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grievance" (
    "id" TEXT NOT NULL,
    "type_id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT DEFAULT '',
    "status" "Grievance_Status" NOT NULL DEFAULT 'PENDING',
    "user_id" TEXT,
    "canteen_id" TEXT,

    CONSTRAINT "Grievance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "DocType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Documents" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stock" (
    "id" TEXT NOT NULL,
    "canteen_id" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "key" TEXT,
    "date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" TEXT NOT NULL,
    "S_No" INTEGER NOT NULL,
    "Index" TEXT NOT NULL,
    "Pluno" TEXT NOT NULL,
    "Item_Description" TEXT NOT NULL,
    "Stock" INTEGER NOT NULL,
    "W_Rate" DECIMAL(65,30) NOT NULL,
    "W_Amt" DECIMAL(65,30) NOT NULL,
    "R_Rate" DECIMAL(65,30) NOT NULL,
    "R_Amt" DECIMAL(65,30) NOT NULL,
    "VAT_Percent" DECIMAL(65,30) NOT NULL,
    "VAT_WRate" DECIMAL(65,30) NOT NULL,
    "VAT_W_Amt" DECIMAL(65,30) NOT NULL,
    "VAT_Rate" DECIMAL(65,30) NOT NULL,
    "VAT_R_Amt" DECIMAL(65,30) NOT NULL,
    "Profit" DECIMAL(65,30) NOT NULL,
    "MPP" DECIMAL(65,30) NOT NULL,
    "Group_Name" TEXT NOT NULL,
    "csd_id" TEXT NOT NULL,
    "stock_id" TEXT NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_no_key" ON "User"("phone_no");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_mobile_device_token_key" ON "User"("mobile_device_token");

-- CreateIndex
CREATE UNIQUE INDEX "OtpToken_user_id_key" ON "OtpToken"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Canteen_name_key" ON "Canteen"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Canteen_unique_id_key" ON "Canteen"("unique_id");

-- CreateIndex
CREATE UNIQUE INDEX "Canteen_manager_id_key" ON "Canteen"("manager_id");

-- CreateIndex
CREATE UNIQUE INDEX "FaqType_name_key" ON "FaqType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Faq_question_key" ON "Faq"("question");

-- CreateIndex
CREATE UNIQUE INDEX "GrievanceType_name_key" ON "GrievanceType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Grievance_question_key" ON "Grievance"("question");

-- CreateIndex
CREATE UNIQUE INDEX "DocType_name_key" ON "DocType"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_canteen_id_fkey" FOREIGN KEY ("canteen_id") REFERENCES "Canteen"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OtpToken" ADD CONSTRAINT "OtpToken_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Canteen" ADD CONSTRAINT "Canteen_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faq" ADD CONSTRAINT "Faq_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "FaqType"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grievance" ADD CONSTRAINT "Grievance_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "GrievanceType"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grievance" ADD CONSTRAINT "Grievance_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grievance" ADD CONSTRAINT "Grievance_canteen_id_fkey" FOREIGN KEY ("canteen_id") REFERENCES "Canteen"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_canteen_id_fkey" FOREIGN KEY ("canteen_id") REFERENCES "Canteen"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_csd_id_fkey" FOREIGN KEY ("csd_id") REFERENCES "Canteen"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
