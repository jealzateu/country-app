import { Component, OnInit } from '@angular/core';
import { Country } from '../../../core/models/country.interface';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CountriesService } from '../../../core/services/countries.service';
import { CommonModule, NgIf } from '@angular/common';
import { RegionNamePipe } from '../../../shared/pipes/region-name.pipe';
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';
import { ExtendedDataService } from '../../../core/services/extended-data.service';
import { FavoritesService } from '../../../core/services/favorites.service';

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIf, RegionNamePipe, TruncatePipe],
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.scss'
})
export class CountryDetailComponent implements OnInit {
  country?: Country;
  countries?: Country[];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly countriesService: CountriesService,
     private readonly extendedDataService: ExtendedDataService,
    private readonly favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    console.log(this.favoritesService.isViewingMultipleFavorites())
    if (this.favoritesService.isViewingMultipleFavorites()) {
      const codes = this.favoritesService.getFavorites();
      this.extendedDataService.getMultipleCountriesDetails(codes).subscribe((data) => {
        this.countries = data;
      });
    } else {
      const code = this.route.snapshot.paramMap.get('cca2');
      if (code) {
        this.countriesService.getCountryByCode(code).subscribe((data) => {
          this.country = data;
        });
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/countries/list']);
  }
}
