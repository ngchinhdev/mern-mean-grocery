import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-home-discount-products',
  standalone: true,
  imports: [MatIconModule, MatMenuModule],
  templateUrl: './discount-products.component.html',
  styleUrl: './discount-products.component.css'
})
export class DiscountProductsComponent {

}
