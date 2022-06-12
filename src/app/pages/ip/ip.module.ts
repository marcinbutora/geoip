import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DetailsComponent } from './details/details.component';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import { WeatherComponent } from 'src/app/shared/weather/weather.component';
import { TimezoneComponent } from 'src/app/shared/timezone/timezone.component';
import { DataComponent } from 'src/app/shared/data/data.component';

@NgModule({
  declarations: [
    DetailsComponent,
    SpinnerComponent,
    WeatherComponent,
    TimezoneComponent,
    DataComponent,
  ],
  exports: [DetailsComponent],
  imports: [CommonModule, HttpClientModule, FormsModule],
})
export class IpModule {}
