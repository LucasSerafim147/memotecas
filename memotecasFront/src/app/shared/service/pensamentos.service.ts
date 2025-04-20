import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pensamento {
  id?: number;
  Pensamento: string;
  Autor: string;
  Modelos: number;
}

@Injectable({
  providedIn: 'root'
})
export class PensamentosService {
  private readonly API = 'https://localhost:7177/api/pensamentos'; 

  constructor(private http: HttpClient) {
    console.log('PensamentosService inicializado com API:', this.API);
  }

  listar(): Observable<Pensamento[]> {
    console.log('Listando pensamentos da API:', this.API);
    return this.http.get<Pensamento[]>(this.API);
  }

  criar(pensamento: Pensamento): Observable<Pensamento> {
    console.log('Enviando pensamento para API:', pensamento);
  return this.http.post<Pensamento>(this.API, pensamento);
  }

  deletar(id: number): Observable<void> {
    console.log('Deletando pensamento com ID:', id);
    return this.http.delete<void>(`${this.API}/${id}`);
  }

  atualizar(pensamento: Pensamento): Observable<Pensamento> {
    const payload = {
      pensamento: pensamento.Pensamento,
      autor: pensamento.Autor,
      modelo: pensamento.Modelos
    };
    console.log('Atualizando pensamento:', payload);
    return this.http.put<Pensamento>(`${this.API}/${pensamento.id}`, payload);
  }
}