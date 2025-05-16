import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FavoriteToggleComponent } from './favorite-toggle.component';
import { FavoritesService } from '../../../core/services/favorites.service';
import { provideRouter } from '@angular/router';
import { Country } from '../../../core/models/country.interface';

describe('FavoriteToggleComponent', () => {
  let component: FavoriteToggleComponent;
  let fixture: ComponentFixture<FavoriteToggleComponent>;

  const favoritesServiceMock = {
    isFavorite: jasmine.createSpy('isFavorite').and.returnValue(false),
    addFavorite: jasmine.createSpy('addFavorite'),
    removeFavorite: jasmine.createSpy('removeFavorite'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteToggleComponent],
      providers: [
        { provide: FavoritesService, useValue: favoritesServiceMock },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteToggleComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    favoritesServiceMock.isFavorite.calls.reset();
    favoritesServiceMock.addFavorite.calls.reset();
    favoritesServiceMock.removeFavorite.calls.reset();

    favoritesServiceMock.isFavorite.and.returnValue(false);

    component.country = { 
      cca2: 'US',
      name: { common: 'United States', official: 'United States of America' },
      region: 'Americas',
      flags: { png: 'flag.png' },
      capital: 'Washington',
      subregion: 'Northern America',
      population: 331000000
     } as Country;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return false for isFavorite if service returns false', () => {
    favoritesServiceMock.isFavorite.and.returnValue(false);
    expect(component.isFavorite).toBeFalse();
  });

  it('should return true for isFavorite if service returns true', () => {
    favoritesServiceMock.isFavorite.and.returnValue(true);
    expect(component.isFavorite).toBeTrue();
  });

  it('should call addFavorite if isFavorite is false when toggleFavorite is called', () => {
    favoritesServiceMock.isFavorite.and.returnValue(false);
    component.toggleFavorite();
    expect(favoritesServiceMock.addFavorite).toHaveBeenCalledTimes(1);
    expect(favoritesServiceMock.removeFavorite).not.toHaveBeenCalled();
  });

  it('should call removeFavorite if isFavorite is true when toggleFavorite is called', () => {
    favoritesServiceMock.isFavorite.and.returnValue(true);
    component.toggleFavorite();
    expect(favoritesServiceMock.removeFavorite).toHaveBeenCalledTimes(1);
    expect(favoritesServiceMock.addFavorite).not.toHaveBeenCalled();
  });
});
