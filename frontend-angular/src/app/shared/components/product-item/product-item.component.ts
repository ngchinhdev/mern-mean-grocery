import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PUBLIC_ENDPOINTS } from '../../../core/constants/urls';
import { IProduct } from '../../../core/models/products.model';
import { CartService } from '../../../core/services/cart.service';
import { CurrencyPipe } from '../../../core/pipes/currency.pipe';
import { MatDialog } from '@angular/material/dialog';
import { ProductPopupComponent } from '../product-popup/product-popup.component';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [MatIconModule, CurrencyPipe],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})

export class ProductItemComponent {
  @Input() product!: IProduct;
  imageUrl = PUBLIC_ENDPOINTS.IMAGE_PRODUCTS;

  constructor(
    private cartService: CartService,
    private dialog: MatDialog
  ) { }

  onAddToCart(product: IProduct) {
    const item = {
      id: product._id,
      image: product.images[0],
      name: product.name,
      quantity: 1,
      price: product.price,
      category: product.categoryId.name!,
    };
    this.cartService.addToCart(item);
  }

  onOpenPopupDetail() {
    this.dialog.open(ProductPopupComponent, {
      width: '768px',
      autoFocus: false,
      data: this.product
    });
  }
}