import { Component, Input, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { ICartItem } from '../../../../core/models/carts.model';
import { CurrencyPipe } from '../../../../core/pipes/currency.pipe';
import { PUBLIC_ENDPOINTS } from '../../../../core/constants/urls';
import { CartService } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-checkout-item',
  standalone: true,
  imports: [MatIconModule, RouterLink, CurrencyPipe],
  templateUrl: './checkout-item.component.html',
  styleUrl: './checkout-item.component.css'
})

export class CheckoutItemComponent {
  @Input() orderItem!: ICartItem;
  imageUrl = PUBLIC_ENDPOINTS.IMAGE_PRODUCTS;

  public cartService = inject(CartService);
}
