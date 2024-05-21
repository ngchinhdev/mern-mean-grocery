import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { IProduct } from '../../../../core/models/products.model';
import { ProductsService } from '../../../../core/services/products.service';
import { PUBLIC_ENDPOINTS } from '../../../../core/constants/urls';
import { CartService } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-home-popular-products',
  standalone: true,
  imports: [MatIconModule, MatMenuModule],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.css',
})

export class PopularProductComponent implements OnInit {
  public products: IProduct[] = [];
  public imageUrl = PUBLIC_ENDPOINTS.IMAGE_PRODUCTS;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getHotProducts();
  }

  getHotProducts() {
    this.productsService.getHotProducts().subscribe({
      next: (response) => {
        this.products = response.data;
      }
    });
  }

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
}
