import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ICategory } from '../../../../core/models/categories.model';
import { PUBLIC_ENDPOINTS } from '../../../../core/constants/constants';
import { CategoriesService } from '../../../../core/services/categories.service';
import { LoaderComponent } from '../../../../shared/ui/loader/loader.component';

@Component({
  selector: 'app-admin-category-list',
  standalone: true,
  imports: [MatIconModule, RouterLink, LoaderComponent],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})

export class CategoryListComponent implements OnInit {
  categories: ICategory[] = [];
  imageUrl = PUBLIC_ENDPOINTS.IMAGE_CATEGORIES;
  isLoading: boolean = false;

  constructor(
    private categoriesService: CategoriesService,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.isLoading = true;
    this.categoriesService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      }
    });
  }

  onDeleteCategory(id: string) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoriesService.deleteCategory(id).subscribe({
        next: (response) => {
          this.toast.success('Category deleted successfully!');
          this.getAllCategories();
        }
      });
    }
  }
}