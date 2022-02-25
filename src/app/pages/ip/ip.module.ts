import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {DetailsComponent} from './details/details.component';
import {IpClientComponent} from './ip-client/ip-client.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    DetailsComponent,
    IpClientComponent
  ],
  exports: [
    DetailsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ]
})
export class IpModule {
}
