import { Component } from "@angular/core";

import { HeroSectionComponent } from "../../../features/user/home/hero-section/hero-section.component";
import { CategoriesSectionComponent } from "../../../features/user/home/categories-section/categories-section.component";
import { PopularProductComponent } from "../../../features/user/home/popular-products/popular-products.component";
import { DiscountProductsComponent } from "../../../features/user/home/discount-products/discount-products.component";
import { DownloadAppSectionComponent } from "../../../features/user/home/download-app-section/download-app-section.component";

@Component({
    selector: "app-home",
    standalone: true,
    templateUrl: "./home.component.html",
    imports: [HeroSectionComponent, PopularProductComponent, DiscountProductsComponent, DownloadAppSectionComponent, CategoriesSectionComponent]
})

export class HomeComponent {
    title = "frontend-angular";
}