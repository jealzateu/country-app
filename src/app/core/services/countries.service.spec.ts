import { TestBed } from '@angular/core/testing';
import { CountriesService } from './countries.service';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController
} from '@angular/common/http/testing';
import { Country } from '../models/country.interface';

describe('CountriesService', () => {
  let service: CountriesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CountriesService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(CountriesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch all countries', () => {
    const mockCountries: Country[] = [
      {
        cca2: 'US',
        name: { common: 'United States', official: 'United States of America' },
        region: 'Americas',
        flags: { png: 'flag.png' },
        capital: 'Washington',
        subregion: 'Northern America',
        population: 331000000
      }
    ];

    service.getAllCountries().subscribe((data) => {
      expect(data).toEqual(mockCountries);
    });

    const req = httpMock.expectOne('https://restcountries.com/v3.1/all');
    expect(req.request.method).toBe('GET');
    req.flush(mockCountries);
  });

  it('should handle error on getAllCountries', () => {
    service.getAllCountries().subscribe({
      next: () => fail('expected an error'),
      error: (error) => {
        expect(error.message).toBe('Error fetching countries');
      }
    });

    const req = httpMock.expectOne('https://restcountries.com/v3.1/all');
    req.flush({}, { status: 500, statusText: 'Server Error' });
  });

  it('should fetch countries by region', () => {
    const region = 'Europe';
    const mockCountries: Country[] = [
      {
        cca2: 'FR',
        name: { common: 'France', official: 'French Republic' },
        region: 'Europe',
        flags: { png: 'flag.png' },
        capital: 'Paris',
        subregion: 'Western Europe',
        population: 67000000
      }
    ];

    service.getCountriesByRegion(region).subscribe((data) => {
      expect(data).toEqual(mockCountries);
    });

    const req = httpMock.expectOne(`https://restcountries.com/v3.1/region/${region}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCountries);
  });

  it('should handle error on getCountriesByRegion', () => {
    const region = 'Europe';

    service.getCountriesByRegion(region).subscribe({
      next: () => fail('expected an error'),
      error: (error) => {
        expect(error.message).toBe('Error fetching countries by region');
      }
    });

    const req = httpMock.expectOne(`https://restcountries.com/v3.1/region/${region}`);
    req.flush({}, { status: 500, statusText: 'Server Error' });
  });

  it('should fetch country by code', () => {
    const code = 'US';
    const mockCountry: Country = {
      cca2: 'US',
      name: { common: 'United States', official: 'United States of America' },
      region: 'Americas',
      flags: { png: 'flag.png' },
      capital: 'Washington',
      subregion: 'Northern America',
      population: 331000000
    };

    service.getCountryByCode(code).subscribe((data) => {
      expect(data).toEqual(mockCountry);
    });

    const req = httpMock.expectOne(`https://restcountries.com/v3.1/alpha/${code}`);
    expect(req.request.method).toBe('GET');
    req.flush([mockCountry]);
  });

  it('should handle error on getCountryByCode', () => {
    const code = 'US';

    service.getCountryByCode(code).subscribe({
      next: () => fail('expected an error'),
      error: (error) => {
        expect(error.message).toBe('Error fetching country by code');
      }
    });

    const req = httpMock.expectOne(`https://restcountries.com/v3.1/alpha/${code}`);
    req.flush({}, { status: 500, statusText: 'Server Error' });
  });
});
