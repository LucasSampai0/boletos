-- CreateTable
CREATE TABLE `admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `picture` VARCHAR(255) NOT NULL,
    `nome` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `senha` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inquilinos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `cpf` VARCHAR(255) NOT NULL,
    `senha` VARCHAR(255) NOT NULL,
    `endereco` VARCHAR(255) NOT NULL,
    `numero` VARCHAR(255) NOT NULL,
    `cidade` VARCHAR(255) NOT NULL,
    `estado` VARCHAR(255) NOT NULL,
    `cep` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `boletos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dataVencimento` DATETIME NOT NULL,
    `dataEmissao` DATETIME NOT NULL,
    `valor` FLOAT NOT NULL,
    `nossoNumero` VARCHAR(255) NOT NULL,
    `agencia` VARCHAR(255) NOT NULL,
    `dvAgencia` VARCHAR(255) NOT NULL,
    `carteira` VARCHAR(255) NOT NULL,
    `conta` VARCHAR(255) NOT NULL,
    `dvConta` VARCHAR(255) NOT NULL,
    `aceite` VARCHAR(255) NOT NULL,
    `especieDocumento` VARCHAR(255) NOT NULL,
    `numeroDocumento` VARCHAR(255) NOT NULL,
    `instrucoes` TEXT NOT NULL,
    `status` INTEGER NOT NULL,
    `dataPagamento` DATETIME NOT NULL,
    `dataCriacao` DATETIME NOT NULL,
    `dataAtualizacao` DATETIME NOT NULL,
    `idContrato` INTEGER NOT NULL,
    `idInquilino` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contratos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `endereco` VARCHAR(255) NOT NULL,
    `cidade` VARCHAR(255) NOT NULL,
    `estado` VARCHAR(255) NOT NULL,
    `cep` VARCHAR(255) NOT NULL,
    `observacoes` TEXT NOT NULL,
    `idInquilino` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `laudos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idContrato` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `imobiliaria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `razaoSocial` VARCHAR(255) NOT NULL,
    `cnpj` VARCHAR(255) NOT NULL,
    `endereco` VARCHAR(255) NOT NULL,
    `cidade` VARCHAR(255) NOT NULL,
    `estado` VARCHAR(255) NOT NULL,
    `cep` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `forms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeInquilino` VARCHAR(255) NOT NULL,
    `emailInquilino` VARCHAR(255) NOT NULL,
    `telefone` VARCHAR(255) NOT NULL,
    `descricao` TEXT NOT NULL,
    `dataCriacao` DATETIME NOT NULL,
    `dataAtualizacao` DATETIME NOT NULL,
    `dados` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `boletos` ADD CONSTRAINT `boletos_idContrato_fkey` FOREIGN KEY (`idContrato`) REFERENCES `contratos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `boletos` ADD CONSTRAINT `boletos_idInquilino_fkey` FOREIGN KEY (`idInquilino`) REFERENCES `inquilinos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contratos` ADD CONSTRAINT `contratos_idInquilino_fkey` FOREIGN KEY (`idInquilino`) REFERENCES `inquilinos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `laudos` ADD CONSTRAINT `laudos_idContrato_fkey` FOREIGN KEY (`idContrato`) REFERENCES `contratos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
