import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Prestamo {
  _id: string;
  libro: {
    titulo: string;
    autor: string;
  };
  fechaPrestamo: string;
  fechaDevolucion?: string;
  estado: 'prestado' | 'devuelto';
}

@Injectable({ providedIn: 'root' })
export class PrestamosService {
  private http = inject(HttpClient);
  private API = 'http://localhost:3000/api/prestamos';

  private getHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token ?? ''}`)
    };
  }

  obtenerMisPrestamos(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(`${this.API}/mios`, this.getHeaders());
  }

  crearPrestamo(libroId: string): Observable<any> {
    
    return this.http.post(`${this.API}`, { libroId }, this.getHeaders());
  }

  devolverPrestamo(id: string): Observable<any> {
  return this.http.put(`${this.API}/${id}/devolver`, {}, this.getHeaders());
}
}