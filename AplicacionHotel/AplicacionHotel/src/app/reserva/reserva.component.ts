import { Component, OnInit } from '@angular/core';
import {Http, Response} from "@angular/http";
import {MasterURlService} from "../services/master-url.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-reserva',
  templateUrl: 'reserva.component.html',
  styleUrls: ['reserva.component.css']
})
export class ReservaComponent implements OnInit {

  title: string = "Bienvenido al Módulo de Reservas";
  nuevaReserva = {};
  reservas= [];
  disabledButtons = {
    NuevaReservaFormSubmitButton: false,
    Oculto : false
  };


  constructor(private _http: Http,
              private _masterURL: MasterURlService) {
  }

  ngOnInit() {
    this.disabledButtons.Oculto = true;
    this._http.get(this._masterURL.url + "Reserva")
      .subscribe(
        (res: Response) => {
          this.reservas= res.json()
            .map((value) => {
              value.formularioCerrado = true;
              return value;
            });
        },
        (err) => {
          console.log(err);
        }
      )
  }

  crearReserva(formulario: NgForm) {
    console.log(formulario);
    this.disabledButtons.NuevaReservaFormSubmitButton = true;

    this._http.post(this._masterURL.url + "Reserva", {
      fechaInicio: formulario.value.fechaInicio,
      fechaFin: formulario.value.fechaFin
    }).subscribe(
      (res) => {
        console.log("No hubo errores");
        console.log(res);

        this.reservas.push(res.json());
        this.nuevaReserva = {};
        this.disabledButtons.NuevaReservaFormSubmitButton = false;
        this.disabledButtons.Oculto = true;

      },
      (err) => {
        this.disabledButtons.NuevaReservaFormSubmitButton = false;
        console.log("Ocurrió un error", err);
      },
      () => {
      }
    );

  }

  borrarReserva(id: number) {
    this._http.delete(this._masterURL.url + "Reserva/" + id)
      .subscribe(
        (res) => {
          let reservaBorrada = res.json();
          this.reservas = this.reservas.filter(value => reservaBorrada.id != value.id);
        },
        (err) => {
          console.log(err);
        }
      )
  }

  actualizarReserva(reserva: any) {
    let parametos = {
      fechaInicio: reserva.fechaInicio,
      fechaFin: reserva.fechaFin
    };
    this._http.put(this._masterURL.url + "Reserva/" + reserva.id, parametos)
      .subscribe(
        (res: Response) => {
          reserva.formularioCerrado = !reserva.formularioCerrado;
          console.log("Respuesta:", res.json());
        },
        (err) => {
          console.log("Error:", err);
        }
      )
  }

}
