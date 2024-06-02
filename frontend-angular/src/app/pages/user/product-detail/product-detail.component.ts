import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

import { DetailImagesComponent } from '../../../features/user/product-detail/detail-images/detail-images.component';
import { DetailPromotionComponent } from '../../../features/user/product-detail/detail-promotion/detail-promotion.component';
import { DetailRelatedProductComponent } from '../../../features/user/product-detail/detail-related-product/detail-related-product.component';
import { DetailInformationComponent } from '../../../features/user/product-detail/detail-information/detail-information.component';
import { ProductsService } from '../../../core/services/products.service';
import { IProduct } from '../../../core/models/products.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [DetailImagesComponent, DetailPromotionComponent, DetailRelatedProductComponent, DetailInformationComponent, MatIconModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})

export class ProductDetailComponent implements OnInit, OnDestroy {
  private routeSub!: Subscription;
  product!: IProduct;
  relatedProducts!: IProduct[];
  discount!: number;

  constructor(
    private route: ActivatedRoute,
    private productServices: ProductsService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.getProductById(params['id']);
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  getProductById(id: string) {
    return this.productServices.getProductById(id).subscribe({
      next: (response) => {
        this.product = response.data;
        console.log(response.data);
        this.discount = ((this.product.orgPrice - this.product.price) / this.product.orgPrice * 100);
        this.getProductsByCategoryId(this.product.categoryId._id);
      }
    });
  }

  getProductsByCategoryId(id: string) {
    return this.productServices.getProductsByCategoryId(id).subscribe({
      next: (response) => {
        this.relatedProducts = response.data.filter(p => p._id !== this.product._id);
      }
    });
  }

  navigateToCategory(categoryId: string) {
    this.router.navigate(['/products/search'], { queryParams: { category: categoryId } });
  }
}
