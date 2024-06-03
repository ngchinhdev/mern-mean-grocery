import { Component, OnInit, inject } from '@angular/core';

import { CartService } from '../../../../core/services/cart.service';
import { ICartItem } from '../../../../core/models/carts.model';
import { CheckoutItemComponent } from '../checkout-item/checkout-item.component';
import { CurrencyPipe } from '../../../../core/pipes/currency.pipe';

@Component({
  selector: 'app-checkout-summary',
  standalone: true,
  imports: [CheckoutItemComponent, CurrencyPipe],
  templateUrl: './checkout-summary.component.html',
  styleUrl: './checkout-summary.component.css'
})

export class CheckoutSummaryComponent implements OnInit {
  cartService = inject(CartService);

  ngOnInit(): void {
  }
}
