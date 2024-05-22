import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { IProduct } from '../../../../core/models/products.model';
import { ProductsService } from '../../../../core/services/products.service';
import { PUBLIC_ENDPOINTS } from '../../../../core/constants/urls';
import { ProductItemComponent } from '../../../../shared/components/product-item/product-item.component';

@Component({
  selector: 'app-home-popular-products',
  standalone: true,
  imports: [MatIconModule, MatMenuModule, ProductItemComponent],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.css',
})

export class PopularProductComponent implements OnInit {
  public products: IProduct[] = [];
  public imageUrl = PUBLIC_ENDPOINTS.IMAGE_PRODUCTS;

  constructor(
    private productsService: ProductsService,
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
}
