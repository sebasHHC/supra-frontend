import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

export interface Usuario {
  _id: string;
  nombre: string;
  email: string;
  rol: 'admin' | 'estudiante';
}

export const currentUserSignal = signal<Usuario | null>(null);

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private API = `${environment.apiUrl}/auth`; // ✅ URL dinámica

  // ✅ Login normal
  login(email: string, password: string) {
    return this.http.post<{ token: string; usuario: Usuario }>(`${this.API}/login`, {
      email,
      contraseña: password
    });
  }

  // ✅ Registro forzado como estudiante
  registro(nombre: string, email: string, password: string) {
    const rol: 'estudiante' = 'estudiante'; // 🔒 bloqueado
    return this.http.post<{ token: string; usuario: Usuario }>(`${this.API}/registro`, {
      nombre,
      email,
      contraseña: password,
      rol
    });
  }

  // ✅ Guardar sesión
  guardarSesion(token: string, usuario: Usuario): void {
    localStorage.setItem('token', token);
    currentUserSignal.set(usuario);
  }

  // ✅ Cerrar sesión
  logout(): void {
    currentUserSignal.set(null);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // ✅ Obtener token actual
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // ✅ Cargar sesión desde storage (opcional)
  cargarSesionDesdeStorage(): void {
    const token = localStorage.getItem('token');
    if (token) {
      // Aquí podrías agregar lógica para validar el token o cargar el usuario desde el backend
    }
  }
}