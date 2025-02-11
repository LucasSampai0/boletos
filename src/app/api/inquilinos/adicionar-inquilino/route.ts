import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";



export async function POST(req: Request) {
    try {
        const data = await req.json();

        // Verifica se o inquilino já existe
        const inquilinoExists = await prisma.inquilinos.findFirst({
            where:{
                id: data.id
            }
        })

        if(inquilinoExists){
            return NextResponse.json({ success: false, error: "Inquilino já cadastrado" }, { status: 400 });
        }

        // Cria o inquilino
        await prisma.inquilinos.create({
            data: {
                id: data.id,
                nome: data.nome,
                cpf: data.cpf,
                email: data.email,
                senha: "",
                endereco: data.endereco,
                numero: data.numero,
                cidade: data.cidade,
                estado: data.estado,
                cep: data.cep,
            },
        });

        return NextResponse.json({ success: true, message: "Inquilino criado com sucesso!" , receivedData: data }, {status : 200});
    } catch (error) {
        return NextResponse.json({ success: false, error: "Erro ao processar a requisição" }, { status: 400 });
    }
}
