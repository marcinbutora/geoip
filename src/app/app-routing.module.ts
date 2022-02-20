import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IpInfoComponent} from "./pages/ip/ip-info/ip-info.component";

const routes: Routes = [
  {path: 'ip/:ip', component: IpInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
