import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'feed',
    loadChildren: () => import('./feed/feed.routes').then((m) => m.FEED_ROUTES),
  },
];
