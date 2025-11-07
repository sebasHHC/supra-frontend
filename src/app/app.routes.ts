import { Routes } from '@angular/router';
import { canActivateAdmin, canActivateEstudiante } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'libros-estudiante',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'registro',
    loadComponent: () => import('./features/auth/registro.component').then(m => m.RegistroComponent)
  },
  {
    path: 'admin',
    //canActivate: [canActivateAdmin], //  Protegido para admin
    loadComponent: () => import('./features/libros/admin-libros.component').then(m => m.AdminLibrosComponent)
  },
  {
    path: 'libros-estudiante',
    //canActivate: [canActivateEstudiante], //  Protegido para estudiante
    loadComponent: () => import('./features/estudiante-libros/estudiante-libros.component').then(m => m.EstudianteLibrosComponent)
  },
  {
    path: 'prestamos',
    //canActivate: [canActivateEstudiante], //  Solo estudiantes pueden ver sus préstamos
    loadComponent: () => import('./features/prestamos/prestamos.component').then(m => m.PrestamosComponent)
  },
  {
  path: 'denegado',
  loadComponent: () => import('./features/acceso-denegado/acceso-denegado.component').then(m => m.AccesoDenegadoComponent)
}
];