
import { Routes } from '@angular/router';

import { Dashboard } from './pages/dashboard/dashboard';
import { ProductList } from './pages/products/product-list/product-list';
import { Orders } from './pages/orders/orders';
import { Customers } from './pages/customers/customers';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: Dashboard
  },
  {
    path: 'products',
    component: ProductList
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
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
