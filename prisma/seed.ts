import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

    await prisma.imobiliaria.createMany({
        data: [
            {
                razaoSocial: "Imobiliaria Jaú",
                cnpj: "12345678901234",
                endereco: "Rua Teste",
                cidade: "Jaú",
                estado: "SP",
                cep: "17000000",
                email: "imobiliariajau@imobiliariajau.com.br"
            }
        ]
    })

    await prisma.admin.createMany({
        data: [
            {
                id: 1,
                picture: '',
                nome: "Lucas Admin",
                email: 'lsampaiobueno@gmail.com',
                senha: '$2a$12$Seu46t9rqUKfWEn/Pya/QOVEayL8.YEcpqyOnnh2zaX.iFhFlg9vC'
            },
            {
                id: 2,
                picture: '',
                nome: "Rodrigo Admin",
                email: 'rodriguinhoadmin@admin.com.br',
                senha: '$2a$12$Seu46t9rqUKfWEn/Pya/QOVEayL8.YEcpqyOnnh2zaX.iFhFlg9vC'
            }
        ]
    })


    await prisma.inquilinos.createMany({
        data: [
            {
                id: 1,
                nome: "RODRIGO DOS SANTOS",
                cpf: "34901702882",
                senha: "$2y$10$l361qvQDoIatgzb0UHK1EOiHrQc8JJ1w5waFqH4QzXyoF6YsrjykS",
                endereco: "AVENIDA NETINHO PRADO",
                numero: "650",
                cidade: "JAU",
                estado: "SP",
                cep: "17208270",
                email: "srodrigo038@gmail.com",
            },
            {
                id: 2,
                nome: "Lucas Sampaio Bueno",
                cpf: "51965014879",
                senha: "$2y$10$l361qvQDoIatgzb0UHK1EOiHrQc8JJ1w5waFqH4QzXyoF6YsrjykS",
                endereco: "José Gonçalves da Silva",
                numero: "650",
                cidade: "Mineiros do Tietê",
                estado: "SP",
                cep: "17230029",
                email: "lucas.bueno@arkus.com.br"
            }
        ]
    })

    await prisma.contratos.createMany({
        data: [
            {
                id: 1,
                titulo: "",
                endereco: "AVENIDA NETINHO PRADO",
                numero: "650",
                cidade: "JAU",
                estado: "SP",
                cep: "17208270",
                observacoes: "Casa com 3 quartos, 2 banheiros, 1 sala, 1 cozinha, 1 lavanderia, 1 garagem",
                idInquilino: 1

            }
        ]
    })

    await prisma.boletos.createMany({
        data: [
            {
                id: 1,
                dataVencimento: new Date('2025-01-01'),
                dataEmissao: new Date('2025-01-01'),
                valor: 100.00,
                nossoNumero: "38680",
                agencia: "0001",
                dvAgencia: "5",
                conta: "000000000001",
                dvConta: "4",
                aceite: "N",
                especieDocumento: "DM",
                instrucoes: "Não aceitar pagamento em cheque",
                status: "ATIVO",
                dataPagamento: new Date('1970-01-01'),
                dataCriacao: new Date(),
                dataAtualizacao: new Date(),
                carteira: '005',
                numeroDocumento: '04393-05/12',
                idContrato: 1,
                idInquilino: 1
            },
            {
                id: 2,
                dataVencimento: new Date('2025-02-02'),
                dataEmissao: new Date('2025-02-02'),
                valor: 160.00,
                nossoNumero: "38680",
                agencia: "0001",
                dvAgencia: "5",
                conta: "000000000001",
                dvConta: "4",
                aceite: "N",
                especieDocumento: "DM",
                instrucoes: "Não aceitar pagamento em cheque",
                status: "ATIVO",
                dataPagamento: new Date('1970-01-01'),
                dataCriacao: new Date(),
                dataAtualizacao: new Date(),
                carteira: '005',
                numeroDocumento: '04393-05/12',
                idContrato: 1,
                idInquilino: 1
            }
        ]
    })

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })