import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsuariosComponent } from "./componentes/usuarios/usuarios.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UsuariosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'exercicios10';
}
