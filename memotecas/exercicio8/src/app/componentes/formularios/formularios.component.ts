import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators, FormControl, FormGroup } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-forms-validation',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxMaskDirective  ],
  templateUrl: './formularios.component.html',
  styleUrls: ['./formularios.component.css']
})
export class FormsValidationComponent {
  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefone: new FormControl('', [Validators.required, Validators.pattern(/^\d{11,12}$/)]),
    data: new FormControl('', [Validators.required])
  });

  
  get nome() {
    return this.formulario.get('nome')!;
  }

  get email() {
    return this.formulario.get('email')!;
  }

  get telefone() {
    return this.formulario.get('telefone')!;
  }

  get data() {
    return this.formulario.get('data')!;
  }

  onSubmit() {
    if (this.formulario.valid) {
      console.log('Formulário válido', this.formulario.value);
    } else {
      console.log('Formulário inválido');
      this.formulario.markAllAsTouched(); // Marca todos os campos como tocados para exibir erros
    }
  }
}