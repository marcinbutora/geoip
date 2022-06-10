import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IpInfoComponent } from './pages/ip/ip-info/ip-info.component';
import { HomeComponent } from './layout/home/home.component';

export const enum RoutesLinks {
  ipGetData = 'ip/:ip/:lat/:lon',
  empty = '',
  ip = 'ip',
}

const routes: Routes = [
  { path: RoutesLinks.ipGetData, component: IpInfoComponent },
  { path: RoutesLinks.empty, component: HomeComponent },
  { path: '**', redirectTo: RoutesLinks.ip },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
