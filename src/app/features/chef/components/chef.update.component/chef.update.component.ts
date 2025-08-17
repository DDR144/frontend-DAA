import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ChefService } from '../../services/chef.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChefInterface } from '../../interfaces/chef.interface';

@Component({
  selector: 'app-chef.update.component',
  imports: [ReactiveFormsModule],
  templateUrl: './chef.update.component.html',
  styleUrl: './chef.update.component.css',
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
      },
      error: (error) => {
        console.error('Error al cargar chef', error);
        this.toastr.error('Error al cargar los datos del chef');        
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  async save() {
    if (this.form.invalid) {
      this.toastr.error('Por favor, complete todos los campos');
      return;
    }
    
    this.loading = true;
    this.form.disable();

    const chef = this.form.value;

    this.chefService.updateChef(this.chefId, chef).subscribe({
      next: () => {
        this.toastr.success('Datos actualizados correctamente.');
        // this.toastr.success('Chef actualizado correctamente.', '✅ Éxito', {
        //   timeOut: 5000, // más tiempo visible (ms)
        //   progressBar: true, // barra de progreso
        //   progressAnimation: 'increasing', // animación
        //   positionClass: 'toast-top-center', // posición en pantalla
        //   closeButton: true, // botón para cerrar   
        // });
        this.router.navigate(['chef/list']);
      },
      error: (error) => {
        console.error('Error al actualizar datos del chef:', error);
        const backendMessage =
          error?.error?.message || 'Error al actualizar datos del chef';
        this.toastr.error(backendMessage);        
      },
      complete: () => {
        this.form.enable();
        this.loading = false;
      },
    });
  }

  cancel() {
    this.router.navigate(['chef/list']);
  }
}
