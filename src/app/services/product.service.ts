import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiBase = 'https://fakestoreapi.com';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiBase}/products/categories`);
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBase}/products`);
  }

  getProductsByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBase}/products/category/${category}`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.apiBase}/products`, product);
  }

  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put(`${this.apiBase}/products/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiBase}/products/${id}`);
  }
}
