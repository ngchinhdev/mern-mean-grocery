import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { CategoriesService } from "../../../../core/services/categories.service";
import { ICategory } from "../../../../core/models/categories.model";
import { PUBLIC_ENDPOINTS } from "../../../../core/constants/constants";

@Component({
    selector: "app-header",
    standalone: true,
    imports: [MatIconModule, RouterLink, RouterLinkActive, MatMenuModule],
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"],
    encapsulation: ViewEncapsulation.None
})

export class HeaderComponent implements OnInit {
    public categories: ICategory[] = [];
    public imageUrl = PUBLIC_ENDPOINTS.IMAGE_CATEGORIES;

    constructor(private categoriesService: CategoriesService) {

    }

    ngOnInit(): void {
        this.getAllCategories();
    }

    getAllCategories() {
        this.categoriesService.getAllCategories().subscribe({
            next: (response) => {
                this.categories = response.data;
            }
        });
    }
}