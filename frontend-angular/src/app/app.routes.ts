import { Routes } from '@angular/router';

// User Components
import { UserComponent } from './pages/user/user.component';
import { HomeComponent } from './features/user/home/home.component';

// Admin Components
import { AdminComponent } from './pages/admin/admin.component';
import { ProductsComponent } from './features/admin/products/products.component';
import { CategoriesComponent } from './features/admin/categories/categories.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { CategoryEditorComponent } from './features/admin/categories/category-editor/category-editor.component';
import { ProductEditorComponent } from './features/admin/products/product-editor/product-editor.component';
import { CategoryListComponent } from './features/admin/categories/category-list/category-list.component';
import { ProductListComponent } from './features/admin/products/product-list/product-list.component';

export const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        children: [
            { path: '', component: HomeComponent },
        ]
    },
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            {
                path: 'categories',
                component: CategoriesComponent,
                children: [
                    { path: '', component: CategoryListComponent },
                    { path: 'add', component: CategoryEditorComponent },
                    { path: 'edit/:id', component: CategoryEditorComponent }
                ]
            },
            {
                path: 'products',
                component: ProductsComponent,
                children: [
                    { path: '', component: ProductListComponent },
                    { path: 'add', component: ProductEditorComponent },
                    { path: 'edit/:id', component: ProductEditorComponent }
                ]
            },
        ]
    }
];

