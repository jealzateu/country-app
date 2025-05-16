import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FavoritesService } from '../../../core/services/favorites.service';
import { Country } from '../../../core/models/country.interface';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-favorite-toggle',
  templateUrl: './favorite-toggle.component.html',
  styleUrls: ['./favorite-toggle.component.scss'],
  imports: [NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteToggleComponent {
  @Input() country!: Country;

  constructor(private readonly favoritesService: FavoritesService) {}

  get isFavorite() {
    return this.favoritesService.isFavorite(this.country.cca2);
  }

  toggleFavorite() {
    if (this.isFavorite) {
      this.favoritesService.removeFavorite(this.country.cca2);
    } else {
      this.favoritesService.addFavorite(this.country.cca2);
    }
  }
}
