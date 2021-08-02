import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private URL = "http://localhost:3000/PASD";

  constructor(private http: HttpClient) { }

  verifyPoll() {
    if (!sessionStorage.getItem("authorization")) return;

    const headers = new HttpHeaders();
    const allheaders = headers.set("authorization", sessionStorage.getItem("authorization"));
    return this.http.get<any>(this.URL + "/verificarencuesta", { headers: allheaders });;
  }

  verifyRequiredGames() {
    if (!sessionStorage.getItem("authorization")) return;

    const headers = new HttpHeaders();
    const allheaders = headers.set("authorization", sessionStorage.getItem("authorization"));
    return this.http.get<any>(this.URL + "/verificarjuegos", { headers: allheaders });;
  }
}
