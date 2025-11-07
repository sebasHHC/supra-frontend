import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { EstudiantesService } from '../../core/services/estudiantes.service';
import { PrestamosService, Prestamo } from '../../core/services/prestamos.service';
import { Usuario } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-historial-estudiante',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-historial-estudiante.component.html',
  styleUrls: ['./admin-historial-estudiante.component.scss']
})
export class AdminHistorialEstudianteComponent implements OnInit {
  form: FormGroup;
  estudiantes: Usuario[] = [];
  prestamos: Prestamo[] = [];

  constructor(
    private fb: FormBuilder,
    private estudiantesService: EstudiantesService,
    private prestamosService: PrestamosService
  ) {
    this.form = this.fb.group({
      usuarioId: ['']
    });
  }

  ngOnInit(): void {
    this.estudiantesService.obtenerEstudiantes().subscribe({
      next: (data) => this.estudiantes = data,
      error: () => alert('❌ Error al cargar estudiantes')
    });

    this.form.get('usuarioId')?.valueChanges.subscribe(id => {
      if (id) {
        this.prestamosService.obtenerPrestamosPorUsuario(id).subscribe({
          next: (data) => this.prestamos = data,
          error: () => alert('❌ Error al cargar historial')
        });
      } else {
        this.prestamos = [];
      }
    });
  }
}