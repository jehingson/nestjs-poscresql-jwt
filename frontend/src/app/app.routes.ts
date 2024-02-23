import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guards';
import { AuthGuardOff } from './core/guards/authOff.guards';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.AUTH_ROUTES),
    canActivate: [AuthGuardOff],
  },
  {
    path: 'feed',
    loadChildren: () => import('./feed/feed.routes').then((m) => m.FEED_ROUTES),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
