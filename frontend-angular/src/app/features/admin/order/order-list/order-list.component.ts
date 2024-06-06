import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

import { IOrder } from '../../../../core/models/order.model';
import { OrderService } from '../../../../core/services/order.service';
import { CurrencyPipe } from '../../../../core/pipes/currency.pipe';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { NotFoundComponent } from '../../../../shared/components/not-found/not-found.component';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [MatIconModule, RouterLink, DatePipe, CurrencyPipe, PaginatorComponent, LoaderComponent, NotFoundComponent, CommonModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})

export class OrderListComponent implements OnInit {
  allOrders!: IOrder[];
  totalRecords: number = 0;
  first: number = 0;
  rows: number = 10;
  isLoading: boolean = false;

  private orderService = inject(OrderService);

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(page: number = 0, limit: number = 10) {
    this.isLoading = true;
    this.orderService.getAllOrders(page, limit).subscribe({
      next: (res) => {
        this.allOrders = res.data;
        this.totalRecords = res.totalRecords;
        this.isLoading = false;
      },
      error: (error) => {
        if (this.allOrders.length === 0) {
          this.isLoading = false;
        }
      }
    });
  }

  onPageChanged(event: any) {
    console.log(event);
    this.first = event.first;
    this.rows = event.rows;
    this.getAllOrders(event.page + 1, event.rows);
  }
}
