import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AdminService{
  private URL = "https://pasd-backend.herokuapp.com/PASD";

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

  getAllUsers(token: any){
    const headers = new HttpHeaders();
    const allheaders = headers.set("authorization", token);
    return this.http.get<any>(this.URL + "/usuarios", {headers: allheaders})
  }

  eliminarUsuarios(token: any, id: any){
    const headers = new HttpHeaders();
    const allheaders = headers.set("authorization",token)
    return this.http.delete(this.URL + "/eliminarUsuario/" + id, {headers: allheaders})
  }

  usuarioId(token: any, id: any){
    const headers = new HttpHeaders();
    const allheaders = headers.set("authorization", token)
    return this.http.get<any>(this.URL + "/obtenerUsuario/" + id, {headers: allheaders})
  }

  editUser(token: any, id: any, user: any){
    const headers = new HttpHeaders();
    const allheaders = headers.set("authorization", token)
    return this.http.put(this.URL + "/editarUsuario/" + id, user, {headers: allheaders})
  }
}
