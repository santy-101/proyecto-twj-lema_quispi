import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Http, Response} from "@angular/http";
import {MasterURlService} from "../services/master-url.service";
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-huesped',
  templateUrl: 'huesped.component.html',
  styleUrls: ['huesped.component.css']
})
export class HuespedComponent implements OnInit {
  private _parametros: any;
  title: string = "Bienvenido al Módulo Huéspedes";
  nuevoHuesped= {};
  huespedes=[];
  disabledButtons = {
    NuevoHuespedFormSubmitButton: false,
    Oculto : false
  };

  constructor(private _ActivatedRoute: ActivatedRoute,
              private _http:Http,
              private _masterURL:MasterURlService) {
  }
  ngOnInit() {

    this._ActivatedRoute
      .params
      .subscribe(parametros => {
        this._parametros = parametros;
        this._http.get(this._masterURL.url+"Huesped?idHabitacion="+this._parametros.idHabitacion)
          .subscribe(
            (res:Response)=> {
              this.huespedes= res.json() .map((value) => {
                value.formularioCerrado = true;
                return value;
              })
            },
            (err)=>{
              console.log(err)
            }
          )

      });

  }
  crearHuesped(formulario: NgForm) {
    console.log(formulario);
    this.disabledButtons.NuevoHuespedFormSubmitButton = true;
    this._http.post(this._masterURL.url + "Huesped", {
      apellidos: formulario.value.apellidos,
      nombres: formulario.value.nombres,
      fechaNacimiento: formulario.value.fechaNacimiento,
      idHabitacion: this._parametros.idHabitacion
    }).subscribe(
      (res) => {
        console.log("No hubo errores");
        console.log(res);
        this.huespedes.push(res.json());
        this.nuevoHuesped = {};
        this.disabledButtons.NuevoHuespedFormSubmitButton = false;
        this.disabledButtons.Oculto = true
      },
      (err) => {
        this.disabledButtons.NuevoHuespedFormSubmitButton = false;
        console.log("Ocurrió un error", err);
      },
      () => {
      }
    );
  }

  borrarHuesped(id: number) {
    this._http.delete(this._masterURL.url + "Huesped/" + id)
      .subscribe(
        (res) => {
          let huespedBorrado = res.json();
          this.huespedes= this.huespedes.filter(value => huespedBorrado.id != value.id);
        },
        (err) => {
          console.log(err);
        }
      )
  }

  actualizarHuesped(huesped: any) {
    let parametos = {
      apellidos: huesped.apellidos,
      nombres: huesped.nombres,
      fechaNacimiento: huesped.fechaNacimiento
    };
    this._http.put(this._masterURL.url + "Huesped/" + huesped.id, parametos)
      .subscribe(
        (res: Response) => {
          huesped.formularioCerrado = !huesped.formularioCerrado;
          console.log("Respuesta:", res.json());
        },
        (err) => {
          console.log("Error:", err);
        }
      )
  }


}
