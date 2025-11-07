import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Libro {
  _id: string;
  titulo: string;
  autor: string;
  genero: string;
  anio: number;
  disponible: boolean;
  descripcion: string;
}

@Injectable({ providedIn: 'root' })
export class LibrosService {
  private http = inject(HttpClient);
  private API = `${environment.apiUrl}/libros`; // ✅ URL dinámica

  private getHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token ?? ''}`)
    };
  }

  obtenerLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.API, this.getHeaders());
  }

  crearLibro(libro: Partial<Libro>): Observable<Libro> {
    return this.http.post<Libro>(this.API, libro, this.getHeaders());
  }

  actualizarLibro(id: string, libro: Partial<Libro>): Observable<Libro> {
    return this.http.put<Libro>(`${this.API}/${id}`, libro, this.getHeaders());
  }

  eliminarLibro(id: string): Observable<{ mensaje: string }> {
    return this.http.delete<{ mensaje: string }>(`${this.API}/${id}`, this.getHeaders());
  }
}