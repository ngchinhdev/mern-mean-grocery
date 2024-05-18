import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { IProduct } from '../../../../core/models/products.model';
import { PUBLIC_ENDPOINTS } from '../../../../core/constants/constants';
import { ProductsService } from '../../../../core/services/products.service';
import { LoaderComponent } from '../../../../shared/ui/loader/loader.component';
import { PaginatorComponent } from '../../../../shared/ui/paginator/paginator.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatIconModule, RouterLink, LoaderComponent, PaginatorComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})

export class ProductListComponent implements OnInit {
  products: IProduct[] = [];
  isLoading: boolean = false;
  imageUrl = PUBLIC_ENDPOINTS.IMAGE_PRODUCTS;
  totalRecords: number = 0;
  first: number = 0;
  rows: number = 10;

  constructor(private productsService: ProductsService, private toastService: ToastrService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(page: number = 0, limit: number = 10) {
    this.isLoading = true;
    this.productsService.getAllProducts(page, limit).subscribe({
      next: (response) => {
        this.products = response.data;
        this.totalRecords = response.data.length;
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

  onPageChanged(event: any) {
    console.log(event);
    this.first = event.first + 1;
    this.rows = event.rows;
    this.getAllProducts(event.first, event.rows);
  }
}