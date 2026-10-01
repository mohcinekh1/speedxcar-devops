import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Car } from '../../models/car.model';

export interface CategoryResponse {
  name: string;
  count: number;
}

export interface HomeStatResponse {
  value: string;
  label: string;
}

export interface HomeResponse {
  featuredCars: Car[];
  stats: HomeStatResponse[];
  categories: CategoryResponse[];
}

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'http://localhost:8080/api/admin/cars';
  private publicApiUrl = 'http://localhost:8080/api/cars';

  constructor(private http: HttpClient) {}

  getPublicCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.publicApiUrl);
  }

  getPublicCarById(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.publicApiUrl}/${id}`);
  }

  getFeaturedCars(limit = 6): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.publicApiUrl}/featured?limit=${limit}`);
  }

  getCarCategories(): Observable<CategoryResponse[]> {
    return this.http.get<CategoryResponse[]>(`${this.publicApiUrl}/categories`);
  }

  getHomeData(): Observable<HomeResponse> {
    return this.http.get<HomeResponse>('http://localhost:8080/api/home');
  }

  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  getCarById(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  createCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, car, {
      headers: this.getAuthHeaders()
    });
  }

  updateCar(id: number, car: Car): Observable<Car> {
    return this.http.put<Car>(`${this.apiUrl}/${id}`, car, {
      headers: this.getAuthHeaders()
    });
  }

  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    if (!token) {
      return new HttpHeaders();
    }

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
}
