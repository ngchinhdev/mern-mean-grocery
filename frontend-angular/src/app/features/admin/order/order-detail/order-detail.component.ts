import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { IOrder } from '../../../../core/models/order.model';
import { OrderService } from '../../../../core/services/order.service';
import { PUBLIC_ENDPOINTS } from '../../../../core/constants/urls';
import { CurrencyPipe } from '../../../../core/pipes/currency.pipe';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [MatIconModule, CurrencyPipe, DatePipe, FormsModule],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})

export class OrderDetailComponent implements OnInit, OnDestroy {
  order!: IOrder;
  imageUrl = PUBLIC_ENDPOINTS.IMAGE_PRODUCTS;
  id!: string;
  status!: 'Confirmed' | 'Delivered' | 'Pending' | 'Cancelled';
  routeSub!: Subscription;

  private orderService = inject(OrderService);
  private activatedRoute = inject(ActivatedRoute);
  private toast = inject(ToastrService);

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.getOrderById(params['id']);
      }
    });
  }

  getOrderById(id: string) {
    this.orderService.getOrderById(id).subscribe({
      next: (res) => {
        this.order = res.data;
        this.status = this.order.status;
      }
    });
  }

  onChangePaid(id: string) {
    this.orderService.updateOrder(id, { paymentInfo: { ...this.order.paymentInfo, isPaid: true } }).subscribe({
      next: (res) => {
        this.toast.success('This order is set to paid');
        this.getOrderById(id);
      },
      error: (err) => {
        console.error(err);
        this.toast.error("Failed to set paid.");
      }
    });
  }

  onChangeStatus(event: Event, id: string) {
    const target = event.target as HTMLSelectElement;
    this.orderService.updateOrder(id, { status: target.value }).subscribe({
      next: (res) => {
        this.toast.success('This order status is updated');
        this.getOrderById(id);
      },
      error: (err) => {
        console.error(err);
        this.toast.error("Failed to set status.");
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
