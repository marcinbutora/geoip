import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {DetailsComponent} from './details/details.component';
import {IpClientComponent} from './ip-client/ip-client.component';
import {MatCardModule} from "@angular/material/card";


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
        MatCardModule
    ]
})
export class IpModule {
}
