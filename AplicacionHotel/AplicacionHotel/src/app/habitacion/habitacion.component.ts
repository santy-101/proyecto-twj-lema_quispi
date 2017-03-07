import {Component, OnInit} from '@angular/core';
import {Http, Response} from "@angular/http";
import {MasterURlService} from "../services/master-url.service";
import {NgForm} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.component.html',
  styleUrls: ['./habitacion.component.css']
})
export class HabitacionComponent implements OnInit {
  private _parametros: any;
  title: string = "Bienvenido al Módulo Habitaciones";
  nuevaHabitacion = {};
  habitaciones = [];
  disabledButtons = {
    NuevaHabitacionFormSubmitButton: false,
    Oculto: false
  };

  constructor(private _ActivatedRoute: ActivatedRoute,
              private _http: Http,
              private _masterURL: MasterURlService) {
  }

  ngOnInit() {
    this._ActivatedRoute
      .params
      .subscribe(parametros => {
        this._parametros = parametros;
        this._http.get(this._masterURL.url + "Habitacion?idReserva=" + this._parametros.idReserva)
          .subscribe(
            (res: Response) => {
              this.habitaciones = res.json() .map((value) => {
                value.formularioCerrado = true;
                return value;
              })
            },
            (err) => {
              console.log(err)
            }
          )
      });
  }

  crearHabitacion(formulario: NgForm) {
    console.log(formulario);
    let habitacionNueva = {
      tipo: formulario.value.tipo,
      piso: formulario.value.piso,
      idReserva: this._parametros.idReserva
    };
    console.log("Habitacion Nueva" + habitacionNueva);
    this.disabledButtons.NuevaHabitacionFormSubmitButton = true;
    this._http.post(this._masterURL.url + "Habitacion", habitacionNueva).subscribe(
      (res) => {
        console.log(res);
        this.habitaciones.push(res.json());
        this.nuevaHabitacion = {};
        this.disabledButtons.NuevaHabitacionFormSubmitButton = false;
        this.disabledButtons.Oculto = true
      },
      (err) => {
        this.disabledButtons.NuevaHabitacionFormSubmitButton = false;
        console.log("Ocurrió un error", err);
      },
    );
  }

  borrarHabitacion(id: number) {
    this._http.delete(this._masterURL.url + "Habitacion/" + id)
      .subscribe(
        (res) => {
          let habitacionBorrada = res.json();
          this.habitaciones = this.habitaciones.filter(value => habitacionBorrada.id != value.id);
        },
        (err) => {
          console.log(err);
        }
      )
  }

  actualizarHabitacion(habitacion: any) {
    let parametros = {
      tipo: habitacion.tipo,
      piso: habitacion.piso,
    };
    this._http.put(this._masterURL.url + "Habitacion/" + habitacion.id, parametros)
      .subscribe(
        (res: Response) => {
          habitacion.formularioCerrado = !habitacion.formularioCerrado;
          console.log("Respuesta:", res.json());
        },
        (err) => {
          console.log("Error:", err);
        }
      )
  }
}
