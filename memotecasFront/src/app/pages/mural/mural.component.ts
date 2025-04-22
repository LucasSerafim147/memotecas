import { CommonModule } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  Pensamento,
  PensamentosService,
} from '../../shared/service/pensamentos.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mural',
  standalone: true,
  imports: [CommonModule, RouterModule], // Adicione módulos ou componentes conforme necessário
  templateUrl: './mural.component.html',
  styleUrls: ['./mural.component.css'],
})
export class MuralComponent {
  // sinais para estados reativos
  pensamentos = signal<Pensamento[]>([]);
  pensamentosExibidos = signal<Pensamento[]>([]);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  //variaveis paginacao
  paginaAtual = signal<number>(1);
  itensPorPagina = 6;
  totalItens = signal<number>(0);

  //mapeamento para cards e as aspas

  private readonly cardClasses: Record<number, string> = {
    1: ' card-border-primary',
    2: ' card-border-info',
    3: ' card-border-success',
  };

  private readonly aspasClasses: Record<number, string> = {
    1: 'blockquote-primary',
    2: 'blockquote-info',
    3: 'blockquote-success',
  };

  constructor(private Service: PensamentosService, private router: Router) {
    this.carregarPensamentos();

    effect(() => {
      console.log('Pensamentos no component:', this.pensamentos());
    });
  }
  getCardClass = computed(
    () => (modelo: number) => this.cardClasses[modelo] || this.aspasClasses[1]
  );

  getaAspasClass = computed(
    () => (modelo: number) => this.aspasClasses[modelo] || this.aspasClasses[1]
  );

  carregarPensamentos(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.Service.listar().subscribe({
      next: (pensamentos) => {
        this.pensamentos.set(pensamentos);
        this.isLoading.set(false);
      },
      error: (erro) => {
        console.error('Erro ao carregar pensamentos:', erro);
        this.error.set(
          'Não foi possível carregar os pensamentos. Tente novamente.'
        );
        this.isLoading.set(false);
      },
    });
  }

  atualizaPensamentosExibidos(): void {
    const inicio = (this.paginaAtual() - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.pensamentosExibidos.set(this.pensamentos().slice(inicio, fim));
  }

  totalPaginas = computed(() =>
    Math.ceil(this.totalItens() / this.itensPorPagina)
  );

  mudarPagina(novaPagina: number): void {
    if (novaPagina < 1 || novaPagina > this.totalPaginas()) return;
    this.paginaAtual.set(novaPagina);
    this.atualizaPensamentosExibidos();
  }

  navegarParaFormuario(): void {
    this.router.navigate(['/formulario']);
  }

  confirmarDeletar(pensamento: Pensamento): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Esta ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deletarPensamento(pensamento);
      }
    });
  }

  private deletarPensamento(pensamento: Pensamento): void {
    if (!pensamento.Id) {
      Swal.fire('erro!', 'Id do pensamento inváldo', 'error');
      return;
    }
    this.Service.deletar(pensamento.Id).subscribe({
      next: () => {
        Swal.fire('Sucesso!', 'Pensamento excluído com sucesso.', 'success');
        this.carregarPensamentos(); // Recarrega a lista
      },
      error: (erro) => {
        console.error('Erro ao excluir pensamento:', erro);
        Swal.fire('Erro!', 'Não foi possível excluir o pensamento.', 'error');
      },
    });
  }

  editarPensamento(pensamento: Pensamento): void {
    this.router.navigate(['/formulario'], {
      state: { pensamento },
    });
  }
}
