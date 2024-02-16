import { Routes } from '@angular/router';

export const routes: Routes = [
{
  path: "",
  pathMatch: "full",
  loadComponent: () => import("./features/timeline/timeline.component").then((c) => c.TimelineComponent)

  // structure of lazy loading
}
];
// loadComponent return a promise in which we'll have to resolve, this is going to take in an arrow function c.timeline component
