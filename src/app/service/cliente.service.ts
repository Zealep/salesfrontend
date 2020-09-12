import { Respuesta } from './../model/respuesta';
import { catchError } from 'rxjs/operators';
import { Cliente } from './../model/cliente';
import { HOST } from './../shared/constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url: string = `${HOST}/cliente`;

  constructor(private http: HttpClient) { }

  getAll() {        
    return this.http.get<Cliente[]>(`${this.url}/list`)
    .pipe(
      catchError(this.handleError)
    );  
  }

  getById(id: number) {
    return this.http.get<Cliente>(`${this.url}/find/${id}`);
  }


  save( x: Cliente) {
    return this.http.post<Respuesta>(`${this.url}/save`, x)
    .pipe(
      catchError(this.handleError)
    );
  }
  

  update(x: Cliente) {
    return this.http.put<Respuesta>(`${this.url}/save`, x)
    .pipe(
      catchError(this.handleError)
    );
  }

  eliminar(id: number) {
    return this.http.delete<Respuesta>(`${this.url}/delete/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.log('Client error', error.error.message);
    } else {
      // Error en el lado del servidor
      console.log('Error Status:', error.status);
      console.log('Error:', error.error);
    }
    //catch and rethrow
    return throwError('Cannot perform the request, please try again later');

  }
}
