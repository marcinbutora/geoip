import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IpInfoComponent} from "./pages/ip/ip-info/ip-info.component";
import {HomeComponent} from "./layout/home/home.component";
import {IpClientComponent} from "./pages/ip/ip-client/ip-client.component";
import {WeatherComponent} from "./pages/ip/weather/weather.component";

const routes: Routes = [
  {path: 'ip/:ip', component: IpInfoComponent},
  {path: '', component: HomeComponent},
  {path: 'ip', component: IpClientComponent},
  {path: 'weather', component: WeatherComponent},
  {path: '', pathMatch: 'full', redirectTo: '/'},
  {path: '**', redirectTo: '/ip'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
