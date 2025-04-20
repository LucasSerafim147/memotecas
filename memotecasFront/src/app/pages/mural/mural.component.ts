import { Component } from '@angular/core';

@Component({
  selector: 'app-mural',
  standalone: true,
  imports: [], // Adicione módulos ou componentes conforme necessário
  template: `
    <h1>Mural de Pensamentos</h1>
    <p>Bem-vindo ao mural!</p>
  `,
  styleUrls: ['./mural.component.css']
})
export class MuralComponent {}