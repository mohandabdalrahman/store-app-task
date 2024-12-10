import { Routes } from '@angular/router';

import {AuthGuard} from "./auth/auth.guard";

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'admin', loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent), canActivate: [AuthGuard] },
  { path: 'user', loadComponent: () => import('./user/user.component').then(m => m.UserComponent), canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

