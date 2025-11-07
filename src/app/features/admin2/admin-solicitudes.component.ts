import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrestamosService, Prestamo } from '../../core/services/prestamos.service';

@Component({
  selector: 'app-admin-solicitudes',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>📋 Solicitudes de préstamo</h2>
    <div *ngFor="let prestamo of prestamos" class="solicitud-card">
      <p><strong>Libro:</strong> {{ prestamo.libro.titulo }} ({{ prestamo.libro.autor }})</p>
      <p><strong>Estudiante:</strong> {{ prestamo.usuario?.nombre }} - {{ prestamo.usuario?.email }}</p>
      <p><strong>Fecha:</strong> {{ prestamo.fechaPrestamo | date:'short' }}</p>
      <p><strong>Estado:</strong> {{ prestamo.estado === 'prestado' ? '📗 Pendiente' : '📕 Devuelto' }}</p>

      <button
        *ngIf="prestamo.estado === 'prestado'"
        (click)="marcarComoDevuelto(prestamo._id)"
        class="btn-devolver"
      >
        📕 Marcar como devuelto
      </button>
    </div>

    <div *ngIf="prestamos.length === 0" style="text-align: center; margin-top: 2rem;">
      <p>No hay solicitudes registradas.</p>
    </div>
  `,
  styles: [`
    h2 {
      text-align: center;
      margin: 2rem 0;
      color: #1976d2;
    }

    .solicitud-card {
      background: #f9f9f9;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1rem;
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;
    }

    .solicitud-card p {
      margin: 0.3rem 0;
      font-size: 0.95rem;
    }

    .btn-devolver {
      background-color: #388e3c;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      margin-top: 0.5rem;
      transition: background-color 0.3s ease;
    }

    .btn-devolver:hover {
      background-color: #2e7d32;
    }
  `]
})
export class AdminSolicitudesComponent implements OnInit {
  prestamos: Prestamo[] = [];

  constructor(private prestamosService: PrestamosService) {}

  ngOnInit(): void {
    this.prestamosService.obtenerPrestamos().subscribe({
      next: data => {
        this.prestamos = data.filter(p => p.estado === 'prestado');
      },
      error: () => alert('❌ Error al cargar solicitudes')
    });
  }

  marcarComoDevuelto(id: string): void {
    this.prestamosService.devolverPrestamo(id).subscribe({
      next: () => {
        alert('✅ Préstamo marcado como devuelto');
        this.prestamos = this.prestamos.map(p =>
          p._id === id ? { ...p, estado: 'devuelto', fechaDevolucion: new Date().toISOString() } : p
        );
      },
      error: () => alert('❌ Error al marcar como devuelto')
    });
  }
}