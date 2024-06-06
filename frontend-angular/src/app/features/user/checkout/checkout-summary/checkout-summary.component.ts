import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CartService } from '../../../../core/services/cart.service';
import { CheckoutItemComponent } from '../checkout-item/checkout-item.component';
import { CurrencyPipe } from '../../../../core/pipes/currency.pipe';
import { CouponService } from '../../../../core/services/coupon.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout-summary',
  standalone: true,
  imports: [CheckoutItemComponent, CurrencyPipe, FormsModule],
  templateUrl: './checkout-summary.component.html',
  styleUrl: './checkout-summary.component.css'
})

export class CheckoutSummaryComponent implements OnInit {
  couponCode!: string;
  discount: number = 0;
  @Output() typeCoupon = new EventEmitter<number>();

  cartService = inject(CartService);
  couponService = inject(CouponService);
  toast = inject(ToastrService);

  ngOnInit(): void {

  }

  getCouponByCode() {
    this.couponService.getCouponByCode(this.couponCode).subscribe({
      next: (res) => {
        this.discount = res.data.discount;
        this.typeCoupon.emit(this.discount);
        this.toast.success('Coupon is applied');
      },
      error: (err) => {
        console.log(err);
        this.toast.error('Coupon is invalid');
      }
    });
  }

  onEnterCoupon() {
    if (this.couponCode) {
      this.getCouponByCode();
    }
  }
}
