import { Routes } from '@angular/router';

import { UserComponent } from './pages/user/user.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './features/user/home/home.component';

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
    }
];
