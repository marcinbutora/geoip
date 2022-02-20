import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import { DetailsComponent } from './details/details.component';



@NgModule({
  declarations: [


    DetailsComponent
  ],
  exports: [
    DetailsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class IpModule { }
