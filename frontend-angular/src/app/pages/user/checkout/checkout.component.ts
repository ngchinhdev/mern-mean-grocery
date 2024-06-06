import { Component } from '@angular/core';
import { CheckoutFormComponent } from '../../../features/user/checkout/checkout-form/checkout-form.component';
import { CheckoutSummaryComponent } from '../../../features/user/checkout/checkout-summary/checkout-summary.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CheckoutFormComponent, CheckoutSummaryComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})

export class CheckoutComponent {
  coupon!: number;

  receivedCoupon(coupon: number) {
    this.coupon = coupon;
  }
}
