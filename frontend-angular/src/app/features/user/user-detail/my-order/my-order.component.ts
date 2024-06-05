import { Component, OnInit, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { OrderService } from '../../../../core/services/order.service';
import { IOrder } from '../../../../core/models/order.model';
import { CurrencyPipe } from '../../../../core/pipes/currency.pipe';
import { AuthService } from '../../../../core/services/auth.service';
import { NotFoundComponent } from '../../../../shared/components/not-found/not-found.component';

@Component({
  selector: 'app-my-order',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, RouterLink, NotFoundComponent],
  templateUrl: './my-order.component.html',
  styleUrl: './my-order.component.css'
})

export class MyOrderComponent implements OnInit {
  orders!: IOrder[];
  idUser!: string;

  public orderService = inject(OrderService);
  private toast = inject(ToastrService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.userProfile$.subscribe(user => {
      if (user) {
        this.idUser = user._id;
        this.getOrdersByUserId(user._id);
      }
    });
  }

  getOrdersByUserId(id: string) {
    this.orderService.getOrdersByUserId(id).subscribe({
      next: (res) => {
        this.orders = res.data;
      },
      error: () => {
        this.orders = [];
      }
    });
  }

  onCancel(id: string) {
    this.orderService.cancelOrder(id).subscribe({
      next: (res) => {
        this.toast.success("Your order is canceled successfully");
        this.getOrdersByUserId(this.idUser);
      }
    });
  }
}
