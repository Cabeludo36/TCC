/*
  Warnings:

  - Added the required column `data` to the `entrada_saida` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."entrada_saida" ADD COLUMN     "data" DATE NOT NULL;
