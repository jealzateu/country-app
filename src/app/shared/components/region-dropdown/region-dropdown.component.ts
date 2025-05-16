import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-region-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './region-dropdown.component.html',
  styleUrls: ['./region-dropdown.component.scss']
})
export class RegionDropdownComponent {
  regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  selectedRegion: string | null = null;

  @Output() regionChange = new EventEmitter<string | null>();

  onRegionChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedRegion = value === '' ? null : value;
    this.regionChange.emit(this.selectedRegion);
  }
}
