import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibrosService } from '../../core/services/libros.service';
import { Libro } from '../../models/libro.model';
import { Observable } from 'rxjs'; 

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {
  libros: Libro[] = [];

  constructor(private librosService: LibrosService) {
    this.librosService.obtenerLibros().subscribe((libros: Libro[]) => {
      this.libros = libros;
    });
  }

  eliminar(id: string): void {
    this.librosService.eliminarLibro(id).subscribe(() => {
      this.libros = this.libros.filter((libro: Libro) => libro._id !== id);
    });
  }
}