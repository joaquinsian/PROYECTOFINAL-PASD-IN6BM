import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AdminService{
  private URL = "http://localhost:3000/PASD";

  constructor(private http: HttpClient, private router: Router){}

  obtenerSolicitudes(token: any){
    const headers = new HttpHeaders();
    const allheaders = headers.set("authorization", token);
    return this.http.get<any>(this.URL + "/solicitudesPendientes", {headers: allheaders})
  }

  aceptarSolicitud(id:any, token: any){
    const headers = new HttpHeaders();
    const allheaders = headers.set("authorization", token);
    return this.http.get<any>(this.URL + "/aceptarSolicitud/" + id, {headers: allheaders})
  }

  rechazarSolicitud(id:any, token:any){
    const headers = new HttpHeaders();
    const allheaders = headers.set("authorization", token);
    return this.http.get<any>(this.URL + "/rechazarSolicitud/" + id, {headers: allheaders})
  }
}
