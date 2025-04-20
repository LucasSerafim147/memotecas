import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Pensamento{
  id?: number,
  pensamento:string,
  autor:string,
  modelo:number
}


@Injectable({
  providedIn: 'root'
})
export class PensamentosService {
  private readonly API =  'https://localhost:7177/swagger/index.html'

  constructor(private http: HttpClient) { 
    console.log("httpeCliente Injetado", http)
  }

  listar(): Observable<Pensamento[]> {
    return this.http.get<Pensamento[]>(this.API);
  }

  criar(pensamento: Pensamento): Observable<Pensamento> {
    return this.http.post<Pensamento>(this.API, pensamento);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`);
  }

  atualizar(pensamento: Pensamento): Observable<Pensamento> {
    return this.http.put<Pensamento>(`${this.API}/${pensamento.id}`, pensamento);
  }
}

