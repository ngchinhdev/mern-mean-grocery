import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, ViewEncapsulation } from '@angular/core';
import { SwiperOptions } from 'swiper/types';
import { Pagination, Autoplay } from 'swiper/modules';

import { SwiperDirective } from '../../../../../core/directives/swiper.directive';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-hero-swiper',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    SwiperDirective,
    ButtonComponent,
    RouterLink
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './hero-swiper.component.html',
  styleUrl: './hero-swiper.component.css'
})

export class HeroSwiperComponent {
  sliders = [
    {
      image: '../../../../assets/slider-2_o6aezc.webp',
      title: 'Best Different Type of Grocery Store',
      description: 'Quickly aggregate empowered networks after emerging products...'
    },
    {
      image: '../../../../assets/slider-1_rl8qdc.webp',
      title: 'The Best Quality Products Guaranteed!',
      description: 'The Best Quality Products Guaranteed!'
    },
    {
      image: '../../../../assets/slider-3_o6aezc.webp',
      title: 'Quality Freshness Guaranteed!',
      description: 'Intrinsicly fashion performance based products rather than accurate benefits...'
    },
  ];

  public config: SwiperOptions = {
    spaceBetween: 30,
    slidesPerView: 1,
    loop: true,
    navigation: false,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    modules: [Pagination, Autoplay],
    pagination: { clickable: true },
  };
}
