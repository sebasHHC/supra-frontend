import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { currentUserSignal, AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <a routerLink="/">📚 Biblioteca</a>
      <a *ngIf="!usuario()" routerLink="/login">🔐 Login</a>
      <a *ngIf="!usuario()" routerLink="/registro">📝 Registro</a>

      <!-- Opciones para administrador -->
      <ng-container *ngIf="usuario()?.rol === 'admin'">
        <a routerLink="/admin">👤 Admin</a>
        <a routerLink="/admin/prestamos">📕 Gestionar préstamos</a>
        <a routerLink="/admin/historial-estudiante">📖 Historial estudiante</a>
      </ng-container>

      <!-- Opciones para estudiante -->
      <a *ngIf="usuario()?.rol === 'estudiante'" routerLink="/prestamos">📖 Mis Préstamos</a>

      <button *ngIf="usuario()" (click)="logout()">🚪 Deslogear</button>
    </nav>
  `,
  styles: [`
  .navbar {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 1rem 2rem;
    background-color: #ffffff;
    border-bottom: 1px solid #e0e0e0;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    align-items: center;
    justify-content: flex-start;
    font-family: 'Segoe UI', sans-serif;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  a {
    font-weight: 500;
    color: #34495e;
    text-decoration: none;
    padding: 0.5rem 0.9rem;
    border-radius: 4px;
    transition: background-color 0.2s ease, transform 0.2s ease;
    background-color: #f9f9f9;
  }

  a:hover {
    background-color: #dfe6e9;
    transform: translateY(-1px);
  }

  button {
    background-color: #fbe9e7;
    border: none;
    color: #d32f2f;
    font-weight: 600;
    padding: 0.5rem 0.9rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.2s ease;
  }

  button:hover {
    background-color: #ffcdd2;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    .navbar {
      flex-direction: column;
      align-items: flex-start;
      padding: 1rem;
    }

    a, button {
      width: 100%;
      text-align: left;
    }
  }
`]
})
export class NavbarComponent {
  usuario = currentUserSignal;

  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}