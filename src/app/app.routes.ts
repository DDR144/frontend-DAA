import { Routes } from '@angular/router';
import { LoginPage } from './pages/login.page';
import { HomePage } from './pages/home.page';
import { authGuard } from './core/auth-guard';
import { ChefsPage } from './pages/chefs.page';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'home', component: HomePage, canActivate: [authGuard] },
  { path: 'chefs', component: ChefsPage, canActivate: [authGuard] }
];  
