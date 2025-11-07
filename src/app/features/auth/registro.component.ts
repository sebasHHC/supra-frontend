import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, Usuario } from '../../core/services/auth.service';

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

      <button type="submit" [disabled]="form.invalid">Registrarse</button>
    </form>
  `,
  styles: [/* tus estilos originales sin cambios */]
})
export class RegistroComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  registrar() {
    const { nombre, email, password } = this.form.value;
    if (!nombre || !email || !password) return;

    this.auth.registro(nombre, email, password).subscribe({
      next: ({ token, usuario }: { token: string; usuario: Usuario }) => {
        this.auth.guardarSesion(token, usuario);
        this.router.navigate(['/libros']);
      },
      error: (err: any) => alert(err.error?.mensaje || 'Error al registrar')
    });
  }
}