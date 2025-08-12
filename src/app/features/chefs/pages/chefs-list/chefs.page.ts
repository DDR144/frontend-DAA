import { Component } from '@angular/core';
import { LayoutComponent } from '../../../../shared/components/layout/layout.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-chefs',
  templateUrl: './chefs.page.html',
  styleUrls: ['./chefs.page.css'],
  imports: [CommonModule, LayoutComponent],
})
export class ChefsPage {
  chefs = [
    { id: 1, nombre: 'Juan Pérez', especialidad: 'Comida peruana' },
    { id: 2, nombre: 'Ana Gómez', especialidad: 'Postres' },
    { id: 3, nombre: 'Luis Salas', especialidad: 'Pescados y mariscos' },
  ];

  get cantidadChefsActivos(): number {
  return Array.isArray(this.chefs)
    ? this.chefs.filter(c => c.id).length
    : 0;
}

}
