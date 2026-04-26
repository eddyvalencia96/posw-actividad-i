import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EcommerceDataService } from '../../services/ecommerce-data.service';
import { OrderWithDetails } from '../../models/order.model';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.css'
})
export class OrdersListComponent {
  private readonly dataService = inject(EcommerceDataService);

  readonly loading = signal(true);
  readonly orders = signal<OrderWithDetails[]>([]);

  constructor() {
    this.loadOrders();
  }

  private loadOrders(): void {
    this.dataService.getOrders().subscribe((orders) => {
      this.orders.set(orders);
      this.loading.set(false);
    });
  }

  getStatusClass(status: string): string {
    const statusMap: Record<string, string> = {
      pending: 'status--pending',
      processing: 'status--processing',
      completed: 'status--completed',
      cancelled: 'status--cancelled'
    };
    return statusMap[status] || '';
  }
}