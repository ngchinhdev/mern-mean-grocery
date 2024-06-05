import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { IBestSelling, IOrder } from '../../../core/models/order.model';
import { IProduct } from '../../../core/models/products.model';
import { OrderService } from '../../../core/services/order.service';
import { ProductsService } from '../../../core/services/products.service';
import { CurrencyPipe } from '../../../core/pipes/currency.pipe';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PUBLIC_ENDPOINTS } from '../../../core/constants/urls';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [MatIconModule, CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {
  orders!: IOrder[];
  revenue!: number;
  products!: IProduct[];
  bestSelling!: IBestSelling[];
  currentDate = Date.now();
  productUrlImg = PUBLIC_ENDPOINTS.IMAGE_PRODUCTS;

  orderService = inject(OrderService);
  productService = inject(ProductsService);

  ngOnInit(): void {
    this.getAllOrders();
    this.getBestSelling();
    this.getAllProducts();
  }

  getAllOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (res) => {
        this.orders = res.data.sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        this.revenue = res.data.reduce((acc, cur) => acc + cur.totalPrice, 0);
      }
    });
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.data;
      }
    });
  }

  getBestSelling() {
    this.orderService.getBestSelling().subscribe({
      next: (res) => {
        this.bestSelling = res.data;
      }
    });
  }

}
