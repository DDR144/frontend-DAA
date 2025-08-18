import { Routes } from "@angular/router";
import { AuthGuard } from "../../core/guards/auth.guard";

export const DISH_ROUTES: Routes = [
    {
        path: '', 
        loadComponent: () => import('./components/dish.component/dish.component').then(m => m.DishComponent),
        canActivate: [AuthGuard] 
    },
    {
        path: 'list', 
        loadComponent: () => import('./components/dish.component/dish.component').then(m => m.DishComponent),
        canActivate: [AuthGuard] 
    },  
    {
        path: 'add',
        loadComponent: () => import('./components/dish.add.component/dish.add.component').then(m => m.DishAddComponent),
        canActivate: [AuthGuard]
    },    
    {
        path: 'update/:uid',
        loadComponent: () => import('./components/dish.update.component/dish.update.component').then(m => m.DishUpdateComponent),
        canActivate: [AuthGuard]
    } 
]