import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SearchInputComponent } from './components/search-input/search-input.component';
import { RegionDropdownComponent } from './components/region-dropdown/region-dropdown.component';
import { FavoriteToggleComponent } from './components/favorite-toggle/favorite-toggle.component';

import { RegionNamePipe } from './pipes/region-name.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';

import { AutofocusDirective } from './directives/autofocus.directive';

@NgModule({
  imports: [
    SearchInputComponent,
    RegionDropdownComponent,
    FavoriteToggleComponent,
    RegionNamePipe,
    TruncatePipe,
    AutofocusDirective,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    SearchInputComponent,
    RegionDropdownComponent,
    FavoriteToggleComponent,
    RegionNamePipe,
    TruncatePipe,
    AutofocusDirective,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {}
