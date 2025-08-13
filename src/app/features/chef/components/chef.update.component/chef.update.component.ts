import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { chefService } from '../../services/chef.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChefInterface } from '../../interfaces/chef.interface';

@Component({
  selector: 'app-chef.update.component',
  imports: [ReactiveFormsModule],
  templateUrl: './chef.update.component.html',
  styleUrl: './chef.update.component.css'
})
export class ChefUpdateComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  chef: ChefInterface | null = null;
  chefId: string;

  constructor(
    private fb: FormBuilder,
    private chefService: chefService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      documentNumber: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    this.chefId = this.route.snapshot.paramMap.get('uid')!;
  }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.loading = true;

    this.chefService.getChefById(this.chefId).subscribe({
      next: (chef: ChefInterface) => {
        this.chef = chef;
        this.form.patchValue({
          documentNumber: chef.documentNumber,
          name: chef.name,
          lastName: chef.lastName,
          phone: chef.phone,
          email: chef.email,          
        });
      } ,
      error: (error) => {
        console.error('Error al cargar chef:', error);
        this.toastr.error('Error al cargar los datos del chef');
      },
      complete: () => {
        this.loading = false;
      }
    });
  
}
  async save() {
    if (this.form.invalid) {
      this.toastr.error('Por favor, complete todos los campos requeridos.');
      return;
    }
    this.loading = true;
    this.form.disable();

    const chef = this.form.value;

    this.chefService.updateChef(this.chefId, chef).subscribe({
      next: () => {
        this.toastr.success('Chef actualizado correctamente');
        this.router.navigate(['chefs/list']);
      },
      error: (error) => {
        console.error('Error al actualizar chef:', error);
        this.toastr.error('Error al actualizar los datos del chef');
      },
      complete: () => {
        this.loading = false;
        this.form.enable();
      }
    });
  }

    cancel() {
    this.router.navigate(['chefs/list']);
    
  }
}
  
