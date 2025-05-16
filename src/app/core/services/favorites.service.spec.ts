import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CountriesListComponent } from '../../features/countries/countries-list/countries-list.component';
import { CountriesService } from './countries.service';
import { FavoritesService } from './favorites.service';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { Country } from '../models/country.interface';

describe('CountriesListComponent', () => {
  let component: CountriesListComponent;
  let fixture: ComponentFixture<CountriesListComponent>;
  let favoritesService: FavoritesService;

  const countriesMock: Country[] = [
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
    },
  ];

  const countriesServiceMock = {
    getAllCountries: jasmine.createSpy('getAllCountries').and.returnValue(of(countriesMock)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountriesListComponent],
      providers: [
        provideRouter([]),
        { provide: CountriesService, useValue: countriesServiceMock },
        FavoritesService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CountriesListComponent);
    component = fixture.componentInstance;
    favoritesService = TestBed.inject(FavoritesService);
    fixture.detectChanges();
  });

  it('should load countries on init', () => {
    expect(countriesServiceMock.getAllCountries).toHaveBeenCalled();
    expect(component.countries()).toEqual(countriesMock);
  });

  it('should filter countries by region', () => {
    component.selectedRegion.set('Americas');
    const filtered = component.filteredCountries();
    expect(filtered.length).toBe(1);
    expect(filtered[0].region).toBe('Americas');
  });

  it('should show only favorite countries when showFavoritesOnly is true', () => {
    favoritesService.addFavorite('US');
    component.showFavoritesOnly.set(true);
    const filtered = component.filteredCountries();
    expect(filtered.length).toBe(1);
    expect(filtered[0].cca2).toBe('US');
  });

  it('should return no countries when no favorites are added', () => {
    component.showFavoritesOnly.set(true);
    const filtered = component.filteredCountries();
    expect(filtered.length).toBe(0);
  });

  it('should update favorites correctly', () => {
    expect(favoritesService.getFavorites()).toEqual([]);
    favoritesService.addFavorite('US');
    expect(favoritesService.getFavorites()).toEqual(['US']);
    expect(favoritesService.isFavorite('US')).toBeTrue();

    favoritesService.removeFavorite('US');
    expect(favoritesService.isFavorite('US')).toBeFalse();
  });

  it('should toggle viewing multiple favorites state', () => {
    expect(favoritesService.isViewingMultipleFavorites()).toBeFalse();
    favoritesService.setShowMultipleFavorites(true);
    expect(favoritesService.isViewingMultipleFavorites()).toBeTrue();
  });
});
