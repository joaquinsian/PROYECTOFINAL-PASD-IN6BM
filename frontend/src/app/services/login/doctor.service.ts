import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DoctorService{
  private URL = "http://localhost:3000/PASD";
  constructor(private http: HttpClient, private router: Router){}

  obtenerCitas(){
    if(!sessionStorage.getItem("authorization")) return;

    const headers = new HttpHeaders();
    const allheaders = headers.set("authorization", sessionStorage.getItem("authorization"));
    return this.http.get<any>(this.URL + "/obtenerCitas", { headers: allheaders})
  }

  obtenerPacientes(){
    if(!sessionStorage.getItem("authorization")) return;

    const headers = new HttpHeaders();
    const allheaders = headers.set("authorization", sessionStorage.getItem("authorization"));
    return this.http.get<any>(this.URL + '/misPacientes', { headers: allheaders})
  }

  agregarCitas(token: any, quotes: any){
    const headers = new HttpHeaders();
    const allheaders = headers.set("authorization", token);
    return this.http.post<any>(this.URL + "/crearCitas", quotes, { headers: allheaders})
  }

  eliminarCita(token: any, id: any){
    const headers = new HttpHeaders();
    const allheaders = headers.set("authorization", token);
    return this.http.delete(this.URL + "/eliminarCitas/" + id, { headers: allheaders})
  }
}
