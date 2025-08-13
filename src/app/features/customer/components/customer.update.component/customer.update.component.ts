import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerInterface } from '../../interfaces/customer.interface';

@Component({
  selector: 'app-customer-update',
  imports: [ReactiveFormsModule],
  templateUrl: './customer.update.component.html',
  styleUrls: ['./customer.update.component.scss']
})
export class CustomerUpdateComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  customer: CustomerInterface | null = null;
  customerId: string;

  constructor(
  private fb: FormBuilder,
  private customerService: CustomerService,
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
    this.customerId =  this.route.snapshot.paramMap.get('uid')!;
  }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
  this.loading = true;

  this.customerService.getCustomerById(this.customerId).subscribe({
    next: (customer: CustomerInterface) => {
      this.customer = customer;
      this.form.patchValue({
        documentNumber: customer.documentNumber,
        name: customer.name,
        lastName: customer.lastName,
        phone: customer.phone,
        email: customer.email,          
      });
    },
    error: (error) => {
      console.error('Error al cargar alumno:', error);
      this.toastr.error('Error al cargar los datos del estudiante');
    },
    complete: () => {
      this.loading = false;
    }
  });   
}

  async save() {
  if (this.form.invalid) {
    this.toastr.error('Por favor, complete todos los campos');
    return;
  }

  this.loading = true;
  this.form.disable();  

  const customer = this.form.value;  

  this.customerService.updateCustomer(this.customerId, customer).subscribe({
    next: () => {
      this.toastr.success('Estudiante actualizado correctamente');
      this.router.navigate(['customer/list']);
    },
    error: (error) => {
      console.error('Error al actualizar estudiante:', error);
      const backendMessage = error?.error?.message || 'Error al actualizar estudiante';
      this.toastr.error(backendMessage);
    },
    complete: () => {
      this.form.enable();
      this.loading = false;
    }
  });   
}

  cancel() {
    this.router.navigate(['customer/list']);
  }

}
