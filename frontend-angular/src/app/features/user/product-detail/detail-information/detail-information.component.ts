import { Component, Input, inject } from '@angular/core';

import { IProduct } from '../../../../core/models/products.model';
import { CurrencyPipe } from '../../../../core/pipes/currency.pipe';
import { AddCartControlComponent } from '../../../../shared/components/add-cart-control/add-cart-control.component';
import { CartService } from '../../../../core/services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-information',
  standalone: true,
  imports: [CurrencyPipe, AddCartControlComponent, CommonModule],
  templateUrl: './detail-information.component.html',
  styleUrl: './detail-information.component.css'
})

export class DetailInformationComponent {
  @Input() product!: IProduct;
  quantityAddCart: number = 1;
  isShowMore: boolean = false;

  cartService = inject(CartService);

  onAddToCart(quantityAddCart: number) {
    this.cartService.addToCart({
      id: this.product._id,
      name: this.product.name,
      quantity: quantityAddCart,
      category: this.product.categoryId.name,
      image: this.product.images[0],
      price: this.product.price
    });
  }

  toggleShowMore() {
    this.isShowMore = !this.isShowMore;
  }
}
