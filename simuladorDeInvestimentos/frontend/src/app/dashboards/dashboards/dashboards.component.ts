import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { Router } from '@angular/router';

import {
  MatDialog,
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';

interface Produto {
  id: number;
  nome: string;
  tipo: string;
  descricao: string;
  rentabilidade: number;
  risco: string;
}

@Component({
  selector: 'dialog-investimento',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data.nome }}</h2>

    <div mat-dialog-content>
      <p>{{ data.descricaoCompleta }}</p>
    </div>

    <div mat-dialog-actions align="end">
      <button mat-button (click)="dialogRef.close()">Fechar</button>
    </div>
  `,
})
export class DialogInvestimentoComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogInvestimentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}

@Component({
  selector: 'app-dashboards',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    BaseChartDirective,
  ],
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss'],
})
export class DashboardsComponent implements OnInit {
  perfil = '';
  valorInicial = 10000;

  meses: string[] = Array.from({ length: 12 }, (_, i) => `Mês ${i + 1}`);

  produtos: Produto[] = [
    {
      id: 100,
      nome: 'Tesouro Direto Selic 2027',
      tipo: 'Tesouro Direto',
      descricao:
        'Título público federal indicado para iniciantes, com alta segurança.',
      rentabilidade: 0.105,
      risco: 'Baixo',
    },
    {
      id: 101,
      nome: 'CDB Caixa 2026',
      tipo: 'Renda Fixa',
      descricao: 'CDB pós-fixado de baixo risco.',
      rentabilidade: 0.13,
      risco: 'Baixo',
    },
    {
      id: 102,
      nome: 'Fundo Agressivo Renda Variável',
      tipo: 'Fundos de Investimento',
      descricao: 'Fundo de ações mais arrojado.',
      rentabilidade: 0.18,
      risco: 'Alto',
    },
    {
      id: 103,
      nome: 'LCI Caixa Imobiliário',
      tipo: 'LCI/LCA',
      descricao: 'Letra de crédito imobiliário isenta de IR.',
      rentabilidade: 0.15,
      risco: 'Médio',
    },
    {
      id: 104,
      nome: 'Previdência Privada Caixa',
      tipo: 'Previdência',
      descricao: 'Plano de previdência para longo prazo.',
      rentabilidade: 0.15,
      risco: 'Médio',
    },
  ];

  cores: string[] = ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF'];

  chartDataLinha: ChartData<'line'> = {
    labels: this.meses,
    datasets: [],
  };

  chartDataBarra: ChartData<'bar'> = {
    labels: this.meses,
    datasets: [],
  };

  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
    },
  };

  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    const state = history.state;
    this.perfil = state.perfil || 'Moderado';
    this.valorInicial = state.valorInicial || 10000;

    this.simularTodosProdutos();
  }

  simularTodosProdutos() {
    this.produtos.forEach((produto, idx) => {
      const taxaMensal = Math.pow(1 + produto.rentabilidade, 1 / 12) - 1;

      const valores = this.meses.map(
        (_, i) =>
          +(this.valorInicial * Math.pow(1 + taxaMensal, i + 1)).toFixed(2)
      );

      this.chartDataLinha.datasets.push({
        label: produto.nome,
        data: valores,
        borderColor: this.cores[idx],
        backgroundColor: this.cores[idx],
        fill: false,
        tension: 0.3,
      });

      this.chartDataBarra.datasets.push({
        label: produto.nome,
        data: valores,
        backgroundColor: this.cores[idx],
      });
    });
  }

  abrirPopup(produto: Produto) {
    this.dialog.open(DialogInvestimentoComponent, {
      width: '420px',
      data: {
        nome: produto.nome,
        descricaoCompleta: `${produto.descricao}

Tipo: ${produto.tipo}
Risco: ${produto.risco}
Rentabilidade anual: ${(produto.rentabilidade * 100).toFixed(2)}%`,
      },
    });
  }

  solicitarContato() {
    this.router.navigate(['/formContatoGerente']);
  }
}
