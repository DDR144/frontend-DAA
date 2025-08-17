import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerInterface } from '../../interfaces/customer.interface';
import { LayoutComponent } from "../../../../shared/components/layout/layout.component";
import { Loader } from '../../../../shared/components/loader/loader';

@Component({
  selector: 'app-customer.component',
  imports: [NgClass, LayoutComponent, Loader],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {
  loading: boolean = false;
  private customerService = inject(CustomerService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  customers = signal<CustomerInterface[]>([]);

  async ngOnInit() {
    this.loading = true;
    this.customerService.getCustomers().subscribe({
      next: (customeries) => {
        this.customers.set(customeries);
        this.loading = false;
      },
      error: (err) => {
        this.toastr.error('Error al obtener estudiantes');
        console.log(err);
      }
    });
  }

  addCustomer() {
    this.router.navigate(['customer/add']);
  }

  editCustomer(uid: string) {
    this.router.navigate([`customer/update/${uid}`]);     
  }
}
