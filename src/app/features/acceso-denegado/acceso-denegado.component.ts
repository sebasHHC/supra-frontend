import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-acceso-denegado',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="denegado">
      <h2> Acceso denegado</h2>
      <p>No tienes permiso para ver esta sección.</p>
      <a routerLink="/login">🔐 Iniciar sesión</a>
    </div>
  `,
  styles: [`
  .denegado {
    max-width: 480px;
    margin: 4rem auto;
    padding: 2rem;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    text-align: center;
    font-family: 'Segoe UI', sans-serif;
    color: #2c3e50;
  }

  h2 {
    font-size: 1.8rem;
    color: #d32f2f;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  a {
    display: inline-block;
    padding: 0.6rem 1rem;
    background-color: #1976d2;
    color: white;
    text-decoration: none;
    border-radius: 6px;
    font-weight: 600;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  a:hover {
    background-color: #1565c0;
    transform: translateY(-1px);
  }

  @media (max-width: 480px) {
    .denegado {
      padding: 1.5rem;
    }

    h2 {
      font-size: 1.5rem;
    }

    p {
      font-size: 0.95rem;
    }

    a {
      font-size: 0.95rem;
    }
  }
`]
})
export class AccesoDenegadoComponent {}