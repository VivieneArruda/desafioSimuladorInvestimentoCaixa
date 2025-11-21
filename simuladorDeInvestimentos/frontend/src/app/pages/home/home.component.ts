import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

interface Opcao {
  label: string;
  value: number; // peso
}

interface Pergunta {
  pergunta: string;
  tipo?: 'numero';
  opcoes?: Opcao[];
  resposta?: number | null;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  currentStep = 0;

  // para o input numérico
  valorFormatado = '';
  valorInicial: number | null = null;

  perguntas: Pergunta[] = [
    /* -------------------- SITUAÇÃO FINANCEIRA -------------------- */

    {
      pergunta: 'Qual é sua faixa de idade?',
      opcoes: [
        { label: 'Menos de 25 anos', value: 0 },
        { label: 'Entre 26 e 40 anos', value: 1 },
        { label: 'Entre 40 e 60 anos', value: 2 },
        { label: 'Acima de 60 anos', value: 3 },
      ],
    },

    {
      pergunta: 'Você possui dependentes? Quantos?',
      opcoes: [
        { label: 'Possuo 3 ou mais dependentes', value: 0 },
        { label: 'Possuo 2 dependentes', value: 1 },
        { label: 'Possuo 1 dependente', value: 2 },
        { label: 'Não possuo', value: 3 },
      ],
    },

    {
      pergunta:
        'Em geral seus gastos mensais consomem quanto da sua renda mensal?',
      opcoes: [
        { label: 'Praticamente toda', value: 0 },
        { label: 'Entre 75 % e 90 %', value: 1 },
        { label: 'Entre metade e 75 %', value: 2 },
        { label: 'Menos da metade', value: 3 },
      ],
    },

    {
      pergunta: 'Qual a sua faixa de renda?',
      opcoes: [
        { label: 'Até 2 mil', value: 0 },
        { label: 'Mais de 2 mil até 7 mil', value: 1 },
        { label: 'Mais de 7 mil até 10 mil', value: 2 },
        { label: 'Acima 10 mil', value: 3 },
      ],
    },

    {
      pergunta:
        'Qual é o valor aproximado do seu patrimônio total (incluindo investimentos, poupança e reservas)?',
      opcoes: [
        { label: 'Até R$ 10.000', value: 0 },
        { label: 'R$ 10.000 a 50.000', value: 1 },
        { label: 'R$ 50.000 a 150.000', value: 2 },
        { label: 'Acima de R$ 150.000', value: 3 },
      ],
    },

    /* -------------------- VALOR A INVESTIR (NUMÉRICO) -------------------- */
    {
      pergunta: 'Qual valor você deseja aplicar?',
      tipo: 'numero',
      resposta: null,
    },

    /* -------------------- OBJETIVOS / HORIZONTE -------------------- */
    {
      pergunta: 'Qual seu prazo para atingir seus objetivos financeiros?',
      opcoes: [
        { label: 'Até 1 ano', value: 0 },
        { label: '1 a 3 anos', value: 2 },
        { label: '3 a 5 anos', value: 3 },
        { label: 'Acima de 5 anos', value: 4 },
      ],
    },

    {
      pergunta: 'Qual sua necessidade de liquidez?',
      opcoes: [
        { label: 'Imediatamente, a qualquer momento', value: 0 },
        { label: 'Posso aguardar algum tempo', value: 1 },
        { label: 'Não tenho necessidade de resgate rápido', value: 4 },
      ],
    },

    /* -------------------- CONHECIMENTO -------------------- */

    /* -------------------- TOLERÂNCIA AO RISCO -------------------- */
    {
      pergunta:
        'Caso ocorresse uma crise inesperada que afetasse seus investimentos, quanto tempo esperaria para recuperar o valor?',
      opcoes: [
        { label: 'Solicitaria o resgate imediatamente', value: 0 },
        { label: ' De 6 meses até 1 ano no máximo', value: 2 },
        { label: ' Mais de 1 ano se fosse preciso', value: 4 },
      ],
    },

    {
      pergunta: 'Como investidor suas preferencias são:',
      opcoes: [
        {
          label:
            'Um investimento seguro, com baixíssimas possibilidades de perda',
          value: 0,
        },
        {
          label: 'Obter ganhos razoáveis, correndo algum risco para isso',
          value: 2,
        },
        {
          label:
            'Gerar altos ganhos, mesmo sabendo que isso me traz risco em potencial',
          value: 4,
        },
      ],
    },

    {
      pergunta: 'O que você prioriza ao investir?',
      opcoes: [
        { label: 'Segurança', value: 0 },
        { label: 'Equilíbrio entre risco e retorno', value: 2 },
        { label: 'Retorno máximo mesmo com risco', value: 4 },
      ],
    },
  ];

