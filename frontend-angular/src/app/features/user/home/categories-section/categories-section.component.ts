import { Component, Injectable, OnInit } from '@angular/core';

import { ICategory } from '../../../../core/models/categories.model';
import { CategoriesService } from '../../../../core/services/categories.service';
import { PUBLIC_ENDPOINTS } from '../../../../core/constants/constants';

@Component({
  selector: 'app-home-categories-section',
  standalone: true,
  imports: [],
  templateUrl: './categories-section.component.html',
  styleUrl: './categories-section.component.css'
})

@Injectable({ providedIn: 'root' })
export class CategoriesSectionComponent implements OnInit {
  public categories: ICategory[] = [];
  public imageUrl = PUBLIC_ENDPOINTS.IMAGE_CATEGORIES;

  constructor(private categoriesService: CategoriesService) {

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
}
