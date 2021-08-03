import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserResultService {
  private URL = "http://localhost:3000/PASD";

  constructor(private http: HttpClient) {
  }

  submitUserResult(question:any) {
    if(!sessionStorage.getItem("authorization")) return;

    const headers = new HttpHeaders();
    const allheaders = headers.set("authorization", sessionStorage.getItem("authorization"));
    return this.http.post<any>(this.URL + "/agregarencuesta/" + question, {},{headers: allheaders});

  }

  submitUserCommonResult(question:any) {
    if(!sessionStorage.getItem("authorization")) return;

    const headers = new HttpHeaders();
    const allheaders = headers.set("authorization", sessionStorage.getItem("authorization"));
    return this.http.post<any>(this.URL + "/agregardespues/" + question, {},{headers: allheaders});
    
  }

  getMyScores(){
    if(!sessionStorage.getItem("authorization")) return;

    const headers = new HttpHeaders();
    const allheaders = headers.set("authorization", sessionStorage.getItem("authorization"));
    return this.http.get<any>(this.URL + "/obtenercalificaciones",{headers: allheaders});
  }

  getAllScores(){
    return this.http.get<any>(this.URL + "/resultado_de_usuario");
  }
}
