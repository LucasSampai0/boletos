import prisma from '@/lib/prisma';
import gerarCodBarras from './gerar-cod-barras';
import { gerarLinhaDigitavel } from './gerar-linha-digitavel';

interface Boleto {
    id: number;
    dataEmissao: Date;
    dataVencimento: Date;
    valor: number;
    especieDocumento: string;
    aceite: string;
    nossoNumero: string;
    numeroDocumento: string;
    cedente: string;
    cedenteCnpj: string;
    agencia: string;
    codigoCedente: string;
    carteira: string;
    instrucoes: string;
}

interface Inquilino {
    id: number;
    nome: string;
    cpf: string;
    endereco: string;
}


export async function gerarBoleto(boleto: Boleto, inquilino: Inquilino): Promise<string> {

    const imobiliaria = await prisma.imobiliaria.findFirst({});

    const codBarras = gerarCodBarras(boleto);
    const linhaDigitavel = gerarLinhaDigitavel(boleto);

    const boletoHTML = `
    <style type="text/css">

@media print {
    .noprint {
        display:none;
    }
}

body{
    background-color: #ffffff;
    margin-right: 0;
}

.table-boleto {
    font: 9px Arial;
    width: 666px;
}

.table-boleto td {
    border-left: 1px solid #000;
    border-top: 1px solid #000;
}

.table-boleto td:last-child {
    border-right: 1px solid #000;
}

.table-boleto .titulo {
    color: #000033;
}

.linha-pontilhada {
    color: #000033;
    font: 9px Arial;
    width: 100%;
    border-bottom: 1px dashed #000;
    text-align: right;
    margin-bottom: 10px;
}

.table-boleto .conteudo {
    font: bold 10px Arial;
    height: 11.5px;
}

.table-boleto .sacador {
    display: inline;
    margin-left: 5px;
}

.table-boleto td {
    padding: 1px 4px;
}

.table-boleto .noleftborder {
    border-left: none !important;
}

.table-boleto .notopborder {
    border-top: none !important;
}

.table-boleto .norightborder {
    border-right: none !important;
}

.table-boleto .noborder {
    border: none !important;
}

.table-boleto .bottomborder {
    border-bottom: 1px solid #000 !important;
}

.table-boleto .rtl {
    text-align: right;
}

.table-boleto .logobanco {
    display: inline-block;
    max-width: 150px;
}

.table-boleto .logocontainer {
    width: 257px;
    display: inline-block;
}

.table-boleto .logobanco img {
    margin-bottom: -5px;
    height: 27px;
}

.table-boleto .codbanco {
    font: bold 20px Arial;
    padding: 1px 5px;
    display: inline;
    border-left: 2px solid #000;
    border-right: 2px solid #000;
    width: 51px;
    margin-left: 25px;
}

.table-boleto .linha-digitavel {
    font: bold 14px Arial;
    display: inline-block;
    width: 400px;
    text-align: right;
}

.table-boleto .nopadding {
    padding: 0px !important;
}

.table-boleto .caixa-gray-bg {
    font-weight: bold;
    background: #ccc;
}

.info {
    font: 11px Arial;
}

.info-empresa {
    font: 11px Arial;
}

.header {
    font: bold 13px Arial;
    display: block;
    margin: 4px;
}

.barcode {
    height: 50px;
}

.barcode div {
    display: inline-block;
    height: 100%;
}

.barcode .black {
    border-color: #000;
    border-left-style: solid;
    width: 0px;
}

.barcode .white {
    background: #fff;
}

.barcode .thin.black {
    border-left-width: 1px;
}

.barcode .large.black {
    border-left-width: 3px;
}

.barcode .thin.white {
    width: 1px;
}

.barcode .large.white {
    width: 3px;
}

.float_left{
    float:left;
}

.center {
    text-align: center;
}

.conteudo.cpf_cnpj{
    float:right;
    width:24%;
}
    </style>
    <div style="width: 666px">
    	        <div class="noprint info">
            <h2>Instruções de Impressão</h2>
            <ul>
                <li>Imprima em impressora jato de tinta (ink jet) ou laser em qualidade normal ou alta (Não use modo econômico).</li>
                <li>Utilize folha A4 (210 x 297 mm) ou Carta (216 x 279 mm) e margens mínimas à esquerda e à direita do formulário.</li>
                <li>Corte na linha indicada. Não rasure, risque, fure ou dobre a região onde se encontra o código de barras.</li>
                <li>Caso não apareça o código de barras no final, pressione F5 para atualizar esta tela.</li>
                <li>Caso tenha problemas ao imprimir, copie a sequencia numérica abaixo e pague no caixa eletrônico ou no internet banking:</li>
            </ul>
            <span class="header">Linha Digitável: ${linhaDigitavel}</span>
            
            <span class="header">Valor: R$ ${boleto.valor}</span>                        <br>
            <div class="linha-pontilhada" style="margin-bottom: 20px;">Recibo do pagador</div>
        </div>
        
        <div class="info-empresa">
                        <div style="display: inline-block;">
                <img alt="logotipo" src="https://imobiliariajau.com.br/boleto/logo-perfil-preto-laranja_pequeno.png">
            </div>
                        <div style="display: inline-block; vertical-align: super;">
                <div><strong>${imobiliaria?.razaoSocial}</strong></div>
                <div>${imobiliaria?.cnpj}</div>
                <div>${imobiliaria?.endereco}</div>
                <div>${imobiliaria?.cep} - ${imobiliaria?.cidade} - ${imobiliaria?.estado}</div>
            </div>
        </div>
        <br>

        <table class="table-boleto" cellpadding="0" cellspacing="0" border="0">
            <tbody>
            <tr>
                <td valign="bottom" colspan="8" class="noborder nopadding">
                    <div class="logocontainer">
                        <div class="logobanco">
                            <img src="data:image/jpg;base64,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" alt="logotipo do banco">
                        </div>
                        <div class="codbanco">033-7</div>
                    </div>
                    <div class="linha-digitavel">${linhaDigitavel}</div>
                </td>
            </tr>
            <tr>
                <td colspan="2" width="250">
                    <div class="titulo">Beneficiário</div>
                    <div class="conteudo">${imobiliaria?.razaoSocial}</div>
                </td>
                <td>
                    <div class="titulo">CPF/CNPJ</div>
                    <div class="conteudo">${imobiliaria?.cnpj}</div>
                </td>
                <td width="120">
                    <div class="titulo">Agência/Código do Beneficiário</div>
                    <div class="conteudo rtl">${boleto.agencia} / ${boleto.nossoNumero}</div>
                </td>
                <td width="110">
                    <div class="titulo">Vencimento</div>
                    <div class="conteudo rtl">${boleto.dataVencimento.toLocaleDateString('pt-BR')}</div>
                </td>
            </tr>
            <tr>
                <td colspan="3">
                    <div class="titulo">Pagador</div>
                    <div class="conteudo">${inquilino.nome}</div>
                </td>
                <td>
                    <div class="titulo">Nº documento</div>
                    <div class="conteudo rtl">${boleto.numeroDocumento}</div>
                </td>
                <td>
                    <div class="titulo">Nosso número</div>
                    <div class="conteudo rtl">${boleto.nossoNumero}</div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="titulo">Espécie</div>
                    <div class="conteudo">REAL</div>
                </td>
                <td>
                    <div class="titulo">Quantidade</div>
                    <div class="conteudo rtl"></div>
                </td>
                <td>
                    <div class="titulo">Valor</div>
                    <div class="conteudo rtl"></div>
                </td>
                <td>
                    <div class="titulo">(-) Descontos / Abatimentos</div>
                    <div class="conteudo rtl"></div>
                </td>
                <td>
                    <div class="titulo">(=) Valor Documento</div>
                    <div class="conteudo rtl">${boleto.valor.toFixed(2)}</div>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <div class="conteudo"></div>
                    <div class="titulo">Demonstrativo</div>
                </td>
                <td>
                    <div class="titulo">(-) Outras deduções</div>
                    <div class="conteudo"></div>
                </td>
                <td>
                    <div class="titulo">(+) Outros acréscimos</div>
                    <div class="conteudo rtl"></div>
                </td>
                <td>
                    <div class="titulo">(=) Valor cobrado</div>
                    <div class="conteudo rtl"></div>
                </td>
            </tr>
            <tr>
                <td colspan="4"><div style="margin-top: 10px" class="conteudo"></div></td>
                <td class="noleftborder"><div class="titulo">Autenticação mecânica</div></td>
            </tr>
            <tr>
                <td colspan="5" class="notopborder"><div class="conteudo"></div></td>
            </tr>
            <tr>
                <td colspan="5" class="notopborder"><div class="conteudo"></div></td>
            </tr>
            <tr>
                <td colspan="5" class="notopborder"><div class="conteudo"></div></td>
            </tr>
            <tr>
                <td colspan="5" class="notopborder bottomborder"><div style="margin-bottom: 10px;" class="conteudo"></div></td>
            </tr>
            </tbody>
        </table>
        <br>
        <div class="linha-pontilhada">Corte na linha pontilhada</div>
        <br>

        <!-- Ficha de compensação -->

<table class="table-boleto" cellpadding="0" cellspacing="0" border="0">
    <tbody>
    <tr>
        <td valign="bottom" colspan="8" class="noborder nopadding">
             <div class="logocontainer">
                        <div class="logobanco">
                            <img src="data:image/jpg;base64,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" alt="logotipo do banco">
                        </div>
                        <div class="codbanco">033-7</div>
                    </div>
                    <div class="linha-digitavel">${linhaDigitavel}</div>
        </td>
    </tr>
    <tr>
        <td colspan="7">
            <div class="titulo">Local de pagamento</div>
            <div class="conteudo">Pagar preferencialmente no Banco Santander</div>
        </td>
        <td width="180">
            <div class="titulo">Vencimento</div>
            <div class="conteudo rtl">${boleto.dataVencimento.toLocaleDateString('pt-BR')}</div>
        </td>
    </tr>
    <tr>
        <td colspan="7" rowspan="2" valign="top">
            <div class="titulo">Beneficiário</div>
            <div class="conteudo float_left">${imobiliaria?.razaoSocial}<br>${imobiliaria?.endereco}<br>${imobiliaria?.cep} - ${imobiliaria?.cidade} - ${imobiliaria?.estado}</div>
            <div class="conteudo cpf_cnpj">${imobiliaria?.cnpj}</div>
            

        </td>
        <td>
            <div class="titulo">Agência/Código beneficiário</div>
            <div class="conteudo rtl">${boleto.agencia} / ${boleto.cedente}</div>
        </td>
    </tr>
    <tr>
        <td>
            <div class="titulo">Nosso número</div>
            <div class="conteudo rtl">${boleto.nossoNumero}</div>
        </td>
    </tr>
    <tr>
        <td width="110" colspan="2">
            <div class="titulo">Data do documento</div>
            <div class="conteudo">${boleto.dataEmissao.toLocaleDateString('pt-BR')}</div>
        </td>
        <td width="120" colspan="2">
            <div class="titulo">Nº documento</div>
            <div class="conteudo">${boleto.numeroDocumento}</div>
        </td>
        <td width="65">
            <div class="titulo">Espécie doc.</div>
            <div class="conteudo">${boleto.especieDocumento}</div>
        </td>
        <td>
            <div class="titulo">Aceite</div>
            <div class="conteudo">${boleto.aceite}</div>
        </td>
        <td width="110">
            <div class="titulo">Data processamento</div>
            <div class="conteudo">${boleto.dataEmissao.toLocaleDateString('pt-BR')}</div>
        </td>
        <td>
            <div class="titulo">(=) Valor do Documento</div>
            <div class="conteudo rtl">${boleto.valor.toFixed(2)}</div>
        </td>
    </tr>
    <tr>
        
        
        <td colspan="3">
            <div class="titulo">Carteira</div>
            <div class="conteudo">Cobrança Simples ECR</div>
        </td>
        <td width="35">
            <div class="titulo">Espécie</div>
            <div class="conteudo">REAL</div>
        </td>
        <td colspan="2">
            <div class="titulo">Quantidade</div>
            <div class="conteudo"></div>
        </td>
        <td width="110">
            <div class="titulo">Valor</div>
            <div class="conteudo"></div>
        </td>
        <td>
            <div class="titulo">(-) Descontos / Abatimentos</div>
            <div class="conteudo rtl"></div>
        </td>
    </tr>
    <tr>
        <td colspan="7" valign="top">
            <div class="titulo">Instruções (Texto de responsabilidade do beneficiário)</div>
        </td>
        <td>
            <div class="titulo">(-) Outras deduções</div>
            <div class="conteudo rtl"></div>
        </td>
    </tr>
    <tr>
        <td colspan="7" class="notopborder" valign="top">
            <div class="conteudo">${boleto.instrucoes}</div>
        </td>
        <td>
            <div class="titulo">(+) Mora / Multa</div>
            <div class="conteudo rtl"></div>
        </td>
    </tr>
    <tr>
        <td colspan="7" class="notopborder">
            <div class="conteudo">REFERENTE AO PERIODO DE  A 20/JANEIRO/2026</div>
            <div class="conteudo">${inquilino.endereco}</div>
        </td>
        <td>
            <div class="titulo">(+) Outros acréscimos</div>
            <div class="conteudo rtl"></div>
        </td>
    </tr>
    <tr>
        <td colspan="7" class="notopborder">
            <div class="conteudo">CONCEDER DESCONTO DE R$ 160,00 PARA PAGAMENTO ATE 21/01/2026.</div>
            <div class="conteudo"></div>
        </td>
        <td>
            <div class="titulo">(=) Valor cobrado</div>
            <div class="conteudo rtl"></div>
        </td>
    </tr>
    <tr>
        <td colspan="7" valign="top">
            <div class="titulo">Pagador</div>
            <div class="conteudo float_left">${inquilino.nome}<br>
            ${inquilino.endereco}
            </div>
            <div class="conteudo cpf_cnpj">${inquilino.cpf}</div>
        </td>
        <td class="noleftborder">
            <div class="titulo" style="margin-top: 50px">Cód. Baixa</div>
        </td>
    </tr>

    <tr>
        <td colspan="6" class="noleftborder">
            <div class="titulo">Pagador / Avalista <div class="conteudo pagador"></div></div>
        </td>
        <td colspan="2" class="norightborder noleftborder">
            <div class="conteudo noborder rtl">Autenticação mecânica - Ficha de Compensação</div>
        </td>
    </tr>

    <tr>
        <td colspan="8" class="noborder">
            //aqui vai o código de barras boa sorte kkk
        </tr>

    </tbody>
</table>
    </div>
    `

    return boletoHTML;

}