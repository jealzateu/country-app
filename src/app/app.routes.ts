import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'countries',
    pathMatch: 'full'
  },
  {
    path: 'countries',
    loadChildren: () =>
      import('./features/countries/countires.routes').then(m => m.COUNTRIES_ROUTES)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
