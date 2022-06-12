import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DetailsComponent } from './details/details.component';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import { WeatherComponent } from 'src/app/shared/weather/weather.component';

@NgModule({
  declarations: [DetailsComponent, SpinnerComponent, WeatherComponent],
  exports: [DetailsComponent],
  imports: [CommonModule, HttpClientModule, FormsModule],
})
export class IpModule {}
