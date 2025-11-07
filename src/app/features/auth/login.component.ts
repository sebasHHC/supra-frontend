import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, Usuario } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    
   <div class="login-container">
  <h2>🔐 Iniciar sesión</h2>

  <form (ngSubmit)="login()" class="login-form">
    <label>Email:</label>
    <input [(ngModel)]="email" name="email" required type="email" />
    <div *ngIf="!email">⚠️ Email requerido</div>

    <label>Contraseña:</label>
    <input [(ngModel)]="password" name="password" required type="password" />
    <div *ngIf="!password">⚠️ Contraseña requerida</div>

    <button type="submit" [disabled]="!email || !password">Ingresar</button>
  </form>

  <div class="credenciales-demo">
    <h3> Credenciales de prueba</h3>
    <p><strong>Admin:</strong> seba@gmail.com / seba123</p>
    <p><strong>Estudiante:</strong> alfred@gmail.com / 123</p>
    <p>Usa estas credenciales para probar los distintos roles del sistema.</p>
  </div>
</div>
  `,
  styles: [`
  .login-container {
    max-width: 480px;
    margin: 3rem auto;
    padding: 2rem;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    font-family: 'Segoe UI', sans-serif;
  }

  h2 {
    text-align: center;
    color: #1976d2;
    margin-bottom: 1.5rem;
  }

  .login-form {
    display: grid;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  label {
    font-weight: 600;
    color: #2c3e50;
    font-size: 0.95rem;
  }

  input {
    padding: 0.65rem 0.9rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
    background-color: #f9f9f9;
  }

  input:focus {
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
    transition: background-color 0.3s ease;
  }

  button:hover:not(:disabled) {
    background-color: #1565c0;
  }

  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .credenciales-demo {
    background-color: #f5f7fa;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #dfe3e8;
    font-size: 0.95rem;
    color: #333;
  }

  .credenciales-demo h3 {
    margin-top: 0;
    color: #2c3e50;
    font-size: 1.1rem;
  }

  .credenciales-demo p {
    margin: 0.3rem 0;
  }
`]
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: ({ token, usuario }: { token: string; usuario: Usuario }) => {
        console.log('Login exitoso:', usuario); 
        this.authService.guardarSesion(token, usuario);

        
        if (usuario.rol === 'admin') {
          this.router.navigate(['/admin']);
        } else if (usuario.rol === 'estudiante') {
          this.router.navigate(['/prestamos']);
        } else {
          console.warn(' Rol desconocido:', usuario.rol);
          this.router.navigate(['/']);
        }
      },
      error: (err: any) => {
        console.error('Error en login:', err);
        alert(err.error?.mensaje || 'Credenciales incorrectas');
      }
    });
  }
}