import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { informacionService } from 'src/app/services/informacion/informacion.service';



@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],

})
export class InfoComponent implements OnInit {
  public getInformation="";
  myDate = new Date();

  paramsSubscription: Subscription = new Subscription;

  //public getInformation = "";

  public miData : any;

  //accediendo a los metodos de getdata de serviciossSss
  constructor(
    private route: ActivatedRoute,
    private informacionservice: informacionService
  ) {}

  ngOnInit(): void {
    //para los parametros de subscirpcion(transmicion) es igual a las ruta.parametro.suscrito(transmitidos)
    this.paramsSubscription =this.informacionservice.obtenerInformacion().subscribe(data => {this.miData = data.informacionEncontrada}) /*this.route.params.subscribe(params => {
      this.informacionservice = params['obtenerInformacion'];
    });*/
  }

}

 /*constructor(private _informacionservice: informacionService) {
    this.idInformacionModel = new Informacion("","","");
   }*/



  /*obtenerInformacion(){
    this._informacionservice.obtenerInformacion().subscribe(
      response => {
        this.informacion = response.informacionEncontrados;
      },
      error => {
        console.log(<any>error);
      }
    )
  }*/
