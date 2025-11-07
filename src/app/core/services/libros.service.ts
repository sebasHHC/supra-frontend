import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Libro } from '../../models/libro.model';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class LibrosService {
  private http = inject(HttpClient);
  private API = 'http://localhost:3000/api/libros';

  private getHeaders() {
  const token = localStorage.getItem('token');
  return {
    headers: new HttpHeaders({
      Authorization: `Bearer ${token || ''}` 
    })
  };
}

  obtenerLibros(): Observable<Libro[]> {
  return this.http.get<Libro[]>(this.API, this.getHeaders());
}

  crearLibro(libro: Partial<Libro>) {
    return this.http.post<Libro>(this.API, libro, this.getHeaders());
  }

  actualizarLibro(id: string, libro: Partial<Libro>) {
    return this.http.put<Libro>(`${this.API}/${id}`, libro, this.getHeaders());
  }

  eliminarLibro(id: string) {
    return this.http.delete<{ mensaje: string }>(`${this.API}/${id}`, this.getHeaders());
  }

  
}

const ejemplo: Libro = {
  _id: '123',
  titulo: 'Prueba',
  autor: 'Sebastián',
  genero: 'Ficción',
  anio: 2020,
  disponible: true,
  descripcion: 'Ejemplo de libro para pruebas internas'
};