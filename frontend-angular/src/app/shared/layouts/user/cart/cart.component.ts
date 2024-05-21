import { Component, EventEmitter, Output, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { CartService } from '../../../../core/services/cart.service';
import { PUBLIC_ENDPOINTS } from '../../../../core/constants/urls';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

export class CartComponent {
  @Output() closeCart = new EventEmitter<void>();

  imageUrl = PUBLIC_ENDPOINTS.IMAGE_PRODUCTS;

  cartService = inject(CartService);

  onCloseCart() {
    this.closeCart.emit();
  }
}
