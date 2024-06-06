import { Component, OnInit, inject } from "@angular/core";

import "swiper/css";
import "swiper/css/pagination";

import { HeroSwiperComponent } from "./hero-swiper/hero-swiper.component";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { CouponService } from "../../../../core/services/coupon.service";
import { ICoupon } from "../../../../core/models/coupon.model";
import { CurrencyPipe } from "../../../../core/pipes/currency.pipe";

@Component({
    selector: 'app-home-hero-section',
    standalone: true,
    templateUrl: './hero-section.component.html',
    imports: [HeroSwiperComponent, ButtonComponent, CurrencyPipe]
})

export class HeroSectionComponent implements OnInit {
    coupons!: ICoupon[];

    couponService = inject(CouponService);

    ngOnInit(): void {
        this.couponService.getAllCoupons().subscribe({
            next: (res) => {
                this.coupons = res.data;
            }
        });
    }

    isActiveCoupon(endDate: string) {
        return new Date(endDate).getTime() > Date.now();
    }
}