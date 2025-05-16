import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Country } from '../models/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private readonly API_URL = 'https://restcountries.com/v3.1';

  constructor(private readonly http: HttpClient) {}

  getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.API_URL}/all`).pipe(
      catchError((error) => {
        console.error('Error fetching countries', error);
        return throwError(() => new Error('Error fetching countries'));
      })
    );
  }

  getCountriesByRegion(region: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.API_URL}/region/${region}`).pipe(
      catchError((error) => {
        console.error('Error fetching countries by region', error);
        return throwError(() => new Error('Error fetching countries by region'));
      })
    );
  }

  getCountryByCode(code: string): Observable<Country> {
    return this.http.get<Country[]>(`${this.API_URL}/alpha/${code}`).pipe(
      catchError((error) => {
        console.error('Error fetching country by code', error);
        return throwError(() => new Error('Error fetching country by code'));
      }),
      map((countries) => countries[0])
    );
  }
}
