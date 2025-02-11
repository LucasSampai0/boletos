/*
  Warnings:

  - You are about to alter the column `dataCriacao` on the `forms` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dataAtualizacao` on the `forms` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `forms` MODIFY `dataCriacao` DATETIME NOT NULL,
    MODIFY `dataAtualizacao` DATETIME NOT NULL;
