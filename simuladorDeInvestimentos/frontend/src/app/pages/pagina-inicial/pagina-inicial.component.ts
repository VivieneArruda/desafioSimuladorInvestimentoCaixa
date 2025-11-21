import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

interface CardInfo {
  titulo: string;
  resumo: string;
  tipo: string;
  link?: string;
}

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.scss'],
})
export class PaginaInicialComponent {
  popupAberto = false;
  popupTitulo = '';
  popupDescricao = '';

  cards: CardInfo[] = [
    {
      titulo: 'Tesouro Direto',
      resumo:
        'Negocie títulos públicos federais de um jeito prático e seguro. O Tesouro Direto é a porta de entrada ideal para quem quer fazer o dinheiro render com a confiança do Governo Federal.',
      tipo: 'tesouro',
    },
    {
      titulo: 'LCI',
      resumo:
        'Invista em títulos de créditos imobiliários com baixo risco, rentabilidade e isenção de Imposto de Renda e proteção do FGC.',
      tipo: 'lci',
    },
    {
      titulo: 'LCA',
      resumo:
        'Invista em títulos de créditos do agronegócio, diversificando seus investimentos e com isenção de Imposto de Renda e a segurança do FGC.',
      tipo: 'lca',
    },
    {
      titulo: 'CDB',
      resumo:
        'Invista em CDB e tenha a combinação perfeita entre rentabilidade, segurança e flexibilidade.',
      tipo: 'cdb',
    },
    {
      titulo: 'Fundos Imobiliários',
      resumo:
        'Invista em Fundos Imobiliários e receba renda mensal de forma simples, acessível e com baixo custo.',
      tipo: 'imobiliarios',
    },
    {
      titulo: 'Previdência',
      resumo:
        'Com a Previdência Privada, você investe de forma simples, flexível e estratégica, construindo uma reserva para aposentadoria, projetos de longo prazo ou proteção familiar.',
      tipo: 'previdencia',
    },
  ];

  abrirPopup(tipo: string) {
    this.popupAberto = true;
    switch (tipo) {
      case 'tesouro':
        this.popupTitulo = 'Tesouro Direto';
        this.popupDescricao =
          'Negocie títulos públicos federais de um jeito prático e seguro.';
        break;
      case 'lci':
        this.popupTitulo = 'LCI - Letra de Crédito Imobiliário';
        this.popupDescricao = `A LCI é um investimento de renda fixa emitido pela CAIXA, lastreado na carteira de empréstimos imobiliários com garantia hipoteca ou alienação fiduciária mantidos pela instituição.
Aplicando em LCI na CAIXA, você conta com a segurança da mais tradicional instituição bancária no mercado imobiliário e ainda contribui para o fomento do setor de crédito imobiliário no país.`;
        break;
      case 'lca':
        this.popupTitulo = 'LCA - Letra de Crédito do Agronegócio';
        this.popupDescricao =
          'Invista em títulos de crédito do agronegócio com rentabilidade, baixo risco e isenção de Imposto de Renda.';
        break;
      case 'cdb':
        this.popupTitulo = 'CDB';
        this.popupDescricao = `• CDB Pré-Fixado: Saiba quanto será seu rendimento na data do vencimento antes mesmo de aplicar.
• CDB Pós-Fixado: Seguro, rentável e super flexível. Você decide por quanto tempo quer deixar seus recursos investidos.
• CDB IPCA+: Inflação subiu? Seu investimento também! Com o CDB CAIXA IPCA+, você não fica para trás.`;
        break;
      case 'imobiliarios':
        this.popupTitulo = 'Fundos Imobiliários';
        this.popupDescricao = `Invista em fundos imobiliários com o banco que também é referência em habitação.
• Fundo de Investimento Imobiliário CAIXA Carteira Imobiliária: Aplicação Inicial R$1.000,00, Público-alvo: Pessoas físicas e jurídicas, Taxa anual 0,70%, Risco: Alto
• CAIXA Rio Bravo Fundo de Fundos de Investimento Imobiliário FII...
...e demais fundos conforme especificado.`;
        break;
      case 'previdencia':
        this.popupTitulo = 'Previdência';
        this.popupDescricao = `É uma forma de investimento em que você contribui com uma quantia em dinheiro por um determinado período e esse valor fica rendendo. 
Os pagamentos podem ser mensais ou de uma só vez e ainda pode fazer contribuições adicionais sempre que tiver uma grana sobrando. 
Quanto mais você investir e por mais tempo, mais seu dinheiro cresce.`;
        break;
    }
  }

  fecharPopup() {
    this.popupAberto = false;
  }
}
