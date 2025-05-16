import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { CountriesService } from './countries.service';
import { Country } from '../models/country.interface';

@Injectable({
  providedIn: 'root',
})
export class ExtendedDataService {
  constructor(private readonly countriesService: CountriesService) {}

  getMultipleCountriesDetails(codes: string[]): Observable<Country[]> {
    const requests = codes.map((code) => this.countriesService.getCountryByCode(code));
    return forkJoin(requests);
  }
}
