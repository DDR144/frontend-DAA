import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChefInterface } from '../interfaces/chef.interface';

@Injectable({
  providedIn: 'root',
})
export class ChefService {
  private apiUrl = 'http://localhost:8084/api/v1/institute/chef/';

  constructor(private http: HttpClient) {}

  getChefs(): Observable<ChefInterface[]> {
    return this.http.get<ChefInterface[]>(this.apiUrl);
  }

  getChefById(id: string): Observable<ChefInterface> {
    return this.http.get<ChefInterface>(`${this.apiUrl}${id}`);
  }

  createChef(chef: ChefInterface): Observable<ChefInterface> {
    chef.uid = crypto.randomUUID();
    chef.active = 1;
    return this.http.post<ChefInterface>(this.apiUrl, chef, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  updateChef(id: string, chef: ChefInterface): Observable<ChefInterface> {
    chef.active = 1;
    return this.http.put<ChefInterface>(`${this.apiUrl}${id}`, chef, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  deleteChef(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }
}
