import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

import { IOrder } from '../../../../core/models/order.model';
import { OrderService } from '../../../../core/services/order.service';
import { CurrencyPipe } from '../../../../core/pipes/currency.pipe';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [MatIconModule, RouterLink, DatePipe, CurrencyPipe],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})

export class OrderListComponent implements OnInit {
  allOrders!: IOrder[];

  private orderService = inject(OrderService);

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe({
      next: (res) => {
        this.allOrders = res.data;
      }
    });
  }
}
