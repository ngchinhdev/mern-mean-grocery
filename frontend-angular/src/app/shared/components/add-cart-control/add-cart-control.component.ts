import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { CartService } from '../../../core/services/cart.service';
import { IProduct } from '../../../core/models/products.model';

@Component({
  selector: 'app-add-cart-control',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './add-cart-control.component.html',
  styleUrl: './add-cart-control.component.css'
})

export class AddCartControlComponent {
  @Output() addToCart = new EventEmitter<number>();
  @Input() quantityAddCart!: number;

  cartService = inject(CartService);

  onIncreaseQuantity() {
    this.quantityAddCart++;
  }

  onDecreaseQuantity() {
    if (this.quantityAddCart > 1) {
      this.quantityAddCart--;
    }
  }

  onAddToCart() {
    this.addToCart.emit(this.quantityAddCart);
  }
}
