import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IpInfoComponent } from './pages/ip/ip-info/ip-info.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './layout/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { WeatherComponent } from './shared/weather/weather.component';
import { TimezoneComponent } from './shared/timezone/timezone.component';
import { DataComponent } from './shared/data/data.component';
import { CopyButtonComponent } from './shared/copy-button/copy-button.component';
import { IpModule } from './pages/ip/ip.module';

@NgModule({
  declarations: [
    AppComponent,
    IpInfoComponent,
    FooterComponent,
    HomeComponent,
    SpinnerComponent,
    WeatherComponent,
    TimezoneComponent,
    DataComponent,
    CopyButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgbModule,
    IpModule,
  ],
  providers: [Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
