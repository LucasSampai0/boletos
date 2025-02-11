/*
  Warnings:

  - You are about to alter the column `dataCriacao` on the `forms` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dataAtualizacao` on the `forms` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `boletos` MODIFY `id` INTEGER NOT NULL,
    MODIFY `dataVencimento` DATE NOT NULL,
    MODIFY `dataEmissao` DATE NOT NULL,
    MODIFY `dataPagamento` DATE NULL,
    MODIFY `dataCriacao` DATE NOT NULL,
    MODIFY `dataAtualizacao` DATE NOT NULL;

-- AlterTable
ALTER TABLE `forms` MODIFY `dataCriacao` DATETIME NOT NULL,
    MODIFY `dataAtualizacao` DATETIME NOT NULL;
