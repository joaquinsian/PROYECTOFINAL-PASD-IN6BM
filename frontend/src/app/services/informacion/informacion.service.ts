import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class informacionService {
    // PRUEBA PARA SIAN, ENVIAR SI SE MODIFICA
    //public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');

    private URL = "https://pasd-backend.herokuapp.com/PASD";

    constructor( private http: HttpClient, private router: Router){ }

    obtenerInformacion() /*:Observable<any>*/{
        return this.http.get<any>(this.URL + "/obtenerInformacion"/*, {headers: this.headersVariable}*/)

    }

}
