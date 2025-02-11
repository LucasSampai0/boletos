/*
  Warnings:

  - You are about to alter the column `dataVencimento` on the `boletos` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dataEmissao` on the `boletos` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `status` on the `boletos` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Enum(EnumId(0))`.
  - You are about to alter the column `dataPagamento` on the `boletos` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dataCriacao` on the `boletos` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dataAtualizacao` on the `boletos` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dataCriacao` on the `forms` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dataAtualizacao` on the `forms` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `numero` to the `contratos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titulo` to the `contratos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `boletos` MODIFY `dataVencimento` DATETIME NOT NULL,
    MODIFY `dataEmissao` DATETIME NOT NULL,
    MODIFY `status` ENUM('ATIVO', 'PAGO', 'CANCELADO') NOT NULL DEFAULT 'ATIVO',
    MODIFY `dataPagamento` DATETIME NOT NULL,
    MODIFY `dataCriacao` DATETIME NOT NULL,
    MODIFY `dataAtualizacao` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `contratos` ADD COLUMN `numero` VARCHAR(255) NOT NULL,
    ADD COLUMN `titulo` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `forms` MODIFY `dataCriacao` DATETIME NOT NULL,
    MODIFY `dataAtualizacao` DATETIME NOT NULL;
