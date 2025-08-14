import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChefService } from '../../services/chef.service';

@Component({
  selector: 'app-chef.add.component',
  imports: [ReactiveFormsModule],
  templateUrl: './chef.add.component.html',
  styleUrl: './chef.add.component.css'
})
export class ChefAddComponent {
  form!: FormGroup;
  loading = false;
  photoUrl: string | null = null; // Previsualización
  selectedFile: File | null = null; // Archivo seleccionado  

  constructor(
    private fb: FormBuilder,
    private chefService: ChefService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      documentNumber: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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
    const customer = this.form.value;  

    this.chefService.createChef(customer).subscribe({
      next: () => {
        this.toastr.success('Chef creado exitosamente');
        this.router.navigate(['/chef/list']);
      },
      error: (error)=> {
        console.error('Error al crear el chef:', error);
        const backendMessage = error?.error?.message || 'Error al crear el chef';
        this.toastr.error(backendMessage);
      },
      complete: () => {
        this.loading = false;
        this.form.enable();
      }
    });
  }
    cancel () {
    this.router.navigate(['/chef/list']);
    }

}
