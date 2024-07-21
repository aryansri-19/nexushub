/*
  Warnings:

  - You are about to drop the column `event_date` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `img_url` on the `events` table. All the data in the column will be lost.
  - Added the required column `is_free` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_type` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "event_date",
DROP COLUMN "img_url",
ADD COLUMN     "banner_url" TEXT,
ADD COLUMN     "capacity" INTEGER,
ADD COLUMN     "end_date" TIMESTAMP(3),
ADD COLUMN     "is_free" BOOLEAN NOT NULL,
ADD COLUMN     "location_type" TEXT NOT NULL,
ADD COLUMN     "online_link" TEXT,
ADD COLUMN     "price" DOUBLE PRECISION,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "end_time" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "image" DROP DEFAULT;
