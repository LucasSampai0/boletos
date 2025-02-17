interface Boleto {
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

export default function gerarCodBarras(boleto: Boleto){

    function modulo11(num: string): number {
        let soma = 0;
        let peso = 2;

        for (let i = num.length - 1; i >= 0; i--) {
            soma += parseInt(num.charAt(i)) * peso;
            peso = peso === 9 ? 2 : peso + 1;
        }

        const resto = soma % 11;
        const digito = 11 - resto;

        return digito === 0 || digito === 10 || digito === 11 ? 1 : digito;
    }

    function formatarValor(valor: number): string {
        return (valor * 100).toFixed(0).padStart(10, '0');
    }

    function formatarData(data: Date): string {
        const dataBase = new Date(1997, 9, 7); // Data base para cálculo do fator de vencimento
        const diferenca = Math.floor((data.getTime() - dataBase.getTime()) / (1000 * 60 * 60 * 24));
        return diferenca.toString().padStart(4, '0');
    }

    const banco = '003'; // SANTANDER
    const moeda = '9'; // Código da moeda (9 para Real)
    const fatorVencimento = formatarData(boleto.dataVencimento);
    const valor = formatarValor(boleto.valor);
    const campoLivre = `${boleto.nossoNumero}${boleto.agencia}${boleto.codigoCedente}${boleto.carteira}`;

    const codigoSemDV = `${banco}${moeda}${fatorVencimento}${valor}${campoLivre}`;
    const digitoVerificador = modulo11(codigoSemDV);

    const codigoBarras = `${banco}${moeda}${digitoVerificador}${fatorVencimento}${valor}${campoLivre}`;

    return codigoBarras;

}