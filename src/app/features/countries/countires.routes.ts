import { Routes } from '@angular/router';
import { CountriesListComponent } from './countries-list/countries-list.component';
import { CountryDetailComponent } from './country-detail/country-detail.component';

export const COUNTRIES_ROUTES: Routes = [
  {
    path: 'list',
    component: CountriesListComponent
  },
  {
    path: 'country/:cca2',
    component: CountryDetailComponent
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];
