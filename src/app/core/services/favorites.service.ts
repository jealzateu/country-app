import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private readonly _favorites = signal<Set<string>>(new Set());

  readonly favorites = this._favorites.asReadonly();

  private viewingMultipleFavorites = false;

  addFavorite(code: string): void {
    const current = new Set(this._favorites());
    current.add(code);
    this._favorites.set(current);
  }

  removeFavorite(code: string): void {
    const current = new Set(this._favorites());
    current.delete(code);
    this._favorites.set(current);
  }

  isFavorite(code: string): boolean {
    return this._favorites().has(code);
  }

  getFavorites(): string[] {
    return Array.from(this._favorites());
  }

  setShowMultipleFavorites(value: boolean) {
    this.viewingMultipleFavorites = value;
  }

  isViewingMultipleFavorites(): boolean {
    return this.viewingMultipleFavorites;
  }
}
