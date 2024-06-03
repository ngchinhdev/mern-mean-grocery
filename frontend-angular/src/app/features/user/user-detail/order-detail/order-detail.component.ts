import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { OrderService } from '../../../../core/services/order.service';
import { IOrder } from '../../../../core/models/order.model';
import { CurrencyPipe } from '../../../../core/pipes/currency.pipe';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})

export class OrderDetailComponent implements OnInit, OnDestroy {
  routeSub!: Subscription;
  order!: IOrder;

  actRouter = inject(ActivatedRoute);
  orderService = inject(OrderService);

  ngOnInit(): void {
    this.routeSub = this.actRouter.params.subscribe(params => {
      this.orderService.getOrderById(params['id']).subscribe({
        next: (res) => {
          this.order = res.data;
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
