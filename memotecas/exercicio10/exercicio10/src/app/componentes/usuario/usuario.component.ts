import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuarioAtivo: boolean | null = null;
  corFundo: string = '';

  ngOnInit(): void {
    fetch('http://localhost:3000/usuario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
      mode: 'cors'
    })
      .then(response => {
        if (!response.ok) throw new Error('Erro na requisição');
        return response.json();
      })
      .then(data => {
        this.usuarioAtivo = data.usuarioAtivo;
        this.corFundo = this.usuarioAtivo ? 'bg-light-blue' : 'bg-light-red';
      })
      .catch(() => {
        this.usuarioAtivo = false;
        this.corFundo = 'bg-light-red';
      });
  }
}