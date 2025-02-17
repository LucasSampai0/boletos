interface Boleto{
    id: number;
    dataEmissao: Date;
    dataVencimento: Date;
    valor: number;
    nossoNumero: string;
    numeroDocumento: string;
    cedente: string;
    cedenteCnpj: string;
    agencia: string;
    codigoCedente: string;
    carteira: string;
    instrucoes: string;
}

export function gerarLinhaDigitavel(boleto: Boleto){
    function modulo10(numero: string): number {
        let soma = 0;
        let peso = 2;
        for (let i = numero.length - 1; i >= 0; i--) {
            let multiplicacao = parseInt(numero.charAt(i)) * peso;
            if (multiplicacao >= 10) multiplicacao -= 9;
            soma += multiplicacao;
            peso = peso === 2 ? 1 : 2;
        }
        const digito = 10 - (soma % 10);
        return digito === 10 ? 0 : digito;
    }

    function modulo11(numero: string): number {
        let soma = 0;
        let peso = 2;
        for (let i = numero.length - 1; i >= 0; i--) {
            soma += parseInt(numero.charAt(i)) * peso;
            peso = peso === 9 ? 2 : peso + 1;
        }
        const digito = 11 - (soma % 11);
        return digito === 0 || digito === 10 || digito === 11 ? 1 : digito;
    }

    function formatarCampo(campo: string): string {
        return campo.substr(0, 5) + '.' + campo.substr(5);
    }

    const banco = '003'; // SANTANDER
    const moeda = '9'; // Código da moeda (Real)
    const fatorVencimento = Math.floor((boleto.dataVencimento.getTime() - new Date(1997, 9, 7).getTime()) / (24 * 60 * 60 * 1000)).toString();
    const valor = boleto.valor.toFixed(2).replace('.', '').padStart(10, '0');
    const campoLivre = boleto.nossoNumero.padStart(11, '0') + boleto.agencia.padStart(4, '0') + boleto.codigoCedente.padStart(6, '0') + boleto.carteira.padStart(2, '0');

    const campo1 = banco + moeda + campoLivre.substr(0, 5);
    const campo2 = campoLivre.substr(5, 10);
    const campo3 = campoLivre.substr(15, 10);
    const campo4 = ''; // Digito verificador geral (será calculado depois)
    const campo5 = fatorVencimento + valor;

    const digito1 = modulo10(campo1);
    const digito2 = modulo10(campo2);
    const digito3 = modulo10(campo3);
    const digitoVerificadorGeral = modulo11(banco + moeda + fatorVencimento + valor + campoLivre);

    const linhaDigitavel = formatarCampo(campo1 + digito1) + ' ' +
                           formatarCampo(campo2 + digito2) + ' ' +
                           formatarCampo(campo3 + digito3) + ' ' +
                           digitoVerificadorGeral + ' ' +
                           campo5;

    return linhaDigitavel;
}