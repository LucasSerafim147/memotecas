import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsValidationComponent } from "./componentes/formularios/formularios.component";

@Component({
  selector: 'app-root',
  imports: [FormsValidationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'exercicio8';
}
