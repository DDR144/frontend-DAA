import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-loader',
  standalone: true,
  imports: [],
  templateUrl: './auth-loader.component.html',
  styleUrl: './auth-loader.component.css',
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="text-center text-gray-600 text-lg animate-pulse">
        Cargando...
      </div>
    </div>
  `,
})
export class AuthLoaderComponent {}
