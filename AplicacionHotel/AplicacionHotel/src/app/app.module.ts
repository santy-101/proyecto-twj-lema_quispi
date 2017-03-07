import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {MasterURlService} from "./services/master-url.service";
import { HomeComponent } from './home/home.component';
import {routing} from "./app.routes";
import { ReservaComponent } from './reserva/reserva.component';
import { HuespedComponent } from './huesped/huesped.component';
import { HabitacionComponent } from './habitacion/habitacion.component';
import { UsuarioComponent } from './usuario/usuario.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReservaComponent,
    HuespedComponent,
    HabitacionComponent,
    UsuarioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    MasterURlService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }



