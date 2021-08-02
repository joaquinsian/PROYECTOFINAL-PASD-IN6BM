import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private URL = "http://localhost:3000/PASD";

  constructor(private http: HttpClient) { }

  getInitialPollByNumber(number: Number) {
    return this.http.get<any>(this.URL + "/preguntainicial/" + number);;
  }
}
