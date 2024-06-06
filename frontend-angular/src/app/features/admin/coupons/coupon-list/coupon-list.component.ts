import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

import { ICoupon } from '../../../../core/models/coupon.model';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { NotFoundComponent } from '../../../../shared/components/not-found/not-found.component';
import { CouponService } from '../../../../core/services/coupon.service';
import { CurrencyPipe } from '../../../../core/pipes/currency.pipe';

@Component({
  selector: 'app-coupon-list',
  standalone: true,
  imports: [MatIconModule, PaginatorComponent, RouterLink, LoaderComponent, NotFoundComponent, DatePipe, CurrencyPipe],
  templateUrl: './coupon-list.component.html',
  styleUrl: './coupon-list.component.css'
})

export class CouponListComponent {
  coupons: ICoupon[] = [];
  isLoading: boolean = false;
  totalRecords: number = 0;
  first = 0;
  rows = 10;

  constructor(
    private couponService: CouponService,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getAllCoupons();
  }

  getAllCoupons(page: number = 0, limit: number = 10) {
    this.isLoading = true;
    this.couponService.getAllCoupons(page, limit).subscribe({
      next: (response) => {
        this.coupons = response.data;
        this.totalRecords = response.totalRecords;
        this.isLoading = false;
      },
      error: (error) => {
        if (this.coupons.length === 0) {
          this.isLoading = false;
        }
      }
    });
  }

  onDeleteCoupon(id: string) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.couponService.deleteCoupon(id).subscribe({
        next: (response) => {
          this.toast.success('Category deleted successfully!');
          this.getAllCoupons();
        }
      });
    }
  }

  onPageChanged(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.getAllCoupons(event.page + 1, event.rows);
  }
}
