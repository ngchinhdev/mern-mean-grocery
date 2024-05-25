import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { CartService } from '../../../../core/services/cart.service';
import { PUBLIC_ENDPOINTS } from '../../../../core/constants/urls';
import { ICartItem } from '../../../../core/models/carts.model';
import { CurrencyPipe } from '../../../../core/pipes/currency.pipe';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatIconModule, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

export class CartComponent implements OnInit {
  @Output() closeCart = new EventEmitter<void>();
  cartItems: ICartItem[] = [];

  imageUrl = PUBLIC_ENDPOINTS.IMAGE_PRODUCTS;

  cartService = inject(CartService);

  ngOnInit(): void {
    this.getCartItem();
  }

  getCartItem() {
    this.cartItems = this.cartService.getCartItems();
    return this.cartItems;
  }

  getTotalCartPrice() {
    return this.cartItems.reduce((acc, cur) => acc + cur.quantity * cur.price, 0);
  }

  onCloseCart() {
    this.closeCart.emit();
  }
}
