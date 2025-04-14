import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators, FormControl, FormGroup } from '@angular/forms';
import { get } from 'http';

@Component({
  selector: 'app-tarefa8',
  imports: [ReactiveFormsModule],
  templateUrl: './tarefa8.component.html',
  styleUrl: './tarefa8.component.css'
})
export class Tarefa8Component {
  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    instituicao: new FormControl('', [Validators.required, Validators.minLength(3)]),

    
})


get nome() {
  return this.formulario.get('nome')!;
}

get email() {
  return this.formulario.get('email')!;
}

get telefone() {
  return this.formulario.get('instituicao')!;
}



onSubmit() {
  if (this.formulario.valid) {
    console.log('Formulário válido', this.formulario.value);
  } else {
    console.log('Formulário inválido');
    this.formulario.markAllAsTouched(); 
  }
}
}
