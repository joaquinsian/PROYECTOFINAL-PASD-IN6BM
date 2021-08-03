import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private URL = "https://pasd-backend.herokuapp.com/PASD";

  constructor(private http: HttpClient) { }

  getInitialPollByNumber(number: Number) {
    return this.http.get<any>(this.URL + "/preguntainicial/" + number);
  }

  getQuestionPollByNumber(iduser:any,number: Number) {
    return this.http.get<any>(this.URL + "/preguntanivel/" + iduser + "/" + number);
  }
}
