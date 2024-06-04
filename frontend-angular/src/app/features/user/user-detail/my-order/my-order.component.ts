import { Component, OnInit, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { OrderService } from '../../../../core/services/order.service';
import { IOrder } from '../../../../core/models/order.model';
import { CurrencyPipe } from '../../../../core/pipes/currency.pipe';

@Component({
  selector: 'app-my-order',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, RouterLink],
  templateUrl: './my-order.component.html',
  styleUrl: './my-order.component.css'
})

export class MyOrderComponent implements OnInit {
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
