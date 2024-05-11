import { Routes } from '@angular/router';

import { UserComponent } from './pages/user/user.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './features/user/home/home.component';
import { ProductsComponent } from './features/admin/products/products.component';
import { CategoriesComponent } from './features/admin/categories/categories.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';

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
            { path: 'categories', component: CategoriesComponent },
            { path: 'products', component: ProductsComponent },
        ]
    }
];
