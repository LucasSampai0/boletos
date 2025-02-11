import { Dialog, DialogTrigger, DialogContent, DialogOverlay, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';

export default function dialogModal() {
    return (
        <Dialog>
            <DialogTrigger className='self-start bg-black text-white rounded-md p-2 font-semibold'>Informações Importantes</DialogTrigger>
            <DialogOverlay >
                <DialogContent className='gap-6'>
                    <DialogTitle className="text-primary text-center">
                        Comunicado
                        </DialogTitle>
                    Prezado inquilino,<br /><br />

                    Gostariamos de lembrá-lo que a manutenção do imóvel, especialmente no que ser refere à limpeza de calhas, telhados e ralos, é uma responsabilidade dos moradores.<br /><br />
                    Com a previsão de chuvas nos próximos dias, é importante que façam uma verificação preventiva destes itens para evitar problemas futuros.

                    <Image src='/images/logo-preto-laranja.png' width={150} height={100} alt='Logo' className='justify-self-center' />
                </DialogContent>
            </DialogOverlay>
        </Dialog>
    )
}