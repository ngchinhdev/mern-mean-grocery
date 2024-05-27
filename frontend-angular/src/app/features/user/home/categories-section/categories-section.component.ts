import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ICategory } from '../../../../core/models/categories.model';
import { CategoriesService } from '../../../../core/services/categories.service';
import { PUBLIC_ENDPOINTS } from '../../../../core/constants/urls';

@Component({
  selector: 'app-home-categories-section',
  standalone: true,
  imports: [],
  templateUrl: './categories-section.component.html',
  styleUrl: './categories-section.component.css'
})

@Injectable({ providedIn: 'root' })
export class CategoriesSectionComponent implements OnInit {
  categories: ICategory[] = [];
  imageUrl = PUBLIC_ENDPOINTS.IMAGE_CATEGORIES;

  constructor(
    private categoriesService: CategoriesService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoriesService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
      }
    });
  }

  navigateToCategory(categoryId: string) {
    this.router.navigate(['/products/search'], { queryParams: { category: categoryId } });
  }
}
