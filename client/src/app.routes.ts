import { provideRouter, RouterConfig } from '@angular/router';
import {CoreRoutes} from './app/core/core.routes';
import {ErrorPage} from './app/error/error';
import {LoginPage} from './app/login/login';
import {RegisterComponent} from './app/login/register';


const routes: RouterConfig = [
  ...CoreRoutes,
  { path: 'error', component: ErrorPage},
  { path: 'login', component: LoginPage},
  { path: 'register', component: RegisterComponent},
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '/login' },
];


export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
