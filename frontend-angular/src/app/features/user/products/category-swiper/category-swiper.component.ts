import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewEncapsulation, inject } from '@angular/core';

import { SwiperDirective } from '../../../../core/directives/swiper.directive';
import { ICategory } from '../../../../core/models/categories.model';
import { CategoriesService } from '../../../../core/services/categories.service';
import { CommonModule } from '@angular/common';
import { SwiperOptions } from 'swiper/types';
import { Autoplay, Pagination } from 'swiper/modules';
import { PUBLIC_ENDPOINTS } from '../../../../core/constants/urls';
import { Router, RouterLink } from '@angular/router';

const breakpoints = {
  320: {
    slidesPerView: 2,
  },
  480: {
    slidesPerView: 3,
  },
  640: {
    slidesPerView: 4,
  },
  768: {
    slidesPerView: 5,
  },
  902: {
    slidesPerView: 6,
  },
  1024: {
    slidesPerView: 8,
  },
  1280: {
    slidesPerView: 10,
  },
};

@Component({
  selector: 'app-category-swiper',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [SwiperDirective, CommonModule, RouterLink],
  templateUrl: './category-swiper.component.html',
  styleUrl: './category-swiper.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class CategorySwiperComponent implements OnInit {
  categories!: ICategory[];
  imageUrl = PUBLIC_ENDPOINTS.IMAGE_CATEGORIES;

  private categoryServices = inject(CategoriesService);
  private router = inject(Router);

  public config: SwiperOptions = {
    spaceBetween: 10,
    slidesPerView: 10,
    breakpoints: breakpoints,
    loop: true,
    navigation: false,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    modules: [Pagination, Autoplay],
    pagination: { clickable: true },
  };

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryServices.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
      }
    });
  }

  navigateToCategory(categoryId: string) {
    this.router.navigate(['/products/search'], { queryParams: { category: categoryId } });
  }
}
