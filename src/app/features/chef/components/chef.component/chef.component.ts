import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { chefService } from '../../services/chef.service';
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
  private chefService = inject(chefService);
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

}
