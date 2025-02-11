import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
        }

        const id = parseInt(session.user?.id as string, 10);

        const boletos = await prisma.boletos.findMany({
            where: {
                idInquilino: id
            }
        })

        boletos.map((boleto) => {
            boleto.dataEmissao = new Date(boleto.dataEmissao).toLocaleDateString("pt-BR");
            boleto.dataVencimento = new Date(boleto.dataVencimento).toLocaleDateString("pt-BR");
            boleto.valor = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(boleto.valor);
        });

        return NextResponse.json(boletos);
    } catch (error) {
        return NextResponse.json({ message: "Erro ao buscar boletos" }, { status: 500 });
    }
}
