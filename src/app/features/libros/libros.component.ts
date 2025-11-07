import { Component } from '@angular/core';

@Component({
  selector: 'app-libros',
  standalone: true,
  template: `
  <div class="bienvenida">
    <h1>📚 Bienvenido a la Biblioteca</h1>
    <p>Explora, gestiona y disfruta tus libros favoritos.</p>
  </div>
`,
styles: [`
  .bienvenida {
    max-width: 600px;
    margin: 4rem auto;
    padding: 2rem;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    text-align: center;
    font-family: 'Segoe UI', sans-serif;
  }

  h1 {
    font-size: 2.2rem;
    color: #1976d2;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    color: #555;
    margin-bottom: 0;
  }

  @media (max-width: 480px) {
    .bienvenida {
      padding: 1.5rem;
    }

    h1 {
      font-size: 1.8rem;
    }

    p {
      font-size: 1rem;
    }
  }
`]
})
export class LibrosComponent {}//no funciono