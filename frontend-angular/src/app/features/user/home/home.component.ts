import { Component } from "@angular/core";

import { HeroSectionComponent } from "./hero-section/hero-section.component";
import { CategoriesSectionComponent } from "./categories-section/categories-section.component";
import { PopularProductComponent } from "./popular-products/popular-products.component";
import { DiscountProductsComponent } from "./discount-products/discount-products.component";
import { DownloadAppSectionComponent } from "./download-app-section/download-app-section.component";

@Component({
    selector: "app-home",
    standalone: true,
    templateUrl: "./home.component.html",
    imports: [HeroSectionComponent, PopularProductComponent, DiscountProductsComponent, DownloadAppSectionComponent, CategoriesSectionComponent]
})

export class HomeComponent {
    title = "frontend-angular";
}