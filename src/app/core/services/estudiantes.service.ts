import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './auth.service'; // Reutilizamos la interfaz

@Injectable({ providedIn: 'root' })
export class EstudiantesService {
  private http = inject(HttpClient);
  private API = 'http://localhost:3000/api/estudiantes';

  private getHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token ?? ''}`)
    };
  }

  obtenerEstudiantes(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.API, this.getHeaders());
  }
}