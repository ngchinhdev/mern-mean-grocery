import { Component } from "@angular/core";

import "swiper/css";
import "swiper/css/pagination";

import { HeroSwiperComponent } from "./hero-swiper/hero-swiper.component";

@Component({
    selector: 'app-home-hero-section',
    standalone: true,
    templateUrl: './hero-section.component.html',
    imports: [HeroSwiperComponent]
})

export class HeroSectionComponent {
    title = 'front-angular';
}