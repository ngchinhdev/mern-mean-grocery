import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { IOrder } from '../../../../core/models/order.model';
import { OrderService } from '../../../../core/services/order.service';
import { PUBLIC_ENDPOINTS } from '../../../../core/constants/urls';
import { CurrencyPipe } from '../../../../core/pipes/currency.pipe';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [MatIconModule, CurrencyPipe, DatePipe],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})

export class OrderDetailComponent implements OnInit {
  order!: IOrder;
  imageUrl = PUBLIC_ENDPOINTS.IMAGE_PRODUCTS;

  private orderService = inject(OrderService);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.orderService.getOrderById(params['id']).subscribe({
          next: (res) => {
            this.order = res.data;
          }
        });
      }
    });
  }
}
