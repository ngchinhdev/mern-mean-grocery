import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { IProduct } from '../../../../core/models/products.model';
import { PUBLIC_ENDPOINTS } from '../../../../core/constants/constants';
import { ProductsService } from '../../../../core/services/products.service';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from '../../../../shared/ui/loader/loader.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatIconModule, RouterLink, LoaderComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = [];
  isLoading: boolean = false;
  imageUrl = PUBLIC_ENDPOINTS.IMAGE_PRODUCTS;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.isLoading = true;
    this.productsService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      }
    });
  }
}