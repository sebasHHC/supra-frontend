import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibrosService } from '../../core/services/libros.service';
import { Libro } from '../../models/libro.model';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-libros',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  template: `
    <div class="admin-libros">
      <h2>Gestión de Libros</h2>
      <p> Total de libros: {{ totalLibros }}</p>
      <p> Libros disponibles: {{ librosDisponibles }}</p>

      <form [formGroup]="form" (ngSubmit)="guardarLibro()">
        <input formControlName="titulo" placeholder="Título" />
        <input formControlName="autor" placeholder="Autor" />
        <input formControlName="genero" placeholder="Género" />
        <input type="number" formControlName="anio" placeholder="Año de publicación" />
        <textarea formControlName="descripcion" placeholder="Descripción del libro"></textarea>
        <label>
          <input type="checkbox" formControlName="disponible" />
          Disponible
        </label>
        <button type="submit" [disabled]="form.invalid">
          {{ libroEditando ? ' Guardar cambios' : ' Crear libro' }}
        </button>
        <button *ngIf="libroEditando" type="button" (click)="cancelarEdicion()">❌ Cancelar edición</button>
      </form>

      <input [(ngModel)]="filtro" placeholder="🔍 Buscar por título o autor" />

      <div *ngIf="libros.length === 0">No hay libros registrados.</div>

      <ul>
        <li *ngFor="let libro of librosFiltrados()">
          <div>
            <strong>{{ libro.titulo }}</strong> - {{ libro.autor }} ({{ libro.genero }}, {{ libro.anio }})
            <span [style.color]="libro.disponible ? 'green' : 'red'">
              {{ libro.disponible ? 'Disponible' : 'No disponible' }}
            </span>
            <p><em>{{ libro.descripcion }}</em></p>
          </div>
          <div>
            <button (click)="editarLibro(libro)">Editar</button>
            <button (click)="eliminarLibro(libro._id!)">Eliminar</button>
          </div>
        </li>
      </ul>
    </div>
  `,
  styles: [`
  .admin-libros {
    max-width: 800px;
    margin: 3rem auto;
    padding: 2rem;
    background-color: #ffffff;
    border-radius: 16px;
    box-shadow: 0 6px 16px rgba(0,0,0,0.06);
    font-family: 'Segoe UI', sans-serif;
  }

  h2 {
    text-align: center;
    color: #1976d2;
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
  }

  .subtitulo {
    text-align: center;
    font-size: 0.95rem;
    color: #666;
    margin-bottom: 2rem;
  }

  p {
    margin: 0.5rem 0;
    font-weight: 600;
    color: #444;
    font-size: 1rem;
  }

  form {
    display: grid;
    gap: 1rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 1.5rem;
  }

  input,
  textarea {
    padding: 0.65rem 0.9rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    background-color: #f9f9f9;
    transition: border-color 0.3s ease;
  }

  input:focus,
  textarea:focus {
    border-color: #1976d2;
    outline: none;
    background-color: #fff;
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }

  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.95rem;
    font-weight: 500;
  }

  .input-busqueda {
    width: 100%;
    padding: 0.65rem 0.9rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    background-color: #f9f9f9;
    margin-bottom: 1rem;
  }

  .input-busqueda:focus {
    border-color: #1976d2;
    outline: none;
    background-color: #fff;
  }

  button {
    padding: 0.7rem 1.2rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  button[type="submit"] {
    background-color: #1976d2;
    color: white;
  }

  button[type="submit"]:hover {
    background-color: #1565c0;
    transform: translateY(-1px);
  }

  button[type="button"] {
    background-color: #757575;
    color: white;
  }

  button[type="button"]:hover {
    background-color: #616161;
    transform: translateY(-1px);
  }

  ul {
    list-style: none;
    padding: 0;
    margin-top: 1rem;
  }

  li {
    background: #f9f9f9;
    border-radius: 12px;
    padding: 1.2rem;
    margin-bottom: 1rem;
    box-shadow: 0 2px 6px rgba(0,0,0,0.05);
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    animation: fadeIn 0.4s ease-in;
  }

  li strong {
    font-size: 1.1rem;
    color: #2c3e50;
  }

  li span.badge {
    display: inline-block;
    padding: 0.3rem 0.7rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 600;
    margin-top: 0.5rem;
  }

  .badge-disponible {
    background-color: #e8f5e9;
    color: #388e3c;
  }

  .badge-no-disponible {
    background-color: #ffebee;
    color: #c62828;
  }

  li p {
    margin: 0.5rem 0 0;
    font-style: italic;
    font-size: 0.9rem;
    color: #555;
  }

  li button {
    margin-top: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  li button:first-child {
    background-color: #fbc02d;
    color: #333;
    margin-right: 0.5rem;
  }

  li button:first-child:hover {
    background-color: #f9a825;
    transform: translateY(-1px);
  }

  li button:last-child {
    background-color: #d32f2f;
    color: white;
  }

  li button:last-child:hover {
    background-color: #b71c1c;
    transform: translateY(-1px);
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    .admin-libros {
      padding: 1.5rem;
    }

    li {
      flex-direction: column;
      align-items: flex-start;
    }

    li button {
      width: 100%;
      margin-top: 0.5rem;
    }
  }
`]
})
export class AdminLibrosComponent implements OnInit {
  libros: Libro[] = [];
  form: FormGroup;
  libroEditando: Libro | null = null;
  filtro: string = '';
  totalLibros: number = 0;
  librosDisponibles: number = 0;

  constructor(private librosService: LibrosService, private fb: FormBuilder) {
    this.form = this.fb.nonNullable.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      genero: ['', Validators.required],
      anio: [2020, [Validators.required, Validators.min(1800), Validators.max(new Date().getFullYear())]],
      disponible: [true],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.librosService.obtenerLibros().subscribe({
      next: (libros: Libro[]) => {
        this.libros = libros;
        this.actualizarContadores();
      },
      error: (err: unknown) => alert('Error al cargar libros')
    });
  }

  guardarLibro(): void {
    const datos = this.form.value;

    if (this.libroEditando) {
      const actualizado = { ...this.libroEditando, ...datos };
      this.librosService.actualizarLibro(actualizado._id!, actualizado).subscribe({
        next: (libroActualizado: Libro) => {
          this.libros = this.libros.map(l => l._id === libroActualizado._id ? libroActualizado : l);
          this.cancelarEdicion();
          this.actualizarContadores();
        },
        error: (err: unknown) => alert('Error al actualizar libro')
      });
    } else {
      this.librosService.crearLibro(datos).subscribe({
        next: (libro: Libro) => {
          this.libros.push(libro);
          this.form.reset();
          this.actualizarContadores();
        },
        error: (err: unknown) => alert('Error al crear libro')
      });
    }
  }

  editarLibro(libro: Libro): void {
    this.libroEditando = libro;
    this.form.setValue({
      titulo: libro.titulo,
      autor: libro.autor,
      genero: libro.genero,
      anio: libro.anio,
      disponible: libro.disponible,
      descripcion: libro.descripcion
    });
  }
cancelarEdicion(): void {
  this.libroEditando = null;
  this.form.reset({
    titulo: '',
    autor: '',
    genero: '',
    anio: 2020,
    disponible: true,
    descripcion: ''
  });
}


  eliminarLibro(id: string): void {
    if (confirm('¿Estás seguro de eliminar este libro?')) {
      this.librosService.eliminarLibro(id).subscribe({
        next: () => {
          this.libros = this.libros.filter(l => l._id !== id);
          this.actualizarContadores();
        },
        error: (err: unknown) => alert('Error al eliminar libro')
      });
    }
  }

  librosFiltrados(): Libro[] {
    const texto = this.filtro.toLowerCase();
    return this.libros.filter(libro =>
      libro.titulo.toLowerCase().includes(texto) ||
      libro.autor.toLowerCase().includes(texto)
    );
  }

  actualizarContadores(): void {
    this.totalLibros = this.libros.length;
    this.librosDisponibles = this.libros.filter(l => l.disponible).length;
  }
}