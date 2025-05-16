import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountriesListComponent } from './countries-list.component';
import { CountriesService } from '../../../core/services/countries.service';
import { FavoritesService } from '../../../core/services/favorites.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Country } from '../../../core/models/country.interface';

describe('CountriesListComponent', () => {
  let component: CountriesListComponent;
  let fixture: ComponentFixture<CountriesListComponent>;
  let countriesServiceMock: jasmine.SpyObj<CountriesService>;
  let favoritesServiceMock: jasmine.SpyObj<FavoritesService>;
  let routerMock: jasmine.SpyObj<Router>;

  const mockCountries: Country[] = [
    { cca2: 'US', name: { common: 'United States' }, region: 'Americas', flags: { png: 'url1' } } as Country,
    { cca2: 'FR', name: { common: 'France' }, region: 'Europe', flags: { png: 'url2' } } as Country,
  ];

  beforeEach(async () => {
    countriesServiceMock = jasmine.createSpyObj('CountriesService', ['getAllCountries']);
    favoritesServiceMock = jasmine.createSpyObj('FavoritesService', ['getFavorites', 'setShowMultipleFavorites', 'isFavorite']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    countriesServiceMock.getAllCountries.and.returnValue(of(mockCountries));
    favoritesServiceMock.getFavorites.and.returnValue(['US']);
    favoritesServiceMock.isFavorite.and.callFake((code: string) => code === 'US');

    await TestBed.configureTestingModule({
      imports: [CountriesListComponent],
      providers: [
        { provide: CountriesService, useValue: countriesServiceMock },
        { provide: FavoritesService, useValue: favoritesServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CountriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and load countries', () => {
    expect(component).toBeTruthy();
    expect(component.countries()).toEqual(mockCountries);
  });

  it('should filter countries by region', () => {
    component.onRegionChange('Europe');
    const filtered = component.filteredCountries();
    expect(filtered.length).toBe(1);
    expect(filtered[0].cca2).toBe('FR');
  });

  it('should filter countries by search term', () => {
    component.onSearch('uni');
    const filtered = component.filteredCountries();
    expect(filtered.length).toBe(1);
    expect(filtered[0].cca2).toBe('US');
  });

  it('should set countries to empty array on loadCountries error', () => {
    countriesServiceMock.getAllCountries.and.returnValue(
      new Observable((subscriber) => {
        subscriber.error('Error fetching countries');
      })
    );

    fixture = TestBed.createComponent(CountriesListComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    expect(component.countries()).toEqual([]);
  });

  it('should filter to favorites only', () => {
    component.toggleShowFavorites();
    const filtered = component.filteredCountries();
    expect(filtered.length).toBe(1);
    expect(filtered[0].cca2).toBe('US');
  });

  it('should navigate to favorite details when favorites exist', () => {
    component.goToFavoritesDetails();
    expect(favoritesServiceMock.setShowMultipleFavorites).toHaveBeenCalledWith(true);
    expect(routerMock.navigate).toHaveBeenCalledWith(['countries/country', 'US']);
  });

  it('should not navigate if no favorites', () => {
    favoritesServiceMock.getFavorites.and.returnValue([]);
    component.goToFavoritesDetails();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to country detail and set flag', () => {
    component.goToDetail('FR');
    expect(favoritesServiceMock.setShowMultipleFavorites).toHaveBeenCalledWith(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['countries/country', 'FR']);
  });

  it('should set selectedRegion to empty string when onRegionChange receives null', () => {
    component.onRegionChange(null);
    expect(component.selectedRegion()).toBe('');
  });
});
