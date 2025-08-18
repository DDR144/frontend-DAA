import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DishInterface } from '../interfaces/dish.interface';
@Injectable({
  providedIn: 'root',
})
export class DishService {
  private apiUrl = 'http://localhost:8083/api/v1/institute/order/dish/';

  constructor(private http: HttpClient) {}

  getDishs(): Observable<DishInterface[]> {
    return this.http.get<DishInterface[]>(this.apiUrl);
  }

  getDishById(id: string): Observable<DishInterface> {
    return this.http.get<DishInterface>(`${this.apiUrl}${id}`);
  }

  createDish(dish: DishInterface): Observable<DishInterface> {
    dish.uid = crypto.randomUUID();
    dish.active = 1;
    return this.http.post<DishInterface>(this.apiUrl, dish, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  updateDish(id: string, dish: DishInterface): Observable<DishInterface> {
    dish.active = 1;
    return this.http.put<DishInterface>(`${this.apiUrl}${id}`, dish, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  deleteDish(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }
}
