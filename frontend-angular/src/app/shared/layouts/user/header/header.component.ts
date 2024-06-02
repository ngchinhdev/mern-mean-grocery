import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation, inject } from "@angular/core";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { CategoriesService } from "../../../../core/services/categories.service";
import { ICategory } from "../../../../core/models/categories.model";
import { PUBLIC_ENDPOINTS } from "../../../../core/constants/urls";
import { CartService } from "../../../../core/services/cart.service";
import { AuthService } from "../../../../core/services/auth.service";
import { IUser } from "../../../../core/models/auth.model";

@Component({
    selector: "app-header",
    standalone: true,
    imports: [MatIconModule, RouterLink, RouterLinkActive, MatMenuModule, MatSidenavModule, FormsModule, CommonModule],
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"],
    encapsulation: ViewEncapsulation.None
})

export class HeaderComponent implements OnInit {
    userProfile: IUser | null = null;
    categories: ICategory[] = [];
    imageUrl = PUBLIC_ENDPOINTS.IMAGE_CATEGORIES;
    avatarUrl!: string;
    searchValue!: string;

    @Input() openAuthDialog!: () => void;
    @Output() toggleSidenav = new EventEmitter<void>();

    constructor(
        private categoriesService: CategoriesService,
        private cartService: CartService,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.authService.initializeAccessToken();
        this.getUserProfile();
        this.authService.userProfile$.subscribe(data => this.userProfile = data);
        this.getAllCategories();
    }

    getAllCategories() {
        this.categoriesService.getAllCategories().subscribe({
            next: (response) => {
                console.log(response.data);
                this.categories = response.data;
            }
        });
    }

    getUserProfile() {
        this.authService.getUserProfile().subscribe({
            next: (res) => {
                this.authService.setUserProfile(res.data);
            }
        });
    }

    onToggleSidenav() {
        this.toggleSidenav.emit();
    }

    onOpenAuthDialog() {
        this.openAuthDialog();
    }

    onAuth() {
        if (this.userProfile) {
            // Logout 
            return this.authService.logoutUser().subscribe({
                next: (response) => {
                    this.userProfile = null;
                    this.authService.isLoggedIn = false;
                    this.authService.setUserProfile(null);

                    localStorage.removeItem('accessToken');

                    this.router.navigate(['/']);
                },
                error: (error) => {
                    console.log(error);
                    return null;
                }
            });
        } else {
            this.onOpenAuthDialog();
        }
        return;
    }

    navigateToCategory(categoryId: string) {
        this.router.navigate(['/products/search'], { queryParams: { category: categoryId } });
    }

    onSearch() {
        this.router.navigate(['/products/search'], { queryParams: { name: this.searchValue } });
        this.searchValue = '';
    }

    get cartTotal() {
        return this.cartService.getCartItems().length;
    }
}