import {NgModule} from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {IpInfoComponent} from "./pages/ip/ip-info/ip-info.component";
import {FooterComponent} from './layout/footer/footer.component';
import {HomeComponent} from './layout/home/home.component';
import {IpModule} from "./pages/ip/ip.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    IpInfoComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    IpModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule {
}
