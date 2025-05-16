import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CountriesService } from './services/countries.service';


@NgModule({
  imports: [],
  providers: [CountriesService]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it only once.'
      );
    }
  }
}