  constructor(private router: Router) {}

  /* ======== seleção por botões ======== */
  selecionarOpcao(opcao: Opcao) {
    // registra peso da opção
    this.perguntas[this.currentStep].resposta = opcao.value;
    this.proximaPergunta();
  }

  /* ======== input numérico ======== */
  onValorChange(event: any) {
    // formata como reais (ex.: 1.234,56)
    let somenteDigitos = String(event.target.value).replace(/\D/g, '');
    if (!somenteDigitos) {
      this.valorFormatado = '';
      this.valorInicial = null;
      this.perguntas[this.currentStep].resposta = null;
      return;
    }

    // tratar centavos
    if (somenteDigitos.length === 1) somenteDigitos = '0' + somenteDigitos; // "5" -> "05"
    const numero = parseInt(somenteDigitos, 10);
    const reais = (numero / 100).toFixed(2); // string com ponto decimal

    // formatar para pt-BR: separador de milhares e vírgula decimal
    const [inteiro, decimais] = reais.split('.');
    const inteiroFormatado = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    this.valorFormatado = `${inteiroFormatado},${decimais}`;

    // manter valor numérico como number (ex: 1234.56)
    this.valorInicial = parseFloat(reais);
    // opcional: gravar na pergunta atual (resposta numérica) — armazenamos peso especial abaixo
    this.perguntas[this.currentStep].resposta = this.valorInicial;
  }

  validarValorAtual(): boolean {
    const pergunta = this.perguntas[this.currentStep];
    if (pergunta.tipo === 'numero') {
      if (!this.valorInicial || this.valorInicial <= 0) {
        alert('Informe um valor inicial válido (maior que zero).');
        return false;
      }
    }
    return true;
  }

  /* ======== avançar ======== */
  proximaPergunta() {
    // validação para campo numero
    if (!this.validarValorAtual()) return;

    this.currentStep++;

    if (this.currentStep >= this.perguntas.length) {
      // Quando finalizar, somamos os pontos **ignorando** o valor numérico como ponto direto.
      // Observação: o valor investido pode ser usado depois para aconselhamento — não somamos direto na pontuação de perfil.
      const pontos = this.perguntas.reduce((acc, p) => {
        // a pergunta tipo 'numero' não soma pontos na escala de perfil — ela alimenta apenas 'valorInicial'
        if (p.tipo === 'numero') return acc;
        return acc + (p.resposta ?? 0);
      }, 0);

      let perfil = 'Conservador';
      if (pontos >= 25) perfil = 'Arrojado';
      else if (pontos >= 15) perfil = 'Moderado';

      // navega para dashboard (ou outra rota), incluindo valorInicial e respostas
      this.router.navigate(['/dashboard'], {
        state: {
          perfil,
          pontos,
          valorInicial: this.valorInicial,
          respostas: this.perguntas.map((p) => ({
            pergunta: p.pergunta,
            resposta: p.resposta,
          })),
        },
      });
    }
  }

  /* ======== voltar (opcional) ======== */
  voltarPergunta() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }
}
