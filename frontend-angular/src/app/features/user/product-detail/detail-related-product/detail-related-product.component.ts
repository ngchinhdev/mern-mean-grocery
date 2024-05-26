import { Component, Input } from '@angular/core';
import { IProduct } from '../../../../core/models/products.model';
import { ProductItemComponent } from '../../../../shared/components/product-item/product-item.component';

@Component({
  selector: 'app-detail-related-product',
  standalone: true,
  imports: [ProductItemComponent],
  templateUrl: './detail-related-product.component.html',
  styleUrl: './detail-related-product.component.css'
})

export class DetailRelatedProductComponent {
  @Input() relatedProducts!: IProduct[];
}
