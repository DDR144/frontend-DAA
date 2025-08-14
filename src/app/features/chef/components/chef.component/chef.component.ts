import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ChefService } from '../../services/chef.service';
import { ChefInterface } from '../../interfaces/chef.interface';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chef.component',
  imports: [],
  templateUrl: './chef.component.html',
  styleUrl: './chef.component.css'
})
export class ChefComponent {
  loading: boolean = false;
  private chefService = inject(ChefService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  chefs = signal<ChefInterface[]>([]);

  async ngOnInit() {
    this.loading = true;
    this.chefService.getChefs().subscribe({
      next: (chefs) => {
        this.chefs.set(chefs);
        this.loading = false;
      },
      error: (err) => {
        this.toastr.error('Error al obtener chefs');
        console.log(err);
      }
    });
  }

  addChef() {
    this.router.navigate(['chef/add']);
  }

  editChef(uid: string) {
    this.router.navigate([`chef/update/${uid}`]);
  }

  deleteChef(uid: string) {
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
      <p>¿Estás seguro de que deseas eliminar este chef?</p>
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
    this.chefService.deleteChef(uid).subscribe({
      next: () => {
        this.toastr.success('Chef eliminado correctamente');
        this.chefs.set(this.chefs().filter(chef => chef.uid !== uid));
        this.loading = false;
      },
      error: (err) => {
        this.toastr.error('Error al eliminar chef');
        console.log(err);
        this.loading = false;
      }
    });
  };
}


}
