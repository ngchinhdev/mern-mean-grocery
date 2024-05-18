import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ICategory } from '../../../../core/models/categories.model';
import { PUBLIC_ENDPOINTS } from '../../../../core/constants/constants';
import { CategoriesService } from '../../../../core/services/categories.service';
import { LoaderComponent } from '../../../../shared/ui/loader/loader.component';
import { PaginatorComponent } from '../../../../shared/ui/paginator/paginator.component';

@Component({
  selector: 'app-admin-category-list',
  standalone: true,
  imports: [MatIconModule, RouterLink, LoaderComponent, PaginatorComponent],
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
        this.totalRecords = response.data.length;
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

  onPageChanged(event: any) {
    console.log(event);
    this.first = event.first + 1;
    this.rows = event.rows;
    this.getAllCategories(event.first, event.rows);
  }
}