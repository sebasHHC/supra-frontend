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
        <button *ngIf="libro.disponible" (click)="solicitarLibro(libro._id)">
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
  styles: [/* tus estilos originales sin cambios */]
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
      console.warn('Acceso denegado: redirigiendo a /denegado');
      this.router.navigate(['/denegado']);
      return;
    }

    this.librosService.obtenerLibros().subscribe({
      next: libros => {
        this.libros = libros.filter(l => l.disponible);
      },
      error: () => alert('❌ Error al cargar libros')
    });
  }

  solicitarLibro(libroId: string): void {
    const usuarioActual = this.usuario();
    if (!usuarioActual) return;

   this.prestamosService.solicitarPrestamo(libroId).subscribe({
  next: () => alert('✅ Solicitud enviada correctamente'),
  error: () => alert('❌ Error al solicitar el libro')
});
  }
}