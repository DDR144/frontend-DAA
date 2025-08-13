import { Routes } from "@angular/router";
import { AuthGuard } from "../../core/guards/auth.guard";

export const STUDENT_ROUTES: Routes = [
    {
        path: '', 
        loadComponent: () => import('./components/customer.component/customer.component').then(m => m.CustomerComponent),
        canActivate: [AuthGuard] 
    },
    {
        path: 'list', 
        loadComponent: () => import('./components/customer.component/customer.component').then(m => m.CustomerComponent),
        canActivate: [AuthGuard] 
    },  
    {
        path: 'add',
        loadComponent: () => import('./components/customer.add.component/customer.add.component').then(m => m.CustomerAddComponent),
        canActivate: [AuthGuard]
    },    
    {
        path: 'update/:uid',
        loadComponent: () => import('./components/customer.update.component/customer.update.component').then(m => m.CustomerUpdateComponent),
        canActivate: [AuthGuard]
    } 
]