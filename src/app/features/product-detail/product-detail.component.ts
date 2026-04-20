import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { EcommerceDataService } from '../../services/ecommerce-data.service';
import { Product } from '../../models/product.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly dataService = inject(EcommerceDataService);

  readonly loading = signal(true);
  readonly product = signal<Product | null>(null);
  readonly categories = signal<string[]>([]);
  readonly users = signal<User[]>([]);

  readonly productManagers = computed(() => this.users().slice(0, 3));

  constructor() {
    this.loadProductDetail();
    this.loadRelatedData();
  }

  /**
   * Reactively reads route product id and fetches corresponding detail.
   */
  private loadProductDetail(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = Number(params.get('id') ?? '1');
          return this.dataService.getProductById(id);
        })
      )
      .subscribe((product) => {
        this.product.set(product);
        this.loading.set(false);
      });
  }

  /**
   * Loads categories and users used in product detail side panels.
   */
  private loadRelatedData(): void {
    this.dataService.getCategories().subscribe((categories) => this.categories.set(categories));
    this.dataService.getUsers().subscribe((users) => this.users.set(users));
  }
}
