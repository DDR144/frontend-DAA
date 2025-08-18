import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { DishService } from '../../services/dish.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DishInterface } from '../../interfaces/dish.interface';
import { LayoutComponent } from '../../../../shared/components/layout/layout.component';
import { Loader } from '../../../../shared/components/loader/loader';

@Component({
  selector: 'app-dish.component',
  imports: [NgClass, LayoutComponent, Loader],
  templateUrl: './dish.component.html',
  styleUrl: './dish.component.css'
})
export class DishComponent {
  loading: boolean = false;
  private dishService = inject(DishService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  dishs = signal<DishInterface[]>([]);

  async ngOnInit() {
    this.loading = true;
    this.dishService.getDishs().subscribe({
      next: (dishs) => {
        this.dishs.set(dishs);
        this.loading = false;
      },
      error: (err) => {
        this.toastr.error('Error al obtener Plato');
        console.log(err);
      }
    });
  }

  addDish() {
    this.router.navigate(['dish/add']);
  }

  editDish(uid: string) {
    this.router.navigate([`dish/update/${uid}`]);
  }

  deleteDish(uid: string) {
  // Crear el modal
  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
  modal.style.display = 'flex';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.zIndex = '9999';

  modal.innerHTML = `
    <div style="background:white;padding:20px;border-radius:8px;max-width:400px;text-align:center;">
      <p>¿Estás seguro de que deseas eliminar este plato?</p>
      <div style="margin-top:20px;">
        <button id="cancelBtn" style="margin-right:10px;padding:5px 10px;">Cancelar</button>
        <button id="confirmBtn" style="padding:5px 10px;background:red;color:white;border:none;border-radius:4px;">Eliminar</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Manejar botones
  const cancelBtn = document.getElementById('cancelBtn')!;
  const confirmBtn = document.getElementById('confirmBtn')!;

  cancelBtn.onclick = () => document.body.removeChild(modal);

  confirmBtn.onclick = () => {
    document.body.removeChild(modal);

    // Aquí va tu lógica de eliminar
    this.loading = true;
    this.dishService.deleteDish(uid).subscribe({
      next: () => {
        this.toastr.success('Plato eliminado correctamente');
        this.dishs.set(this.dishs().filter(dish => dish.uid !== uid));
        this.loading = false;
      },
      error: (err) => {
        this.toastr.error('Error al eliminar Plato');
        console.log(err);
        this.loading = false;
      }
    });
  };
}


}
