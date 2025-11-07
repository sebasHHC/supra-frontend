import { signal } from '@angular/core';

export interface Usuario {
  nombre: string;
  email: string;
  rol: 'admin' | 'estudiante';
}


export const currentUserSignal = signal<Usuario | null>(null);


export function getCurrentUser(): Usuario | null {
  return JSON.parse(localStorage.getItem('usuario') || 'null');
}


export function sincronizarUsuarioDesdeStorage() {
  currentUserSignal.set(getCurrentUser());
}