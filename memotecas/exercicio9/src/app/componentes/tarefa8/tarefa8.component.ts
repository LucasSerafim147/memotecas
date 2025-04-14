import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tarefa8',
  imports: [ReactiveFormsModule, CommonModule,  ],
  templateUrl: './tarefa8.component.html',
  styleUrls: ['./tarefa8.component.css']
})
export class Tarefa8Component implements OnInit {
  formulario!: FormGroup;


  ngOnInit() {
    this.formulario = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      
      instituicao: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  get nome() {
    return this.formulario.get('nome')!;
  }

  get email() {
    return this.formulario.get('email')!;
  }


  get instituicao() {
    return this.formulario.get('instituicao')!;
  }

  onSubmit() {
    if (this.formulario.valid) {
      alert('Formulário válido');
      console.log(this.formulario.value)
    } else {
      alert('Formulário inválido');
      this.formulario.markAllAsTouched();
    }
  }
}