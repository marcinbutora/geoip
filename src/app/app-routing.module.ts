import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IpInfoComponent } from './pages/ip/ip-info/ip-info.component';
import { HomeComponent } from './layout/home/home.component';
import { IpClientComponent } from './pages/ip/ip-client/ip-client.component';

export const enum RoutesLinks {
  ipClient = 'ip/:ip',
  empty = '',
  ip = 'ip',
}

const routes: Routes = [
  { path: RoutesLinks.ipClient, component: IpInfoComponent },
  { path: RoutesLinks.empty, component: HomeComponent },
  { path: RoutesLinks.ip, component: IpClientComponent },
  { path: RoutesLinks.empty, pathMatch: 'full', redirectTo: '/' },
  { path: '**', redirectTo: RoutesLinks.ip },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
