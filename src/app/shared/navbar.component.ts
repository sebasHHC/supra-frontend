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
      <a *ngIf="usuario()?.rol === 'admin'" routerLink="/admin">👤 Admin</a>
      <a *ngIf="usuario()?.rol === 'estudiante'" routerLink="/prestamos">📖 Mis Préstamos</a>
      <button *ngIf="usuario()" (click)="logout()">🚪 deslogear</button>
    </nav>
  `,
  styles: [`
  .navbar {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1rem 2rem;
    background-color: #f5f7fa;
    border-bottom: 1px solid #dfe3e8;
    box-shadow: 0 2px 6px rgba(0,0,0,0.04);
    align-items: center;
    justify-content: space-between;
    font-family: 'Segoe UI', sans-serif;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  a {
    font-weight: 600;
    color: #2c3e50;
    text-decoration: none;
    padding: 0.6rem 1rem;
    border-radius: 6px;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  a:hover {
    background-color: #e0ebf5;
    transform: translateY(-1px);
  }

  button {
    background-color: transparent;
    border: none;
    color: #e53935;
    font-weight: 600;
    padding: 0.6rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  button:hover {
    background-color: #fbe9e7;
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