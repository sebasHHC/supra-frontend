import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // ✅ Importar aquí

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule), // ✅ Registrar proveedor HTTP
    provideRouter(routes) // ✅ Registrar rutas
  ]
});