import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation, inject } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';

import { CategoriesService } from "../../../../core/services/categories.service";
import { ICategory } from "../../../../core/models/categories.model";
import { PUBLIC_ENDPOINTS } from "../../../../core/constants/urls";
import { CartService } from "../../../../core/services/cart.service";

@Component({
    selector: "app-header",
    standalone: true,
    imports: [MatIconModule, RouterLink, RouterLinkActive, MatMenuModule, MatSidenavModule],
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"],
    encapsulation: ViewEncapsulation.None
})

export class HeaderComponent implements OnInit {
    public categories: ICategory[] = [];
    public imageUrl = PUBLIC_ENDPOINTS.IMAGE_CATEGORIES;

    @Input() openAuthDialog!: () => void;
    @Output() toggleSidenav = new EventEmitter<void>();

    constructor(
        private categoriesService: CategoriesService,
        private cartService: CartService
    ) { }

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

    onToggleSidenav() {
        this.toggleSidenav.emit();
    }

    onOpenAuthDialog() {
        this.openAuthDialog();
    }

    get cartTotal() {
        return this.cartService.getCartItems().length;
    }
}