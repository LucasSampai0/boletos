/*
  Warnings:

  - You are about to alter the column `dataVencimento` on the `boletos` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dataEmissao` on the `boletos` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dataPagamento` on the `boletos` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dataCriacao` on the `boletos` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dataAtualizacao` on the `boletos` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dataCriacao` on the `forms` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dataAtualizacao` on the `forms` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `boletos` MODIFY `dataVencimento` DATETIME NOT NULL,
    MODIFY `dataEmissao` DATETIME NOT NULL,
    MODIFY `dataPagamento` DATETIME NOT NULL,
    MODIFY `dataCriacao` DATETIME NOT NULL,
    MODIFY `dataAtualizacao` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `forms` MODIFY `dataCriacao` DATETIME NOT NULL,
    MODIFY `dataAtualizacao` DATETIME NOT NULL;
