import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { IProduct } from '../../../../core/models/products.model';
import { PUBLIC_ENDPOINTS } from '../../../../core/constants/constants';
import { ProductsService } from '../../../../core/services/products.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = [];
  imageUrl = PUBLIC_ENDPOINTS.IMAGE_PRODUCTS;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productsService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response.data;
      }
    });
  }
}