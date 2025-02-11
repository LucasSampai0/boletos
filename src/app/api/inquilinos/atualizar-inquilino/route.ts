import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";



export async function PUT(req: Request) {
    try {
        const url = new URL(req.url);
        const idInquilino = url.searchParams.get('idInquilino');
        const data = await req.json();

        const inquilinoExists = await prisma.inquilinos.findFirst({
            where: {
                id: idInquilino ? parseInt(idInquilino, 10) : undefined
            }
        })

        if(!inquilinoExists){
            return NextResponse.json({success: false, error: "Inquilino Não Encontrado"}, {status: 400})
        }

        await prisma.inquilinos.update({
            where: {
                id: data.id
            },
            data: {
                nome: data?.nome,
                cpf: data?.cpf,
                email: data?.email,
                senha: data?.senha,
                endereco: data?.endereco,
                numero: data?.numero,
                cidade: data?.cidade,
                estado: data?.estado,
                cep: data?.cep,
            },
        })

        return NextResponse.json({ success: true, message: "Inquilino Atualizado" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, message: "Erro ao processar os dados" }, { status: 500 })
    }
}
