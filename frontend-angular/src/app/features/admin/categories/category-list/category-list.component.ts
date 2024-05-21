import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ICategory } from '../../../../core/models/categories.model';
import { PUBLIC_ENDPOINTS } from '../../../../core/constants/urls';
import { CategoriesService } from '../../../../core/services/categories.service';
import { LoaderComponent } from '../../../../shared/ui/loader/loader.component';
import { PaginatorComponent } from '../../../../shared/ui/paginator/paginator.component';
import { NotFoundComponent } from '../../../../shared/ui/not-found/not-found.component';

@Component({
  selector: 'app-admin-category-list',
  standalone: true,
  imports: [MatIconModule, RouterLink, LoaderComponent, PaginatorComponent, NotFoundComponent],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})

export class CategoryListComponent implements OnInit {
  categories: ICategory[] = [];
  imageUrl = PUBLIC_ENDPOINTS.IMAGE_CATEGORIES;
  isLoading: boolean = false;
  totalRecords: number = 0;
  first = 0;
  rows = 10;

  constructor(
    private categoriesService: CategoriesService,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(page: number = 0, limit: number = 10) {
    this.isLoading = true;
    this.categoriesService.getAllCategories(page, limit).subscribe({
      next: (response) => {
        this.categories = response.data;
        this.totalRecords = response.totalRecords;
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      },
      error: (error) => {
        if (this.categories.length === 0) {
          this.isLoading = false;
        }
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

  onPageChanged(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.getAllCategories(event.page + 1, event.rows);
  }
}