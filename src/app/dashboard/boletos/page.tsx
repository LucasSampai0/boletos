'use client';

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import DialogModal from '@/components/dialog-modal';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogTrigger, DialogContent, DialogOverlay, DialogTitle } from '@/components/ui/dialog';

export default function Page() {

    const { data: session, status: sessionStatus } = useSession();

    interface Boleto {
        id: number;
        dataEmissao: string;
        dataVencimento: string;
        valor: string;
    }

    console.log(session?.user?.id);

    const [boletos, setBoletos] = useState<Boleto[]>([]);
    const [boletoHTML, setBoletoHTML] = useState<string | null>(null);

    useEffect(() => {
        if (!session) return;

        fetch("/api/boletos/fetch-boletos")
            .then((res) => res.json())
            .then((data) => setBoletos(data))
            .catch((error) => console.error("Erro ao buscar boletos:", error));
    }, [session]);

    const generateBoleto = async (boletoId: number) => {
        try {
            const response = await fetch(`/api/boletos/gerar-boleto`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idBoleto: boletoId, idInquilino: 1 }), // Ajuste conforme necessário
            });

            const boletoHTML = await response.text();
            setBoletoHTML(boletoHTML);
        } catch (error) {
            console.error('Erro ao gerar boleto:', error);
        }
    };

    return (
        <main className='gap-4'>
            <div className='flex flex-col gap-4 text-center'>
                <DialogModal />
                <h1 className='text-lg font-semibold'>Seus Boletos</h1>
                <span>Atenção no valor e prazo de pagamento do boleto, que há desconto de pontualidade!</span>
                {sessionStatus === 'loading' && (
                    <Skeleton className='w-full h-96 rounded-3xl' />
                )}
                {sessionStatus === 'authenticated' && (
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-primary text-white h-16">
                                <TableHead className="px-4 text-center text-2xl">ID</TableHead>
                                <TableHead className="px-4 w-1/4 text-center text-2xl">Emissão</TableHead>
                                <TableHead className="px-4 w-1/4 text-center text-2xl">Vencimento</TableHead>
                                <TableHead className="px-4 w-1/4 text-center text-2xl">Valor</TableHead>
                                <TableHead className="px-4 w-1/4 text-center text-2xl"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {boletos.map((boleto) => (
                                <TableRow key={boleto.id}>
                                    <TableCell className="px-4 text-center font-semibold">{boleto.id}</TableCell>
                                    <TableCell className="px-4 w-1/4 text-center font-semibold">{boleto.dataEmissao}</TableCell>
                                    <TableCell className="px-4 w-1/4 text-center font-semibold">{boleto.dataVencimento}</TableCell>
                                    <TableCell className="px-4 w-1/4 text-center font-semibold">{boleto.valor}</TableCell>
                                    <TableCell className="px-4 w-1/4 text-center font-medium">
                                        <Dialog>
                                            <DialogTrigger onClick={() => generateBoleto(boleto.id)}>
                                                Imprimir Boleto
                                            </DialogTrigger>
                                            <DialogOverlay>
                                                <DialogContent className='max-w-3xl max-h-screen overflow-auto'>
                                                    <DialogTitle></DialogTitle>
                                                    <div>
                                                        {boletoHTML ? (
                                                            <div dangerouslySetInnerHTML={{ __html: boletoHTML }} />
                                                        ) : (
                                                            <Skeleton className='w-full h-96 rounded-3xl' />
                                                        )}
                                                    </div>
                                                </DialogContent>
                                            </DialogOverlay>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </main>
    );
}