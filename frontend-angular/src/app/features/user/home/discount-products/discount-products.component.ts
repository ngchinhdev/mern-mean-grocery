import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { IProduct } from '../../../../core/models/products.model';
import { ProductsService } from '../../../../core/services/products.service';
import { ProductItemComponent } from '../../../../shared/components/product-item/product-item.component';

@Component({
  selector: 'app-home-discount-products',
  standalone: true,
  imports: [MatIconModule, MatMenuModule, ProductItemComponent],
  templateUrl: './discount-products.component.html',
  styleUrl: './discount-products.component.css'
})

export class DiscountProductsComponent implements OnInit {
  discountProducts!: IProduct[];

  productService = inject(ProductsService);

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        this.discountProducts = res.data.filter(prod => prod.orgPrice > prod.price);
      }
    });
  }
}
