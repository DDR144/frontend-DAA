import { Routes } from '@angular/router';
import { LoginPage } from './features/auth/login/login.page';
import { HomePage } from './features/home/home.page';
import { authGuard } from './core/auth-guard';
import { ChefsPage } from './features/chefs/pages/chefs-list/chefs.page';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '*', redirectTo: 'login' },
  { path: 'login', component: LoginPage },
  { path: 'home', component: HomePage, canActivate: [authGuard] },
  { path: 'chefs', component: ChefsPage, canActivate: [authGuard] }
];  
