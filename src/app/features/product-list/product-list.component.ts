import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EcommerceDataService } from '../../services/ecommerce-data.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  private readonly dataService = inject(EcommerceDataService);

  readonly loading = signal(true);
  readonly products = signal<Product[]>([]);
  readonly currentPage = signal(1);
  readonly pageSize = signal(6);

  readonly totalPages = computed(() => {
    const pages = Math.ceil(this.products().length / this.pageSize());
    return Math.max(pages, 1);
  });

  readonly pagedProducts = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return this.products().slice(start, end);
  });

  constructor() {
    this.loadProducts();
  }

  /**
   * Fetches products list with fallback handled by service.
   */
  private loadProducts(): void {
    this.dataService.getProducts().subscribe((products) => {
      this.products.set(products);
      this.loading.set(false);
    });
  }

  /**
   * Navigates to previous page if possible.
   */
  previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update((page) => page - 1);
    }
  }

  /**
   * Navigates to next page if possible.
   */
  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update((page) => page + 1);
    }
  }
}
