
import { Routes } from '@angular/router';

import { Dashboard } from './pages/dashboard/dashboard';
import { ProductList } from './pages/products/product-list/product-list';
import { Orders } from './pages/orders/orders';
import { Customers } from './pages/customers/customers';
import { CustomerDashboard } from './pages/customer/dashboard/dashboard';
import { sellerDashboard } from './pages/seller/dashboard/dashboard';
import { Login } from './pages/auth/login/login';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';

export const routes: Routes = [
    {
        path: 'login/admin',
        component: Login,
        data: { role: 'admin' }
        },
        {
        path: 'login',
        component: Login,
        data: { role: 'customer' }
        },
        {
        path: 'login/seller',
        component: Login,
        data: { role: 'seller' }
        },
        {
        path: 'admin/dashboard',
        component: Dashboard,
        canActivate: [authGuard, roleGuard],
        data: { roles: ['admin'] }
        },
        {
        path: 'dashboard',
        component: CustomerDashboard,
        canActivate: [authGuard, roleGuard],
        data: { roles: ['customer'] }
        },
        {
        path: 'seller/dashboard',
        component: sellerDashboard,
        canActivate: [authGuard, roleGuard],
        data: { roles: ['seller'] }
        },
        {
        path: 'products',
        component: ProductList,
        canActivate: [authGuard, roleGuard],
        data: { roles: ['customer'] }
        },
       
        {
            path: 'orders',
            component: Orders
        },
        {
            path: 'customers',
            component: Customers
        },
        {
            path: '',
            redirectTo: 'login',
            pathMatch: 'full'
        }
];
