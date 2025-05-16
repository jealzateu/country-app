import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot, ParamMap, Router } from '@angular/router';
import { of } from 'rxjs';

import { CountryDetailComponent } from './country-detail.component';
import { CountriesService } from '../../../core/services/countries.service';
import { ExtendedDataService } from '../../../core/services/extended-data.service';
import { FavoritesService } from '../../../core/services/favorites.service';

import { Country } from '../../../core/models/country.interface';


describe('CountryDetailComponent', () => {
  let component: CountryDetailComponent;
  let countriesServiceSpy: jasmine.SpyObj<CountriesService>;
  let extendedDataServiceSpy: jasmine.SpyObj<ExtendedDataService>;
  let favoritesServiceSpy: jasmine.SpyObj<FavoritesService>;
  let router: Router;

  const paramMapMock: ParamMap = {
    get: jasmine.createSpy('get').and.callFake((key: string) => (key === 'cca2' ? 'US' : null)),
    has: jasmine.createSpy('has').and.returnValue(true),
    getAll: jasmine.createSpy('getAll').and.returnValue([]),
    keys: ['cca2'],
  };

  const activatedRouteMock = {
    snapshot: {
      paramMap: paramMapMock,
    } as Partial<ActivatedRouteSnapshot>,
  };

  beforeEach(async () => {
    countriesServiceSpy = jasmine.createSpyObj('CountriesService', ['getCountryByCode']);
    extendedDataServiceSpy = jasmine.createSpyObj('ExtendedDataService', ['getMultipleCountriesDetails']);
    favoritesServiceSpy = jasmine.createSpyObj('FavoritesService', [
      'isViewingMultipleFavorites',
      'getFavorites',
    ]);

    await TestBed.configureTestingModule({
      providers: [
        CountryDetailComponent,
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: CountriesService, useValue: countriesServiceSpy },
        { provide: ExtendedDataService, useValue: extendedDataServiceSpy },
        { provide: FavoritesService, useValue: favoritesServiceSpy },
      ],
      imports: [],
    }).compileComponents();

    router = TestBed.inject(Router);

    component = TestBed.inject(CountryDetailComponent);
  });

  it('should load single country when not viewing multiple favorites', () => {
    favoritesServiceSpy.isViewingMultipleFavorites.and.returnValue(false);

    const mockCountry = { 
      cca2: 'US',
      name: { common: 'United States', official: 'United States of America' },
      region: 'Americas',
      flags: { png: 'flag.png' },
      capital: 'Washington',
      subregion: 'Northern America',
      population: 331000000
     } as Country;
    countriesServiceSpy.getCountryByCode.and.returnValue(of(mockCountry));

    component.ngOnInit();

    expect(favoritesServiceSpy.isViewingMultipleFavorites).toHaveBeenCalled();
    expect(countriesServiceSpy.getCountryByCode).toHaveBeenCalledWith('US');
    expect(component.country).toEqual(mockCountry);
  });

  it('should load multiple countries when viewing multiple favorites', () => {
    favoritesServiceSpy.isViewingMultipleFavorites.and.returnValue(true);
    favoritesServiceSpy.getFavorites.and.returnValue(['US', 'CA']);

    const mockCountries = [
      {
      cca2: 'US',
      name: { common: 'United States', official: 'United States of America' },
      region: 'Americas',
      flags: { png: 'flag.png' },
      capital: 'Washington',
      subregion: 'Northern America',
      population: 331000000
    },
    {
      cca2: 'FR',
      name: { common: 'France', official: 'French Republic' },
      region: 'Europe',
      flags: { png: 'flag.png' },
      capital: 'Paris',
      subregion: 'Western Europe',
      population: 67000000
    }
    ] as Country[];
    extendedDataServiceSpy.getMultipleCountriesDetails.and.returnValue(of(mockCountries));

    component.ngOnInit();

    expect(favoritesServiceSpy.isViewingMultipleFavorites).toHaveBeenCalled();
    expect(favoritesServiceSpy.getFavorites).toHaveBeenCalled();
    expect(extendedDataServiceSpy.getMultipleCountriesDetails).toHaveBeenCalledWith(['US', 'CA']);
    expect(component.countries).toEqual(mockCountries);
  });

  it('should navigate to /countries/list when goBack is called', async () => {
    const navigateSpy = spyOn(router, 'navigate').and.callThrough();

    component.goBack();

    expect(navigateSpy).toHaveBeenCalledWith(['/countries/list']);
  });
});
