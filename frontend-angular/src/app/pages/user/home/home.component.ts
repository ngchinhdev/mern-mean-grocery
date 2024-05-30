import { Component, OnInit, inject } from "@angular/core";

import { HeroSectionComponent } from "../../../features/user/home/hero-section/hero-section.component";
import { CategoriesSectionComponent } from "../../../features/user/home/categories-section/categories-section.component";
import { PopularProductComponent } from "../../../features/user/home/popular-products/popular-products.component";
import { DiscountProductsComponent } from "../../../features/user/home/discount-products/discount-products.component";
import { DownloadAppSectionComponent } from "../../../features/user/home/download-app-section/download-app-section.component";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../../core/services/auth.service";

@Component({
    selector: "app-home",
    standalone: true,
    templateUrl: "./home.component.html",
    imports: [HeroSectionComponent, PopularProductComponent, DiscountProductsComponent, DownloadAppSectionComponent, CategoriesSectionComponent]
})

export class HomeComponent implements OnInit {
    private activatedRoute = inject(ActivatedRoute);
    private router = inject(Router);
    private authService = inject(AuthService);

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(params => {
            if (params['accessToken']) {
                localStorage.setItem('accessToken', params['accessToken']);
                this.getUserProfile();
            } else {
                this.router.navigate(['/']);
            }
        });
    }

    getUserProfile() {
        this.authService.getUserProfile().subscribe({
            next: (response) => {
                this.authService.isLoggedIn = true;
                this.authService.isAdmin = response.data.isAdmin;

                this.router.navigate(['/user/information']);
            }
        });
    };
}