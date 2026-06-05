import { NgModule, isDevMode } from '@angular/core';
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
import { CookieConsentComponent } from './shared/cookie-consent/cookie-consent.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { TranslatePipe } from './shared/translate/translate.pipe';
import { NotificationComponent } from './shared/notification/notification.component';
import { ServiceWorkerModule } from '@angular/service-worker';

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
    CookieConsentComponent,
    TranslatePipe,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgbModule,
    ClipboardModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
