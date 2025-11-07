import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrestamosService, Prestamo } from '../../core/services/prestamos.service';

@Component({
  selector: 'app-prestamos',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Mis Préstamos</h2>
    <div *ngIf="prestamos.length > 0; else sinPrestamos" style="max-width: 600px; margin: auto;">
      <div *ngFor="let p of prestamos" class="card fade-in">
        <strong>{{ p.libro.titulo }}</strong> - {{ p.libro.autor }}<br />
        📅 Prestado: {{ p.fechaPrestamo | date:'shortDate' }}<br />
        📅 Devolución: {{ p.fechaDevolucion ? (p.fechaDevolucion | date:'shortDate') : '—' }}<br />
        🛈 Estado:
        <span [ngClass]="p.estado">
          {{ p.estado === 'prestado' ? ' Prestado' : ' Devuelto' }}
        </span><br />

        <button
          *ngIf="p.estado === 'prestado'"
          (click)="devolverPrestamo(p._id)"
          class="btn-devolver"
        >
          🔄 Devolver
        </button>
      </div>
    </div>

    <ng-template #sinPrestamos>
      <p style="text-align: center;">No tienes préstamos registrados.</p>
      <div style="text-align: center; margin-top: 2rem;">
        <button routerLink="/libros-estudiante" class="btn-ver-libros">
          📚 Ver libros disponibles
        </button>
      </div>
    </ng-template>
  `,
  styles: [`
  h2 {
    color: #388e3c;
    text-align: center;
    font-size: 2rem;
    margin: 2rem 0;
    font-family: 'Segoe UI', sans-serif;
  }

  .card {
    background-color: #ffffff;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    font-family: 'Segoe UI', sans-serif;
    transition: transform 0.2s ease;
  }

  .card:hover {
    transform: translateY(-2px);
  }

  .card strong {
    font-size: 1.2rem;
    color: #2c3e50;
  }

  .card span {
    font-weight: bold;
    margin-left: 0.3rem;
  }

  .prestado {
    color: #f57c00;
  }

  .devuelto {
    color: #388e3c;
  }

  .card p {
    margin: 0.3rem 0;
    font-size: 0.95rem;
    color: #555;
  }

  .btn-devolver {
    margin-top: 1rem;
    padding: 0.6rem 1.2rem;
    background-color: #1976d2;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  .btn-devolver:hover {
    background-color: #1565c0;
    transform: translateY(-1px);
  }

  .btn-ver-libros {
    padding: 0.6rem 1.2rem;
    background-color: #1976d2;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  .btn-ver-libros:hover {
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
    .card {
      padding: 1rem;
    }

    .card strong {
      font-size: 1.1rem;
    }

    .card p,
    .btn-devolver,
    .btn-ver-libros {
      font-size: 0.9rem;
    }
  }
`]
})
export class PrestamosComponent implements OnInit {
  prestamos: Prestamo[] = [];

  constructor(private prestamosService: PrestamosService) {}

  ngOnInit(): void {
    this.cargarPrestamos();
  }

  cargarPrestamos(): void {
    this.prestamosService.obtenerMisPrestamos().subscribe({
      next: data => this.prestamos = data,
      error: err => {
        console.error('Error al cargar préstamos:', err);
        alert('No se pudieron cargar tus préstamos');
      }
    });
  }

  devolverPrestamo(id: string): void {
    this.prestamosService.devolverPrestamo(id).subscribe({
      next: () => {
        alert(' Libro devuelto correctamente');
        this.cargarPrestamos();
      },
      error: () => alert('Error al devolver el libro')
    });
  }
}