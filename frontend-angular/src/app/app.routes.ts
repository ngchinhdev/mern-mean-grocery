import { Routes } from '@angular/router';

// User Components
import { HomeComponent } from './pages/user/home/home.component';
import { ProductDetailComponent } from './pages/user/product-detail/product-detail.component';
import { UserComponent } from './shared/layouts/user/user.component';
import { ProductsComponent } from './pages/user/products/products.component';
import { UserDetailComponent } from './pages/user/user-detail/user-detail.component';
import { UserInformationComponent } from './features/user/user-detail/user-information/user-information.component';
import { ChangePasswordComponent } from './features/user/user-detail/change-password/change-password.component';
import { MyOrderComponent } from './features/user/user-detail/my-order/my-order.component';
import { CheckoutComponent } from './pages/user/checkout/checkout.component';
import { OrderDetailComponent as UserOrderDetailComponent } from './features/user/user-detail/order-detail/order-detail.component';

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
import { authGuard } from './core/guards/auth.guard';
import { OrderComponent as AdminOrderComponent } from './pages/admin/order/order.component';
import { OrderListComponent } from './features/admin/order/order-list/order-list.component';
import { OrderDetailComponent } from './features/admin/order/order-detail/order-detail.component';
import { adminGuard } from './core/guards/admin.guard';
import { CouponComponent as AdminCouponComponent } from './pages/admin/coupon/coupon.component';
import { CouponListComponent } from './features/admin/coupons/coupon-list/coupon-list.component';
import { CouponEditorComponent } from './features/admin/coupons/coupon-editor/coupon-editor.component';


export const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        children: [
            { path: '', component: HomeComponent, pathMatch: 'full' },
            { path: 'product/:id', component: ProductDetailComponent },
            { path: 'products/search', component: ProductsComponent },
            {
                path: 'user',
                component: UserDetailComponent,
                canActivate: [authGuard],
                children: [
                    { path: 'information', component: UserInformationComponent },
                    { path: 'change-password', component: ChangePasswordComponent },
                    { path: 'orders', component: MyOrderComponent },
                    { path: 'orders/order/:id', component: UserOrderDetailComponent },
                ]
            },
            { path: 'checkout', component: CheckoutComponent },
        ]
    },
    {
        path: 'admin',
        canActivateChild: [adminGuard],
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
            {
                path: 'orders',
                component: AdminOrderComponent,
                children: [
                    { path: '', component: OrderListComponent },
                    { path: 'order/:id', component: OrderDetailComponent },
                ]
            },
            {
                path: 'coupons',
                component: AdminCouponComponent,
                children: [
                    { path: '', component: CouponListComponent },
                    { path: 'add', component: CouponEditorComponent },
                    { path: 'edit/:id', component: CouponEditorComponent },
                ]
            },
        ]
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
];

