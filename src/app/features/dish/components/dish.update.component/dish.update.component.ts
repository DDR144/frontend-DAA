import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DishService } from '../../services/dish.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DishInterface } from '../../interfaces/dish.interface';

@Component({
  selector: 'app-dish.update.component',
  imports: [ReactiveFormsModule],
  templateUrl: './dish.update.component.html',
  styleUrl: './dish.update.component.css',
})
export class DishUpdateComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  dish: DishInterface | null = null;
  dishId: string;

  constructor(
    private fb: FormBuilder,
    private dishService: DishService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
    });
    this.dishId = this.route.snapshot.paramMap.get('uid')!;
  }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.loading = true;

    this.dishService.getDishById(this.dishId).subscribe({
      next: (dish: DishInterface) => {
        this.dish = dish;
        this.form.patchValue({
          name: dish.name,
          description: dish.description,
          price: dish.price, 
        });
      },
      error: (error) => {
        console.error('Error al cargar Plato', error);
        this.toastr.error('Error al cargar los datos del Plato');        
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

    const dish = this.form.value;

    this.dishService.updateDish(this.dishId, dish).subscribe({
      next: () => {
        this.toastr.success('Datos actualizados correctamente.');
        // this.toastr.success('Chef actualizado correctamente.', '✅ Éxito', {
        //   timeOut: 5000, // más tiempo visible (ms)
        //   progressBar: true, // barra de progreso
        //   progressAnimation: 'increasing', // animación
        //   positionClass: 'toast-top-center', // posición en pantalla
        //   closeButton: true, // botón para cerrar   
        // });
        this.router.navigate(['dish/list']);
      },
      error: (error) => {
        console.error('Error al actualizar datos del Plato:', error);
        const backendMessage =
          error?.error?.message || 'Error al actualizar datos del Plato';
        this.toastr.error(backendMessage);        
      },
      complete: () => {
        this.form.enable();
        this.loading = false;
      },
    });
  }

  cancel() {
    this.router.navigate(['dish/list']);
  }
}
