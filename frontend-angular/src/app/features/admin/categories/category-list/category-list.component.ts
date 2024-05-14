import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { ICategory } from '../../../../core/models/categories.model';
import { PUBLIC_ENDPOINTS } from '../../../../core/constants/constants';
import { CategoriesService } from '../../../../core/services/categories.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private categoriesService: CategoriesService,
    private toast: ToastrService
  ) { }

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

  onDeleteCategory(id: string) {
    this.categoriesService.deleteCategory(id).subscribe({
      next: (response) => {
        this.toast.success('Category deleted successfully!');
      }
    });
  }
}