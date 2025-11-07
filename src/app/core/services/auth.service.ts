import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface Usuario {
  nombre: string;
  email: string;
  rol: 'admin' | 'estudiante';
}

export const currentUserSignal = signal<Usuario | null>(null); 

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private API = 'http://localhost:3000/api/auth';

  login(email: string, password: string) {
    return this.http.post<{ token: string; usuario: Usuario }>(`${this.API}/login`, {
      email,
      contraseña: password
    });
  }

  registro(nombre: string, email: string, password: string, rol: 'admin' | 'estudiante') {
    return this.http.post<{ token: string; usuario: Usuario }>(`${this.API}/registro`, {
      nombre,
      email,
      contraseña: password,
      rol
    });
  }

  guardarSesion(token: string, usuario: Usuario) {
    localStorage.setItem('token', token);
    currentUserSignal.set(usuario);
  }

  logout() {
    currentUserSignal.set(null);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  cargarSesionDesdeStorage() {
    const token = localStorage.getItem('token');
    if (token) {
      
    }
  }
}