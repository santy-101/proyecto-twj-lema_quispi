import {Routes, RouterModule} from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';
import {HomeComponent} from "./home/home.component";
import {ReservaComponent} from "./reserva/reserva.component";
import {HuespedComponent} from "./huesped/huesped.component";
import {HabitacionComponent} from "./habitacion/habitacion.component";

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'reservas', component: ReservaComponent},
  {path: 'reservas/:idReserva/habitacion',component: HabitacionComponent},
  {path: 'reservas/:idReserva/habitacion/:idHabitacion/huesped', component:HuespedComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

