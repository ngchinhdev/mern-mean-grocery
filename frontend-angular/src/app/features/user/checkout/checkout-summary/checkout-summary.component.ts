import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CartService } from '../../../../core/services/cart.service';
import { CheckoutItemComponent } from '../checkout-item/checkout-item.component';
import { CurrencyPipe } from '../../../../core/pipes/currency.pipe';

@Component({
  selector: 'app-checkout-summary',
  standalone: true,
  imports: [CheckoutItemComponent, CurrencyPipe, FormsModule],
  templateUrl: './checkout-summary.component.html',
  styleUrl: './checkout-summary.component.css'
})

export class CheckoutSummaryComponent implements OnInit {
  coupon!: string;
  @Output() typeCoupon = new EventEmitter<string>();

  cartService = inject(CartService);

  ngOnInit(): void {
  }

  onTypeCoupon() {
    console.log(this.coupon);
    this.typeCoupon.emit(this.coupon);
  }
}
