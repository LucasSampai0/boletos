'use client';

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import DialogModal from '@/components/dialog-modal';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Page() {

    const { data: session, status } = useSession();
    interface Boleto {
        id: string;
        dataEmissao: string;
        dataVencimento: string;
        valor: string;
        url: string;
    }

    const [boletos, setBoletos] = useState<Boleto[]>([]);

    useEffect(() => {
        if (!session) return;

        fetch("/api/boletos/fetch-boletos")
            .then((res) => res.json())
            .then((data) => setBoletos(data))
            .catch((error) => console.error("Erro ao buscar boletos:", error));
    }, [session]);

    return (
        <main className='gap-4'>
            <div className='flex flex-col gap-4 text-center'>
                <DialogModal />
                <h1 className='text-lg font-semibold'>Seus Boletos</h1>
                <span>Atenção no valor e prazo de pagamento do boleto, que há desconto de pontualidade!</span>
                {status === 'loading' && (
                    <Skeleton className='w-full h-96 rounded-3xl' />
                )}
                {status === 'authenticated' && (
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-primary text-white h-16">
                                <TableHead className="px-4 w-1/4 text-center text-2xl">Emissão</TableHead>
                                <TableHead className="px-4 w-1/4 text-center text-2xl">Vencimento</TableHead>
                                <TableHead className="px-4 w-1/4 text-center text-2xl">Valor</TableHead>
                                <TableHead className="px-4 w-1/4 text-center text-2xl"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {boletos.map((boleto) => (
                                <TableRow key={boleto.id}>
                                    <TableCell className="px-4 w-1/4 text-center font-semibold">{boleto.dataEmissao}</TableCell>
                                    <TableCell className="px-4 w-1/4 text-center font-semibold">{boleto.dataVencimento}</TableCell>
                                    <TableCell className="px-4 w-1/4 text-center font-semibold">{boleto.valor}</TableCell>
                                    <TableCell className="px-4 w-1/4 text-center font-mdedium">
                                        <a href={boleto.url} target="_blank" rel="noreferrer">
                                            <button className="bg-primary text-white rounded-md px-4 py-2">Ver Boleto</button>
                                        </a>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )
                }

            </div>
        </main>
    );
}