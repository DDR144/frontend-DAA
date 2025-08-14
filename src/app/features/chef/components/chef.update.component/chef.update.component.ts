import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChefService } from '../../services/chef.service';
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
    private chefService: ChefService,
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

  loadData() {
    this.loading = true;
    this.chefService.getChefById(this.chefId).subscribe({
      next: (data) => {
        this.chef = data;
        this.form.patchValue({
          documentNumber: this.chef.documentNumber,
          name: this.chef.name,
          lastName: this.chef.lastName,
          phone: this.chef.phone,
          email: this.chef.email
        });
      },
      error: (error) => {
        this.toastr.error('Error loading chef data');
        console.error(error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
  save() {
    if (this.form.invalid) {
      this.toastr.error('Por favor completa todos los campos obligatorios.');
      return;
    }
    const updatedChef: ChefInterface = {
      ...(this.chef ?? {}),
      ...this.form.value,
    };
    this.chefService.updateChef(this.chefId, updatedChef).subscribe({
      next: () => {
        this.toastr.success(
          'Chef actualizado correctamente.',
          '✅ Éxito',
          {
            timeOut: 5000, // más tiempo visible (ms)
            progressBar: true, // barra de progreso
            progressAnimation: 'increasing', // animación
            positionClass: 'toast-top-center', // posición en pantalla
            closeButton: true, // botón para cerrar
          }
        );
        this.router.navigate(['chef/list']);
      },
      error: (error) => {
        this.toastr.error('Error al actualizar chef');
        this.toastr.error(error.message);
      }
    });
  }


  cancel() {
    this.router.navigate(['chef/list']);

  }
}

