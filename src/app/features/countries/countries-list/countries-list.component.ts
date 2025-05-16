import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  computed,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CountriesService } from '../../../core/services/countries.service';
import { Country } from '../../../core/models/country.interface';
import { SearchInputComponent } from '../../../shared/components/search-input/search-input.component';
import { RegionDropdownComponent } from '../../../shared/components/region-dropdown/region-dropdown.component';
import { FavoriteToggleComponent } from '../../../shared/components/favorite-toggle/favorite-toggle.component';
import { CommonModule, NgClass } from '@angular/common';
import { ScrollerModule } from 'primeng/scroller';
import { FavoritesService } from '../../../core/services/favorites.service';

@Component({
  selector: 'app-countries-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgClass,
    SearchInputComponent,
    RegionDropdownComponent,
    FavoriteToggleComponent,
    ScrollerModule
  ],
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesListComponent {
  private readonly favoritesService = inject(FavoritesService);
  private readonly countriesService = inject(CountriesService);
  private readonly router = inject(Router);

  readonly countries = signal<Country[]>([]);
  readonly searchTerm = signal('');
  readonly selectedRegion = signal('');
  readonly showFavoritesOnly = signal(false);

  readonly filteredCountries = computed(() => {
    let filtered = this.countries();

    if (this.selectedRegion()) {
      filtered = filtered.filter(
        (c) => c.region === this.selectedRegion()
      );
    }

    if (this.searchTerm().length >= 3) {
      filtered = filtered.filter((c) =>
        c.name.common
          .toLowerCase()
          .includes(this.searchTerm().toLowerCase())
      );
    }

    if (this.showFavoritesOnly()) {
      const favSet = new Set(this.favoritesService.getFavorites());
      filtered = filtered.filter(c => favSet.has(c.cca2));
    }

    return filtered;
  });

  constructor() {
    this.loadCountries();
  }

  private loadCountries(): void {
    this.countriesService.getAllCountries().subscribe({
      next: (data) => this.countries.set(data),
      error: () => this.countries.set([]),
    });
  }

  onSearch(term: string): void {
    this.searchTerm.set(term);
  }

  onRegionChange(region: string | null): void {
    this.selectedRegion.set(region ?? '');
  }

  toggleShowFavorites() {
    this.showFavoritesOnly.set(!this.showFavoritesOnly());
  }
  goToFavoritesDetails() {
    const favoriteCodes = this.favoritesService.getFavorites();
    if (favoriteCodes.length) {
      console.log(favoriteCodes)
      this.favoritesService.setShowMultipleFavorites(true);
      this.router.navigate(['countries/country', favoriteCodes[0]]);
    }
  }

  goToDetail(countryCode: string): void {
    this.favoritesService.setShowMultipleFavorites(false);
    this.router.navigate(['countries/country', countryCode]);
  }
}
