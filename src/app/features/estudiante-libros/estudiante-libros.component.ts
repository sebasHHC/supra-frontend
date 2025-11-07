import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibrosService } from '../../core/services/libros.service';
import { PrestamosService } from '../../core/services/prestamos.service';
import { Libro } from '../../models/libro.model';
import { Router } from '@angular/router';
import { currentUserSignal } from '../../core/services/auth.service';

@Component({
  selector: 'app-estudiante-libros',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Libros disponibles</h2>
    <div style="max-width: 800px; margin: auto;">
      <div *ngFor="let libro of libros" class="libro-card fade-in">
        <h3>{{ libro.titulo }}</h3>
        <p><strong>Autor:</strong> {{ libro.autor }}</p>
        <p>
          <strong>Estado:</strong>
          <span [ngClass]="libro.disponible ? 'disponible' : 'no-disponible'">
            {{ libro.disponible ? '📗 Disponible' : '📕 Prestado' }}
          </span>
        </p>

        <button
          *ngIf="usuario()?.rol === 'estudiante' && libro.disponible"
          (click)="solicitarPrestamo(libro)"
          class="btn-solicitar"
        >
          📘 Solicitar
        </button>
      </div>
    </div>

    <div *ngIf="libros.length === 0" style="text-align: center; margin-top: 2rem;">
      <p>No hay libros disponibles.</p>
      <button routerLink="/prestamos" class="btn-ver-prestamos">
        📚 Ver mis préstamos
      </button>
    </div>
  `,
  styles: [`
  h2 {
    text-align: center;
    color: #1976d2;
    font-size: 2rem;
    margin: 2rem 0;
    font-family: 'Segoe UI', sans-serif;
  }

  .libro-card {
    background: #ffffff;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    transition: transform 0.2s ease;
  }

  .libro-card:hover {
    transform: translateY(-2px);
  }

  .libro-card h3 {
    margin-top: 0;
    color: #2c3e50;
    font-size: 1.3rem;
  }

  .libro-card p {
    margin: 0.5rem 0;
    font-size: 0.95rem;
    color: #555;
  }

  .disponible {
    color: #388e3c;
    font-weight: bold;
  }

  .no-disponible {
    color: #d32f2f;
    font-weight: bold;
  }

  .btn-solicitar {
    margin-top: 1rem;
    background-color: #388e3c;
    color: white;
    border: none;
    padding: 0.6rem 1rem;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  .btn-solicitar:hover {
    background-color: #2e7d32;
    transform: translateY(-1px);
  }

  .btn-ver-prestamos {
    background-color: #1976d2;
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  .btn-ver-prestamos:hover {
    background-color: #1565c0;
    transform: translateY(-1px);
  }

  .fade-in {
    animation: fadeIn 0.5s ease-in;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @media (max-width: 768px) {
    .libro-card {
      padding: 1rem;
    }

    .libro-card h3 {
      font-size: 1.1rem;
    }

    .libro-card p {
      font-size: 0.9rem;
    }

    .btn-solicitar,
    .btn-ver-prestamos {
      width: 100%;
      font-size: 0.95rem;
    }
  }
`]
})
export class EstudianteLibrosComponent implements OnInit {
  libros: Libro[] = [];
  usuario = currentUserSignal;

  constructor(
    private librosService: LibrosService,
    private prestamosService: PrestamosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const usuarioActual = this.usuario();

    if (!usuarioActual || usuarioActual.rol !== 'estudiante') {
      console.warn(' Acceso denegado: redirigiendo a /denegado');
      this.router.navigate(['/denegado']);
      return;
    }

    this.librosService.obtenerLibros().subscribe({
      next: libros => {
        this.libros = libros.filter(l => l.disponible);
      },
      error: () => alert('Error al cargar libros')
    });
  }

  solicitarPrestamo(libro: Libro): void {
    if (!libro._id) {
      alert('Este libro no tiene ID válido');
      return;
    }

    this.prestamosService.crearPrestamo(libro._id).subscribe({
      next: () => {
        alert(`✅ Préstamo solicitado para "${libro.titulo}"`);
        this.router.navigate(['/prestamos']);
      },
      error: err => {
        console.error('Error al solicitar préstamo:', err);
        alert('❌ No se pudo registrar el préstamo');
      }
    });
  }
}