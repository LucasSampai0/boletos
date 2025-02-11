import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        // Verifica se o boleto já existe
        const boletoExists = await prisma.boletos.findFirst({
            where: {
                id: data.id
            }
        });

        if (boletoExists) {
            return NextResponse.json({ success: false, error: "Boleto já cadastrado" }, { status: 400 });
        }

        // Criação do boleto no banco de dados
        const newBoleto = await prisma.boletos.create({
            data: {
                id: data.id,
                dataVencimento: new Date(data.dataVencimento),
                dataEmissao: new Date(data.dataEmissao),
                valor: data.valor,
                nossoNumero: data.nossoNumero,
                agencia: data.agencia,
                dvAgencia: data.dvAgencia,
                carteira: data.carteira,
                conta: data.conta,
                dvConta: data.dvConta,
                aceite: data.aceite,
                especieDocumento: data.especieDocumento,
                numeroDocumento: data.numeroDocumento,
                instrucoes: data.instrucoes,
                status: data.status,
                dataPagamento: null,
                dataCriacao: new Date(),
                dataAtualizacao: new Date(),
                inquilino: {
                    connect: {
                        id: data.idInquilino,
                    }
                },
                contrato: {
                    connect: {
                        id: data.idContrato
                    }
                }
            },
        });

        return NextResponse.json({ success: true, message: "Boleto criado com sucesso!", receivedData: newBoleto }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Erro ao processar a requisição", error: error instanceof Error ? error.message : String(error) }, { status: 500 });
    }
}