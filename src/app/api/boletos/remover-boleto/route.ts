import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const idBoleto = url.searchParams.get('idBoleto');

        const boletoExists = await prisma.boletos.findFirst({
            where: {
                id: idBoleto ? parseInt(idBoleto, 10) : undefined,
            }
        })

        if (!boletoExists) {
            return NextResponse.json({ success: false, error: "Boleto não encontrado" }, { status: 400 });
        }

        await prisma.boletos.delete({
            where: {
                id: idBoleto ? parseInt(idBoleto, 10) : undefined,
            },
        });

        return NextResponse.json({ success: true, message: "Boleto removido com sucesso" }, { status: 200 });

    } catch {
        return NextResponse.json({ success: false, error: "Erro ao processar a requisição" }, { status: 400 });
    }
}