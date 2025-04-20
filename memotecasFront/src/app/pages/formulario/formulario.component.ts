import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Pensamento } from '../../shared/service/pensamentos.service';
import { PensamentosService } from '../../shared/service/pensamentos.service';
import Swal from 'sweetalert2';





@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
  formulario: FormGroup;
  pensamentoParaEditar?: Pensamento;
  estaEditando: boolean = false;

  constructor(
    private form: FormBuilder,
    private router: Router,
    private pensamentoService: PensamentosService
  ) {


    const navigation = this.router.getCurrentNavigation();
    this.pensamentoParaEditar = navigation?.extras.state?.['pensamento'];
    this.estaEditando = !!this.pensamentoParaEditar;

    this.formulario = this.form.group({
      pensamento: ['', [Validators.required, Validators.maxLength(300)]],
      autor: ['', [Validators.required, Validators.maxLength(50)]],
      modelo: ['1', Validators.required]
    });

    if (this.estaEditando) {
      this.carregarDadosParaEdicao();
    }
  }

  carregarDadosParaEdicao() {
    if (this.pensamentoParaEditar) {
      this.formulario.patchValue({
        pensamento: this.pensamentoParaEditar.Pensamento,
        autor: this.pensamentoParaEditar.Autor,
        modelo: this.pensamentoParaEditar.Modelos.toString()
      });
    }
  }

 
  get f() {
    return this.formulario.controls;
  }

  limparCampos() {
    this.formulario.reset({
      modelo: '1'
    });
  }

  cancelar() {
    this.limparCampos();
    this.voltarParaMural();
  }

  voltarParaMural() {
    this.router.navigate(['/mural']);
  }

  onSubmit() {
    console.log('Formulário submetido');
    console.log('Formulário válido:', this.formulario.valid);
    console.log('Valores do formulário:', this.formulario.value);
    console.log('Erros do formulário:', this.formulario.errors);
    if (this.formulario.valid) {
      const pensamento: Pensamento = {
        Pensamento: this.formulario.value.pensamento,
        Autor: this.formulario.value.autor,
        Modelos: Number(this.formulario.value.modelo)
      };
      console.log('Pensamento a ser enviado:', pensamento);
      if (this.estaEditando && this.pensamentoParaEditar?.Id) {
        pensamento.Id = this.pensamentoParaEditar.Id;
        this.atualizarPensamento(pensamento);
      } else {
        this.criarPensamento(pensamento);
      }

    }else {
      console.log('Formulário inválido, erros:', this.formulario.controls);
    }
  }

  criarPensamento(pensamento: Pensamento) {
    console.log('Enviando pensamento para o serviço:', pensamento);
    this.pensamentoService.criar(pensamento).subscribe({
      next: (response) => {
        console.log('Resposta da API:', response)
        Swal.fire({
          title: 'Sucesso!',
          text: 'Pensamento criado com sucesso!',
          icon: 'success'
        }).then(() => {
          this.limparCampos();
          this.voltarParaMural();
        });
      },
      error: (erro) => {
        console.error('Erro ao criar pensamento', erro);
        Swal.fire('Erro!!', 'Não foi possível criar o pensamento', 'error');
      }
    });
  }

  atualizarPensamento(pensamento: Pensamento) {
    if (!pensamento.Id) return;

    this.pensamentoService.atualizar(pensamento).subscribe({
      next: () => {
        Swal.fire({
          title: 'Sucesso!',
          text: 'Pensamento atualizado com sucesso!',
          icon: 'success'
        }).then(() => {
          this.voltarParaMural();
        });
      },
      error: (erro) => {
        console.error('Erro ao atualizar pensamento', erro);
        Swal.fire('Erro!', 'Não foi possível atualizar o pensamento', 'error');
      }
    });
  }
}