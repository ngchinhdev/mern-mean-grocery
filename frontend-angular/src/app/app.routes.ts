import { Routes } from '@angular/router';

// User Components
import { HomeComponent } from './pages/user/home/home.component';
import { ProductDetailComponent } from './pages/user/product-detail/product-detail.component';
import { UserComponent } from './shared/layouts/user/user.component';
import { ProductsComponent } from './pages/user/products/products.component';

// Admin Components
import { AdminComponent } from './shared/layouts/admin/admin.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UsersComponent as AdminUsersComponent } from './pages/admin/users/users.component';
import { CategoriesComponent as AdminCategoriesComponent } from './pages/admin/categories/categories.component';
import { ProductsComponent as AdminProductsComponent } from './pages/admin/products/products.component';
import { CategoryListComponent } from './features/admin/categories/category-list/category-list.component';
import { CategoryEditorComponent } from './features/admin/categories/category-editor/category-editor.component';
import { ProductListComponent } from './features/admin/products/product-list/product-list.component';
import { ProductEditorComponent } from './features/admin/products/product-editor/product-editor.component';
import { UserListComponent } from './features/admin/users/user-list/user-list.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'product/:id', component: ProductDetailComponent },
            { path: 'products/search', component: ProductsComponent },
        ]
    },
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            {
                path: 'categories',
                component: AdminCategoriesComponent,
                children: [
                    { path: '', component: CategoryListComponent },
                    { path: 'add', component: CategoryEditorComponent },
                    { path: 'edit/:id', component: CategoryEditorComponent }
                ]
            },
            {
                path: 'products',
                component: AdminProductsComponent,
                children: [
                    { path: '', component: ProductListComponent },
                    { path: 'add', component: ProductEditorComponent },
                    { path: 'edit/:id', component: ProductEditorComponent }
                ]
            },
            {
                path: 'users',
                component: AdminUsersComponent,
                children: [
                    { path: '', component: UserListComponent },
                ]
            },
        ]
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
];

