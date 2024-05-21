import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, ViewEncapsulation } from '@angular/core';
import { SwiperOptions } from 'swiper/types';
import { Pagination, Autoplay } from 'swiper/modules';

import { SwiperDirective } from '../../../../../core/directives/swiper.directive';

@Component({
  selector: 'app-home-hero-swiper',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    SwiperDirective
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './hero-swiper.component.html',
  styleUrl: './hero-swiper.component.css'
})

export class HeroSwiperComponent {
  sliders = [
    {
      image: '../../../../assets/slider-2_o6aezc.webp',
      title: 'Welcome to our store',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      image: '../../../../assets/slider-2_o6aezc.webp',
      title: 'Welcome to our store',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      image: '../../../../assets/slider-2_o6aezc.webp',
      title: 'Welcome to our store',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }
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
