import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="registrar()" class="registro-form">
      <label>Nombre</label>
      <input formControlName="nombre" type="text" />

      <label>Email</label>
      <input formControlName="email" type="email" />

      <label>Contraseña</label>
      <input formControlName="password" type="password" />

      <label>Rol</label>
      <select formControlName="rol">
        <option value="estudiante">Estudiante</option>
        <option value="admin">Administrador</option>
      </select>

      <button type="submit" [disabled]="form.invalid">Registrarse</button>
    </form>
  `,
 styles: [`
  .registro-form {
    max-width: 480px;
    margin: 3rem auto;
    padding: 2rem;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    font-family: 'Segoe UI', 'Roboto', sans-serif;
  }

  label {
    font-weight: 600;
    color: #2c3e50;
    font-size: 0.95rem;
    margin-bottom: 0.3rem;
  }

  input,
  select {
    padding: 0.65rem 0.9rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
    background-color: #f9f9f9;
  }

  input:focus,
  select:focus {
    border-color: #1976d2;
    outline: none;
    background-color: #fff;
  }

  button {
    padding: 0.75rem 1.2rem;
    background-color: #1976d2;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  button:hover:not(:disabled) {
    background-color: #1565c0;
    transform: translateY(-1px);
  }

  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    .registro-form {
      padding: 1.5rem;
    }

    input,
    select,
    button {
      font-size: 0.95rem;
    }
  }
`]
})
export class RegistroComponent {
  form;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rol: ['estudiante', Validators.required]
    });
  }

  registrar() {
    const { nombre, email, password, rol } = this.form.value;
    if (!nombre || !email || !password || !rol) return;

    this.auth.registro(nombre, email, password, rol as 'admin' | 'estudiante').subscribe({
      next: ({ token, usuario }) => {
        this.auth.guardarSesion(token, usuario);
        this.router.navigate(['/libros']);
      },
      error: (err: any) => alert(err.error?.mensaje || 'Error al registrar')
    });
  }
}