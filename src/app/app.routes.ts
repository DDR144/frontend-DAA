import { Routes } from '@angular/router';
import { LoginPage } from './features/auth/login/login.page';
import { HomePage } from './features/home/home.page';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '*', redirectTo: 'login' },
  { path: 'login', component: LoginPage },
  { path: 'home', component: HomePage, canActivate: [AuthGuard] },
  {
    path: 'customer',
    loadChildren: () =>
      import('./features/customer/customer.routes').then(
        (m) => m.STUDENT_ROUTES
      ),
  },
  {
    path: 'chef',
    loadChildren: () =>
      import('./features/chef/chef.routes').then((m) => m.CHEF_ROUTES),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./features/user/user.routes').then((m) => m.USERS_ROUTES),
  },
  {
    path: 'dish',
    loadChildren: () =>
      import('./features/dish/dish.routes').then((m) => m.DISH_ROUTES),
  }
];
