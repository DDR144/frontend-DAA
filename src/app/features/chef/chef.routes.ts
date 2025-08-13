import { Routes } from "@angular/router";
import { AuthGuard } from "../../core/guards/auth.guard";

export const CHEF_ROUTES: Routes = [
    {
        path: '', 
        loadComponent: () => import('./components/chef.component/chef.component').then(m => m.ChefComponent),
        canActivate: [AuthGuard] 
    },
    {
        path: 'list', 
        loadComponent: () => import('./components/chef.component/chef.component').then(m => m.ChefComponent),
        canActivate: [AuthGuard] 
    },  
    {
        path: 'add',
        loadComponent: () => import('./components/chef.add.component/chef.add.component').then(m => m.ChefAddComponent),
        canActivate: [AuthGuard]
    },    
    {
        path: 'update/:uid',
        loadComponent: () => import('./components/chef.update.component/chef.update.component').then(m => m.ChefUpdateComponent),
        canActivate: [AuthGuard]
    } 
]