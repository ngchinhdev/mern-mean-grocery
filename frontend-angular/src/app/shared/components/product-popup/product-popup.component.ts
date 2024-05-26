import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { IProduct } from '../../../core/models/products.model';
import { PUBLIC_ENDPOINTS } from '../../../core/constants/urls';
import { CurrencyPipe } from '../../../core/pipes/currency.pipe';
import { CartService } from '../../../core/services/cart.service';
import { AddCartControlComponent } from '../add-cart-control/add-cart-control.component';

@Component({
  selector: 'app-product-popup',
  standalone: true,
  imports: [MatDialogContent, MatIconModule, CurrencyPipe, RouterLink, AddCartControlComponent],
  templateUrl: './product-popup.component.html',
  styleUrl: './product-popup.component.css'
})

export class ProductPopupComponent implements OnInit {
  imageUrl = PUBLIC_ENDPOINTS.IMAGE_PRODUCTS;
  quantityAddCart: number = 1;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IProduct,
    public dialogRef: MatDialogRef<ProductPopupComponent>,
    private cartService: CartService,
  ) { }

  ngOnInit() {

  }

  onIncreaseQuantity() {
    this.quantityAddCart++;
  }

  onDecreaseQuantity() {
    if (this.quantityAddCart > 1) {
      this.quantityAddCart--;
    }
  }

  onAddToCart(quantityAddCart: number) {
    this.cartService.addToCart({
      id: this.data._id,
      name: this.data.name,
      quantity: quantityAddCart,
      category: this.data.categoryId.name,
      image: this.data.images[0],
      price: this.data.price
    });
  }
}
