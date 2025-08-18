import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DishService } from '../../services/dish.service';  

@Component({
  selector: 'app-dish.add.component',
  imports: [ReactiveFormsModule],
  templateUrl: './dish.add.component.html',
  styleUrl: './dish.add.component.css'
})
export class DishAddComponent {
  form!: FormGroup;
  loading = false;
  photoUrl: string | null = null; // Previsualización
  selectedFile: File | null = null; // Archivo seleccionado  

  constructor(
    private fb: FormBuilder,
    private dishService: DishService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      active: [1, Validators.required], 
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.photoUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);

      // Subir la imagen al servidor
      this.uploadPhoto(this.selectedFile);
    }
  }  

  uploadPhoto(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    
    // Aquí se llamaría al servicio para subir la foto
  }

  async save() {
    this.loading = true;
    this.form.disable();  
    const dish = this.form.value;  

    this.dishService.createDish(dish).subscribe({
      next: () => {
        this.toastr.success('Plato registrado exitosamente');
        this.router.navigate(['/dish/list']);
      },
      error: (error)=> {
        console.error('Error al registrar el plato:', error);
        const backendMessage = error?.error?.message || 'Error al registrar chef';
        this.toastr.error(backendMessage);
      },
      complete: () => {
        this.form.enable();
        this.loading = false;
      }
    });
  }
    cancel () {
    this.router.navigate(['/dish/list']);
    }
}
