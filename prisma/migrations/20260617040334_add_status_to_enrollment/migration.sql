/*
  Warnings:

  - You are about to drop the column `departmentId` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `roll` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `department` table. All the data in the column will be lost.
  - You are about to drop the column `couserId` on the `enrollment` table. All the data in the column will be lost.
  - Added the required column `department_Id` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roll_no` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseId` to the `enrollment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Students" DROP CONSTRAINT "Students_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "enrollment" DROP CONSTRAINT "enrollment_couserId_fkey";

-- AlterTable
ALTER TABLE "Students" DROP COLUMN "departmentId",
DROP COLUMN "roll",
ADD COLUMN     "department_Id" INTEGER NOT NULL,
ADD COLUMN     "roll_no" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "department" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "enrollment" DROP COLUMN "couserId",
ADD COLUMN     "courseId" INTEGER NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'active';

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_department_Id_fkey" FOREIGN KEY ("department_Id") REFERENCES "department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
