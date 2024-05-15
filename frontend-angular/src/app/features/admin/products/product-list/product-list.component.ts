import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { IProduct } from '../../../../core/models/products.model';
import { PUBLIC_ENDPOINTS } from '../../../../core/constants/constants';
import { ProductsService } from '../../../../core/services/products.service';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from '../../../../shared/ui/loader/loader.component';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private productsService: ProductsService, private toastService: ToastrService) { }

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

  onDeleteProduct(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productsService.deleteProduct(id).subscribe({
        next: (response) => {
          this.toastService.success('Product deleted successfully!');
          this.getAllProducts();
        }
      });
    }
  }
}