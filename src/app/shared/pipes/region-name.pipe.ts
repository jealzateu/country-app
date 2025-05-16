import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'regionName',
  standalone: true,
})
export class RegionNamePipe implements PipeTransform {
  transform(value: string | undefined): string {
    return value ? value.toUpperCase() : '';
  }
}
