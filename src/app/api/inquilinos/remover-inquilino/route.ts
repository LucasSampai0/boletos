import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";



export async function GET(req: Request, res: Response) {
    try {
        const url = new URL(req.url);
        const idInquilino = url.searchParams.get('idInquilino');

        //Checa se o inquilino existe
        const inquilinoExists = await prisma.inquilinos.findFirst({
            where: {
                id: idInquilino ? parseInt(idInquilino, 10) : undefined,
            }
        })

        if(!inquilinoExists){
            return NextResponse.json({ success: false, error: "Inquilino não encontrado" }, { status: 400 });
        }

        //Remove o inquilino
        await prisma.inquilinos.delete({
            where: {
                id: idInquilino ? parseInt(idInquilino, 10) : undefined,
            },
        });

        return NextResponse.json({ success: true, message: "Inquilino removido com sucesso" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Erro ao processar a requisição" }, { status: 400 });
    }
}