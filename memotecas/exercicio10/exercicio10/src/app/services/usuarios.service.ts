import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = 'http://localhost:3000/usuarios'
  constructor(private http: HttpClient) { }
  
  verificarUsuarioAtivo(): Observable<{ usuarioAtivo: boolean }> {
    return this.http.post<{ usuarioAtivo: boolean }>(this.apiUrl, {});
  }

  }

