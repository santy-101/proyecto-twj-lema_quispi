import {Routes, RouterModule} from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';
import {HomeComponent} from "./home/home.component";
import {ReservaComponent} from "./reserva/reserva.component";
import {HuespedComponent} from "./huesped/huesped.component";

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'reserva', component: ReservaComponent},
  {path: 'reserva/:idReserva/huesped', component: HuespedComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

