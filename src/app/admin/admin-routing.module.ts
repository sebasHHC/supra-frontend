import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Libro {
  _id?: string;
  titulo: string;
  autor: string;
  disponible: boolean;
}

@Injectable({ providedIn: 'root' })
export class LibrosService {
  private API = 'http://localhost:3000/api/libros';

  constructor(private http: HttpClient) {}

  obtenerLibros() {
    return this.http.get<Libro[]>(this.API);
  }

  agregarLibro(libro: Libro) {
    return this.http.post<Libro>(this.API, libro);
  }

  eliminarLibro(id: string) {
    return this.http.delete(`${this.API}/${id}`);
  }
}