import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Prestamo {
  _id: string;
  libro: {
    titulo: string;
    autor: string;
  };
  usuario?: {
    nombre: string;
    email: string;
  };
  fechaPrestamo: string;
  fechaDevolucion?: string;
  estado: 'prestado' | 'devuelto';
}

@Injectable({ providedIn: 'root' })
export class PrestamosService {
  private http = inject(HttpClient);
  private API = 'https://supra-backend-30hh.onrender.com/api/prestamos';

  private getHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token ?? ''}`)
    };
  }

  // ✅ Préstamos del usuario autenticado
  obtenerMisPrestamos(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(`${this.API}/mios`, this.getHeaders());
  }

  // ✅ Todos los préstamos (admin)
  obtenerPrestamos(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(this.API, this.getHeaders());
  }

  // ✅ Crear préstamo como admin
  crearPrestamo(data: { libroId: string; usuarioId: string }): Observable<{ mensaje: string }> {
    return this.http.post<{ mensaje: string }>(`${this.API}`, data, this.getHeaders());
  }

  // ✅ Solicitar préstamo como estudiante
  solicitarPrestamo(libroId: string): Observable<{ mensaje: string }> {
  return this.http.post<{ mensaje: string }>(
    `${this.API}/solicitar`,
    { libroId },
    this.getHeaders()
  );
}

  // ✅ Marcar préstamo como devuelto
  devolverPrestamo(id: string): Observable<{ mensaje: string }> {
    return this.http.put<{ mensaje: string }>(`${this.API}/${id}/devolver`, {}, this.getHeaders());
  }

  // ✅ Historial por estudiante (admin)
  obtenerPrestamosPorUsuario(usuarioId: string): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(`${this.API}/usuario/${usuarioId}`, this.getHeaders());
  }
}