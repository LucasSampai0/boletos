import prisma from "@/lib/prisma";
import { gerarBoleto } from "@/services/gerador-boleto";
import { NextResponse } from "next/server";



export async function POST(req: Request, res: Response) {

    const body = await req.json();

    const boleto = await prisma.boletos.findUnique({
        where: {
            id: body?.idBoleto
        }
    })

    const inquilino = await prisma.inquilinos.findUnique({
        where: {
            id: body?.idInquilino
        }
    })

    const imobiliaria = await prisma.imobiliaria.findFirst({})


    try {
        if (!boleto) {
            return NextResponse.json({ message: "Boleto não encontrado" }, { status: 404 })
        }

        if (!inquilino) {
            return NextResponse.json({ message: "Inquilino não encontrado" }, { status: 404 });
        }
        
        const boletoData = {
            id: boleto.id,
            dataEmissao: boleto.dataEmissao as Date,
            dataVencimento: boleto.dataVencimento as Date,
            valor: boleto.valor,
            especieDocumento: boleto.especieDocumento,
            aceite: boleto.aceite,
            nossoNumero: boleto.nossoNumero,
            numeroDocumento: boleto.numeroDocumento,
            cedente: imobiliaria?.razaoSocial as string,
            cedenteCnpj: imobiliaria?.cnpj as string,
            agencia: boleto.agencia,
            codigoCedente: boleto.nossoNumero,
            carteira: boleto.carteira,
            instrucoes: boleto.instrucoes
        }

        const inquilinoData = {
            id: inquilino.id,
            nome: inquilino.nome,
            cpf: inquilino.cpf,
            endereco: inquilino.endereco,
        }

        const boletoHTML = await gerarBoleto(boletoData, inquilinoData);

        return new Response(boletoHTML, {
            status: 200,
            headers: {
                "Content-Type": "text/html"
            }
        })

    } catch (error) {
        return NextResponse.json({ message: "Erro ao gerar boleto", error: error }, { status: 500 })
    }

}