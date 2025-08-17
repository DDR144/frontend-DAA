import { Routes } from "@angular/router";
import { AuthGuard } from "../../core/guards/auth.guard";

export const USERS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/user.component/user.component').then(m => m.UserComponent),
        canActivate: [AuthGuard] 
    },
    {
        path: 'register',
        loadComponent: () => import('./components/user.add.component/user.add.component').then(m => m.UserAddComponent),
        canActivate: [AuthGuard] 
    },
    // {
    //     path: 'add',
    //     loadComponent: () => import('./components/user.add.component/user.add.component').then(m => m.UserAddComponent),
    //     canActivate: [AuthGuard] 
    // },
    // {
    //     path: 'update/:uid',
    //     loadComponent: () => import('./components/user.update.component/user.update.component').then(m => m.UserUpdateComponent),
    //     canActivate: [AuthGuard] 
    // }
]