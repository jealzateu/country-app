import { TestBed } from '@angular/core/testing';
import { ExtendedDataService } from './extended-data.service';
import { CountriesService } from './countries.service';
import { of } from 'rxjs';
import { Country } from '../models/country.interface';

describe('ExtendedDataService', () => {
  let service: ExtendedDataService;
  let countriesServiceSpy: jasmine.SpyObj<CountriesService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('CountriesService', ['getCountryByCode']);

    TestBed.configureTestingModule({
      providers: [
        ExtendedDataService,
        { provide: CountriesService, useValue: spy }
      ]
    });

    service = TestBed.inject(ExtendedDataService);
    countriesServiceSpy = TestBed.inject(CountriesService) as jasmine.SpyObj<CountriesService>;
  });

  it('should return multiple countries details', (done) => {
    const mockCountries: Country[] = [
      { cca2: 'US', name: { common: 'United States' } } as Country,
      { cca2: 'CA', name: { common: 'Canada' } } as Country,
    ];

    countriesServiceSpy.getCountryByCode.and.callFake((code: string) => {
      const country = mockCountries.find(c => c.cca2 === code);
      return of(country!);
    });

    service.getMultipleCountriesDetails(['US', 'CA']).subscribe((countries) => {
      expect(countries.length).toBe(2);
      expect(countries).toEqual(mockCountries);
      done();
    });
  });
});
