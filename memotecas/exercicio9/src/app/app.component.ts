import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Tarefa8Component } from "./componentes/tarefa8/tarefa8.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Tarefa8Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'exercicio9';
}
