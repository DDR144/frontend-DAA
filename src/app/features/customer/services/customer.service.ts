import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerInterface } from '../interfaces/customer.interface';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'http://localhost:8081/api/v1/institute/customer/';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<CustomerInterface[]> {
    return this.http.get<CustomerInterface[]>(this.apiUrl);
  }

  getCustomerById(id: string): Observable<CustomerInterface> {
    return this.http.get<CustomerInterface>(`${this.apiUrl}${id}`);
  }

  createCustomer(customer: CustomerInterface): Observable<CustomerInterface> {
    customer.uid = crypto.randomUUID();
    customer.active = 1;
    return this.http.post<CustomerInterface>(this.apiUrl, customer, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  updateCustomer(id: string, customer: CustomerInterface): Observable<CustomerInterface> {
    customer.active = 1;
    return this.http.put<CustomerInterface>(`${this.apiUrl}${id}`, customer, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  deleteCustomer(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
