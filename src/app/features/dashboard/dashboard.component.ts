import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { EcommerceDataService } from '../../services/ecommerce-data.service';
import { Product } from '../../models/product.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private readonly dataService = inject(EcommerceDataService);

  readonly loading = signal(true);
  readonly products = signal<Product[]>([]);
  readonly users = signal<User[]>([]);
  readonly categories = signal<string[]>([]);

  readonly productCount = computed(() => this.products().length);
  readonly userCount = computed(() => this.users().length);
  readonly categoryCount = computed(() => this.categories().length);
  readonly maxMetric = computed(() =>
    Math.max(this.productCount(), this.userCount(), this.categoryCount(), 1)
  );

  readonly productsBarWidth = computed(
    () => `${Math.round((this.productCount() / this.maxMetric()) * 100)}%`
  );
  readonly usersBarWidth = computed(
    () => `${Math.round((this.userCount() / this.maxMetric()) * 100)}%`
  );
  readonly categoriesBarWidth = computed(
    () => `${Math.round((this.categoryCount() / this.maxMetric()) * 100)}%`
  );

  constructor() {
    this.loadDashboardData();
  }

  /**
   * Loads all dashboard data in parallel using reactive streams.
   */
  private loadDashboardData(): void {
    forkJoin({
      products: this.dataService.getProducts(),
      users: this.dataService.getUsers(),
      categories: this.dataService.getCategories()
    }).subscribe(({ products, users, categories }) => {
      this.products.set(products);
      this.users.set(users);
      this.categories.set(categories);
      this.loading.set(false);
    });
  }
}
