import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

import { CategorySwiperComponent } from '../../../features/user/products/category-swiper/category-swiper.component';
import { FilterBarComponent } from '../../../features/user/products/filter-bar/filter-bar.component';
import { IProduct } from '../../../core/models/products.model';
import { ProductsService } from '../../../core/services/products.service';
import { ProductItemComponent } from '../../../shared/components/product-item/product-item.component';
import { NotFoundComponent } from '../../../shared/components/not-found/not-found.component';
import { CategoriesService } from '../../../core/services/categories.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CategorySwiperComponent, FilterBarComponent, ProductItemComponent, NotFoundComponent, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})

export class ProductsComponent implements OnInit, OnDestroy {
  initialProducts!: IProduct[];
  productsFilter!: IProduct[];
  param!: string;
  private routeSub!: Subscription;

  private router = inject(ActivatedRoute);
  private productServices = inject(ProductsService);

  ngOnInit(): void {
    this.routeSub = this.router.queryParams.subscribe(params => {
      if (params['category']) {
        this.param = 'category';
        this.getProductByCategoryId(params['category']);
      }

      if (params['name']) {
        this.param = 'name';
        this.getProductBySearchName(params['name']);
      }

      if (!Object.keys(params).length) {
        this.getAllProducts(1, 15, 'price');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  getProductByCategoryId(id: string) {
    this.productServices.getProductsByCategoryId(id).subscribe({
      next: (response) => {
        this.productsFilter = response.data;
        this.initialProducts = response.data;
      },
      error: () => {
        this.productsFilter = [];
      }
    });
  }

  getProductBySearchName(name: string) {
    this.productServices.getSearchProducts(name).subscribe({
      next: (response) => {
        this.productsFilter = response.data;
        this.initialProducts = response.data;
      },
      error: () => {
        this.productsFilter = [];
      }
    });
  }

  getAllProducts(page: number, limit: number, sort: string) {
    this.productServices.getAllProducts(page, limit, sort).subscribe({
      next: (response) => {
        this.productsFilter = response.data;
        this.initialProducts = response.data;
      },
      error: () => {
        this.productsFilter = [];
      }
    });
  }

  onSortPrice(event: Event) {
    const target = event.target as HTMLSelectElement;

    if (target.value === 'inc') {
      this.productsFilter.sort((a, b) => a.price - b.price);
    }
    if (target.value === 'dec') {
      this.productsFilter.sort((a, b) => b.price - a.price);
    }
  }
}
