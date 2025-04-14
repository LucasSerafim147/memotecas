import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsuarioComponent,} from "./componentes/usuario/usuario.component";

@Component({
  selector: 'app-root',
  imports: [UsuarioComponent, UsuarioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'exercicio10';
}
