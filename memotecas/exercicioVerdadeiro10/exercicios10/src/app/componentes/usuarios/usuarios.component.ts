import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  imports: [],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {

  usuarioAtivo: boolean | null = null; // começa como nulo


  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.verificarStatusAtivo();
  }

  verificarStatusAtivo(){
    this.http.get<{ ativo: boolean}>('http://localhost:3000/usuario',{})
    .subscribe({
      next:(resposta) => { this.usuarioAtivo = resposta.ativo}
    })
  }
}
