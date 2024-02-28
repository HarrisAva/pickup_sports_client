import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { noAuthGuard } from './core/guards/no-auth.guard';

export const routes: Routes = [
{
  path: "",
  pathMatch: "full",
  loadComponent: () => import("./features/timeline/timeline.component").then((c) => c.TimelineComponent),
  canActivate: [authGuard] // need token to access (isLoggedIn)
},
{
  path: 'events',
  loadComponent: () => import("./features/events/events.component").then((c) => c.EventsComponent),
  canActivate: [authGuard] // need token to access (isLoggedIn)
},
{
  path: 'login',
  loadComponent: () => import("./features/auth/login/login.component").then((c) => c.LoginComponent),
  canActivate: [noAuthGuard] // implement no-auth to this page (no need token to access)
},

{
  path: 'signup',
  loadComponent: () => import("./features/auth/signup/signup.component").then((c) => c.SignupComponent),
  canActivate: [noAuthGuard] // implement no-auth to this page (no need token to access)
}
];
 // structure of lazy loading
// loadComponent return a promise in which we'll have to resolve, this is going to take in an arrow function c.timeline component
