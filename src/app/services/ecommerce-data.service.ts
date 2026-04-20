import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';
import { MOCK_PRODUCTS, MOCK_USERS } from '../mocks/mock-data';

@Injectable({ providedIn: 'root' })
export class EcommerceDataService {
  private readonly apiUrl = 'https://fakestoreapi.com';
  readonly isMockMode = signal(false);

  constructor(private readonly http: HttpClient) {}

  /**
   * Returns all products from the API.
   * Falls back to mock products on HTTP errors.
   */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`).pipe(
      catchError(() => {
        this.isMockMode.set(true);
        return of(MOCK_PRODUCTS);
      })
    );
  }

  /**
   * Returns one product by id.
   * Falls back to mock products lookup on HTTP errors.
   * @param id Product identifier
   */
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`).pipe(
      catchError(() => {
        this.isMockMode.set(true);
        const product = MOCK_PRODUCTS.find((item) => item.id === id) ?? MOCK_PRODUCTS[0];
        return of(product);
      })
    );
  }

  /**
   * Returns users from API for admin visibility.
   * Falls back to mock users on HTTP errors.
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`).pipe(
      catchError(() => {
        this.isMockMode.set(true);
        return of(MOCK_USERS);
      })
    );
  }

  /**
   * Builds the category list from products to keep one data origin.
   */
  getCategories(): Observable<string[]> {
    return this.getProducts().pipe(
      map((products) => Array.from(new Set(products.map((product) => product.category))))
    );
  }
}
