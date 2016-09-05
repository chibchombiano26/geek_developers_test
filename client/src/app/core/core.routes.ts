import { provideRouter, RouterConfig } from '@angular/router';
import {Core} from './core';
import {AnotherPage} from './../another/another';
import {Dashboard} from './../dashboard/dashboard';
import {RegisterComponent} from './../login/register';
import {FeedComponent} from './../feed/feed';
import {ProfileComponent} from './../profile/profile';
import {MediaComponent} from './../media/media';
import {AdminComponent} from './../admin/admin';


export const CoreRoutes: RouterConfig = [
  {
    path: 'app',
    component: Core,
    children: [
      { path: 'dashboard', component: Dashboard},
      { path: 'another-page', component: AnotherPage},
      { path: 'register-page', component: RegisterComponent},
      { path: 'feed-page', component: FeedComponent},
      { path: 'profile-page', component: ProfileComponent},
      { path: 'media-page', component: MediaComponent},
      { path: 'admin-page', component: AdminComponent}
    ]
  }
];
