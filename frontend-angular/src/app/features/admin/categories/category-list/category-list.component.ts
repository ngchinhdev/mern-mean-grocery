import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { ICategory } from '../../../../core/models/categories.model';
import { PUBLIC_ENDPOINTS } from '../../../../core/constants/constants';
import { CategoriesService } from '../../../../core/services/categories.service';

@Component({
  selector: 'app-admin-category-list',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})

export class CategoryListComponent implements OnInit {
  categories: ICategory[] = [];
  imageUrl = PUBLIC_ENDPOINTS.IMAGE_CATEGORIES;

  constructor(private categoriesService: CategoriesService) { }

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