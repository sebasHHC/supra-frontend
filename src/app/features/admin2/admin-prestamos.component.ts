import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../core/services/auth.service';
import { Libro } from '../../models/libro.model';
import { EstudiantesService } from '../../core/services/estudiantes.service';
import { LibrosService } from '../../core/services/libros.service';
import { PrestamosService } from '../../core/services/prestamos.service';

@Component({
  selector: 'app-admin-prestamos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="admin-prestamos">
      <h2>📕 Asignar Préstamo</h2>

      <form [formGroup]="form" (ngSubmit)="asignarPrestamo()">
        <label>Estudiante</label>
        <select formControlName="usuarioId">
          <option *ngFor="let u of usuarios" [value]="u._id">{{ u.nombre }}</option>
        </select>

        <label>Libro</label>
        <select formControlName="libroId">
          <option *ngFor="let l of libros" [value]="l._id">{{ l.titulo }}</option>
        </select>

        <label>Fecha de devolución</label>
        <input type="date" formControlName="fechaDevolucion" />

        <button type="submit" [disabled]="form.invalid">📘 Asignar préstamo</button>
      </form>
    </div>
  `,
  styles: [`
    .admin-prestamos {
      max-width: 600px;
      margin: 3rem auto;
      padding: 2rem;
      background-color: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      font-family: 'Segoe UI', sans-serif;
    }

    h2 {
      text-align: center;
      color: #1976d2;
      font-size: 2rem;
      margin-bottom: 1.5rem;
    }

    form {
      display: grid;
      gap: 1rem;
    }

    label {
      font-weight: 600;
      color: #2c3e50;
      font-size: 0.95rem;
    }

    select, input[type="date"] {
      padding: 0.65rem 0.9rem;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-size: 1rem;
      background-color: #f9f9f9;
    }

    button {
      padding: 0.75rem 1.2rem;
      background-color: #388e3c;
      color: white;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.2s ease;
    }

    button:hover:not(:disabled) {
      background-color: #2e7d32;
      transform: translateY(-1px);
    }

    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  `]
})
export class AdminPrestamosComponent implements OnInit {
  form: FormGroup;
  usuarios: Usuario[] = [];
  libros: Libro[] = [];

  constructor(
    private fb: FormBuilder,
    private estudiantesService: EstudiantesService,
    private librosService: LibrosService,
    private prestamosService: PrestamosService
  ) {
    this.form = this.fb.group({
      usuarioId: ['', Validators.required],
      libroId: ['', Validators.required],
      fechaDevolucion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.estudiantesService.obtenerEstudiantes().subscribe({
      next: usuarios => {
        this.usuarios = usuarios.filter(u => u.rol === 'estudiante');
      },
      error: () => alert('❌ Error al cargar estudiantes')
    });

    this.librosService.obtenerLibros().subscribe({
      next: libros => {
        this.libros = libros.filter(l => l.disponible);
      },
      error: () => alert('❌ Error al cargar libros')
    });
  }

  asignarPrestamo(): void {
    const datos = this.form.value;
    this.prestamosService.crearPrestamo(datos).subscribe({
      next: () => {
        alert('✅ Préstamo asignado correctamente');
        this.form.reset();
      },
      error: () => alert('❌ Error al asignar préstamo')
    });
  }
}