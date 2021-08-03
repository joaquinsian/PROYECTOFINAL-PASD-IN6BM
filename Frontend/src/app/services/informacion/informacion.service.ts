import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class informacionService {

    //public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');

    private URL = "http://localhost:3000/PASD";

    constructor( private http: HttpClient, private router: Router){ }

    obtenerInformacion() /*:Observable<any>*/{
        return this.http.get<any>(this.URL + "/obtenerInformacion"/*, {headers: this.headersVariable}*/)

    }

}
